import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { getAuthToken, getUser, isAuthenticated } from '@/utils/auth';
import { API_URL, API_BASE_URL } from '@/config/api';
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Edit, 
  Trash2,
  Clock, 
  MapPin, 
  Home,
  DollarSign,
  Loader2,
  AlertCircle,
  Image as ImageIcon,
  Bed,
  Bath,
  Square,
  User,
  Calendar,
  Search,
  Filter,
  MessageSquare,
  Power,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location_governorate: string;
  location_city: string;
  category: string;
  rent_or_buy: string;
  status: 'pending' | 'approved' | 'rejected' | 'sold';
  listing_type?: string;
  images: string[];
  views_count: number;
  inquiries_count: number;
  created_at: string;
  rejection_reason?: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  is_active?: boolean;
  user: {
    id: string;
    name: string;
    username?: string;
    email: string;
    phone?: string;
  };
}

interface Stats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

const AdminPropertyApproval = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [listingTypeFilter, setListingTypeFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showViewDialog, setShowViewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [editForm, setEditForm] = useState<Partial<Property>>({});
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  
  // Expand/collapse state
  const [expandedProperties, setExpandedProperties] = useState<Set<string>>(new Set());
  
  // Governorates and cities for location editing
  const [governorates, setGovernorates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [selectedGovernorateId, setSelectedGovernorateId] = useState<string>('');
  
  const [stats, setStats] = useState<Stats>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  // Check authentication and admin role
  const checkAuth = useCallback(() => {
    const token = getAuthToken();
    const userData = getUser();

    if (!token || !userData) {
      toast({
        title: isRTL ? "مطلوب تسجيل الدخول" : "Authentication Required",
        description: isRTL ? "يرجى تسجيل الدخول للوصول إلى هذه الصفحة" : "Please login to access this page",
        variant: "destructive",
      });
      navigate('/login');
      return false;
    }

    // userData is already an object from getUser(), no need to parse
    const user = userData;
    if (!user.is_admin && !user.is_founder) {
      toast({
        title: isRTL ? "غير مصرح" : "Unauthorized",
        description: isRTL ? "ليس لديك صلاحية الوصول إلى هذه الصفحة" : "You don't have permission to access this page",
        variant: "destructive",
      });
      navigate('/');
      return false;
    }

    return true;
  }, [navigate, toast, isRTL]);

  // Load all properties
  const loadProperties = useCallback(async () => {
    console.log('=== loadProperties CALLED ===');
    setLoading(true);
    
    const authCheck = checkAuth();
    console.log('Auth check result:', authCheck);
    
    if (!authCheck) {
      console.warn('Auth check failed, aborting loadProperties');
      setLoading(false);
      return;
    }
    
    try {
      const token = getAuthToken();
      console.log('Loading properties with token:', token ? `Present (${token.substring(0, 20)}...)` : 'Missing');
      
      const url = `${API_URL}/admin/properties`;
      console.log('Fetching from:', url);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(15000), // 15 second timeout
      });

      console.log('Properties response status:', response.status);

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        let errorData = null;
        
        const contentType = response.headers.get('content-type');
        console.log('Error response content-type:', contentType);
        
        try {
          // Try to parse as JSON first
          if (contentType && contentType.includes('application/json')) {
            errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } else {
            // It's HTML or plain text
            const textError = await response.text();
            console.error('Non-JSON error response:', textError.substring(0, 500));
            errorMessage = `Server returned ${response.status}: ${textError.substring(0, 100)}`;
          }
        } catch (parseError) {
          console.error('Failed to parse error response:', parseError);
        }
        
        toast({
          title: isRTL ? "خطأ" : "Error",
          description: errorMessage,
          variant: "destructive",
        });
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('Properties data received:', {
        success: data.success,
        count: data.data?.length,
        firstProperty: data.data?.[0]
      });
      
      if (data.success && data.data) {
        // Backend already sends images as arrays, just ensure they exist
        const processedProperties = data.data.map((prop: any) => ({
          ...prop,
          images: Array.isArray(prop.images) ? prop.images : []
        }));
        
        setProperties(processedProperties);
        
        // Calculate stats
        const stats = {
          total: processedProperties.length,
          pending: processedProperties.filter((p: Property) => p.status === 'pending').length,
          approved: processedProperties.filter((p: Property) => p.status === 'approved').length,
          rejected: processedProperties.filter((p: Property) => p.status === 'rejected').length,
        };
        setStats(stats);
        
        console.log('Properties loaded successfully:', stats);
      }
    } catch (error: any) {
      console.error('Error loading properties:', error);
      setProperties([]); // Set empty array so page can still render
      setStats({ total: 0, pending: 0, approved: 0, rejected: 0 });
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: error.message || (isRTL ? "فشل تحميل العقارات" : "Failed to load properties"),
        variant: "destructive",
      });
    } finally {
      setLoading(false); // Always set loading to false
    }
  }, [checkAuth, toast, isRTL]);

  // Load governorates for location selection
  const loadGovernorates = useCallback(async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_URL}/governorates`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          setGovernorates(data.data);
        }
      }
    } catch (error) {
      console.error('Error loading governorates:', error);
      // Don't block the page if governorates fail to load
    }
  }, []);

  // Load data on mount - parallel loading for better performance
  useEffect(() => {
    const initializeData = async () => {
      console.log('AdminPropertyApproval: Initializing data load...');
      try {
        await Promise.all([
          loadProperties(),
          loadGovernorates()
        ]);
        console.log('AdminPropertyApproval: Data loaded successfully');
      } catch (error) {
        console.error('AdminPropertyApproval: Error loading data:', error);
        // Ensure loading is set to false even on error
        setLoading(false);
      }
    };
    
    // Add maximum loading timeout (20 seconds)
    const timeoutId = setTimeout(() => {
      console.warn('AdminPropertyApproval: Loading timeout - forcing page to display');
      setLoading(false);
      toast({
        title: isRTL ? "تحذير" : "Warning",
        description: isRTL ? "استغرق التحميل وقتاً طويلاً. تم عرض البيانات المتاحة." : "Loading took too long. Displaying available data.",
        variant: "destructive",
      });
    }, 20000);
    
    initializeData().finally(() => {
      clearTimeout(timeoutId);
    });
    
    return () => clearTimeout(timeoutId);
  }, [loadProperties, loadGovernorates, isRTL, toast]);

  // Load cities when governorate is selected
  useEffect(() => {
    const loadCities = async () => {
      if (selectedGovernorateId) {
        try {
          const token = getAuthToken();
          const response = await fetch(`${API_URL}/governorates/${selectedGovernorateId}/cities`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log('Cities loaded for governorate', selectedGovernorateId, ':', data);
            if (data.success && data.data) {
              setCities(data.data);
            } else {
              setCities([]);
            }
          } else {
            console.error('Failed to load cities');
            setCities([]);
          }
        } catch (error) {
          console.error('Error loading cities:', error);
          setCities([]);
        }
      } else {
        setCities([]);
      }
    };

    loadCities();
  }, [selectedGovernorateId]);

  // Helper function to get full image URL
  const getImageUrl = (imagePath: string | string[]) => {
    // Handle array case (take first image)
    if (Array.isArray(imagePath)) {
      if (imagePath.length === 0) return '';
      imagePath = imagePath[0];
    }
    
    if (!imagePath || typeof imagePath !== 'string') return '';
    
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If it's a relative path, prepend the backend URL
    const fullUrl = `${API_BASE_URL}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
    console.log('Image URL conversion:', imagePath, '->', fullUrl);
    return fullUrl;
  };

  // Approve property
  const handleApprove = async (propertyId: string) => {
    setProcessing(propertyId);
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_URL}/admin/properties/${propertyId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!response.ok) {
        throw new Error('Failed to approve property');
      }

      toast({
        title: isRTL ? "تمت الموافقة" : "Approved",
        description: isRTL ? "تمت الموافقة على العقار بنجاح" : "Property approved successfully",
      });

      loadProperties();
    } catch (error: any) {
      console.error('Error approving property:', error);
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "فشل الموافقة على العقار" : "Failed to approve property",
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };

  // Reject property
  const handleReject = async () => {
    if (!selectedProperty || !rejectionReason.trim()) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى إدخال سبب الرفض" : "Please enter rejection reason",
        variant: "destructive",
      });
      return;
    }

    setProcessing(selectedProperty.id);
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_URL}/admin/properties/${selectedProperty.id}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rejection_reason: rejectionReason }),
        signal: AbortSignal.timeout(10000), // 10 second timeout
      });

      if (!response.ok) {
        throw new Error('Failed to reject property');
      }

      toast({
        title: isRTL ? "تم الرفض" : "Rejected",
        description: isRTL ? "تم رفض العقار" : "Property rejected",
      });

      setShowRejectDialog(false);
      setRejectionReason('');
      setSelectedProperty(null);
      loadProperties();
    } catch (error: any) {
      console.error('Error rejecting property:', error);
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "فشل رفض العقار" : "Failed to reject property",
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };

  // Update property
  const handleUpdate = async () => {
    if (!selectedProperty) return;

    setProcessing(selectedProperty.id);
    try {
      const token = getAuthToken();
      
      // Filter only the fields that backend accepts
      const updateData = {
        title: editForm.title,
        description: editForm.description,
        price: editForm.price,
        governorate_id: (editForm as any).governorate_id,
        city_id: (editForm as any).city_id,
        category: editForm.category,
        rent_or_buy: editForm.rent_or_buy,
        bedrooms: editForm.bedrooms,
        bathrooms: editForm.bathrooms,
        area: editForm.area,
      };
      
      console.log('Updating property with filtered data:', updateData);
      
      const response = await fetch(`${API_URL}/admin/properties/${selectedProperty.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      console.log('Update response status:', response.status);
      
      const responseData = await response.json();
      console.log('Update response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to update property');
      }

      toast({
        title: isRTL ? "تم التحديث" : "Updated",
        description: isRTL ? "تم تحديث العقار بنجاح" : "Property updated successfully",
      });

      setShowEditDialog(false);
      setEditForm({});
      setSelectedProperty(null);
      setSelectedGovernorateId('');
      setCities([]);
      loadProperties();
    } catch (error: any) {
      console.error('Error updating property:', error);
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: error.message || (isRTL ? "فشل تحديث العقار" : "Failed to update property"),
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };

  // Delete property
  const handleDelete = async () => {
    if (!selectedProperty) return;

    setProcessing(selectedProperty.id);
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_URL}/admin/properties/${selectedProperty.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete property');
      }

      toast({
        title: isRTL ? "تم الحذف" : "Deleted",
        description: isRTL ? "تم حذف العقار بنجاح" : "Property deleted successfully",
      });

      setShowDeleteDialog(false);
      setSelectedProperty(null);
      loadProperties();
    } catch (error: any) {
      console.error('Error deleting property:', error);
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "فشل حذف العقار" : "Failed to delete property",
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };

  // Toggle property active/inactive
  const handleToggleActive = async (propertyId: string, currentStatus: boolean) => {
    setProcessing(propertyId);
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_URL}/admin/properties/${propertyId}/toggle-active`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to toggle property status');
      }

      const data = await response.json();
      const newStatus = data.data.is_active;

      toast({
        title: newStatus 
          ? (isRTL ? "تم التفعيل" : "Activated")
          : (isRTL ? "تم الإلغاء" : "Deactivated"),
        description: newStatus
          ? (isRTL ? "العقار الآن مرئي في السوق" : "Property is now visible in marketplace")
          : (isRTL ? "العقار الآن مخفي من السوق" : "Property is now hidden from marketplace"),
      });

      // Update local state
      setProperties(prev => prev.map(p => 
        p.id === propertyId ? { ...p, is_active: newStatus } : p
      ));
    } catch (error: any) {
      console.error('Error toggling property:', error);
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "فشل في تغيير حالة العقار" : "Failed to toggle property status",
        variant: "destructive",
      });
    } finally {
      setProcessing(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: "default" | "destructive" | "outline" | "secondary", text: string, color: string }> = {
      pending: { variant: "outline", text: isRTL ? "قيد المراجعة" : "Pending", color: "text-yellow-600" },
      approved: { variant: "default", text: isRTL ? "موافق عليه" : "Approved", color: "text-green-600" },
      rejected: { variant: "destructive", text: isRTL ? "مرفوض" : "Rejected", color: "text-red-600" },
      sold: { variant: "secondary", text: isRTL ? "مباع" : "Sold", color: "text-gray-600" },
    };

    const statusInfo = variants[status] || variants.pending;
    return (
      <Badge variant={statusInfo.variant} className={statusInfo.color}>
        {statusInfo.text}
      </Badge>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(isRTL ? 'ar-EG' : 'en-EG', {
      style: 'currency',
      currency: 'EGP',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Toggle expand/collapse for property
  const togglePropertyExpand = (propertyId: string) => {
    const newExpanded = new Set(expandedProperties);
    if (newExpanded.has(propertyId)) {
      newExpanded.delete(propertyId);
    } else {
      newExpanded.add(propertyId);
    }
    setExpandedProperties(newExpanded);
  };

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.user?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || property.status === statusFilter;
    const matchesListingType = listingTypeFilter === 'all' || (property.listing_type || 'property') === listingTypeFilter;
    return matchesSearch && matchesStatus && matchesListingType;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

  // Page counter component
  const PageCounter = () => {
    if (filteredProperties.length === 0) return null;
    
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, filteredProperties.length);
    
    return (
      <div className={`text-center py-3 text-sm text-gray-600 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
        {isRTL ? (
          <>
            عرض <span className="font-bold text-blue-600">{startItem}</span> - <span className="font-bold text-blue-600">{endItem}</span> من <span className="font-bold text-blue-600">{filteredProperties.length}</span> إعلان
            {totalPages > 1 && (
              <> | الصفحة <span className="font-bold text-blue-600">{currentPage}</span> من <span className="font-bold text-blue-600">{totalPages}</span></>
            )}
          </>
        ) : (
          <>
            Showing <span className="font-bold text-blue-600">{startItem}</span> - <span className="font-bold text-blue-600">{endItem}</span> of <span className="font-bold text-blue-600">{filteredProperties.length}</span> listings
            {totalPages > 1 && (
              <> | Page <span className="font-bold text-blue-600">{currentPage}</span> of <span className="font-bold text-blue-600">{totalPages}</span></>
            )}
          </>
        )}
      </div>
    );
  };

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, activeTab, listingTypeFilter]);

  // Pagination component
  const Pagination = () => {
    if (totalPages <= 1) return null;

    const maxVisiblePages = 8;
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisiblePages) {
      if (currentPage <= 4) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - 3) {
        startPage = totalPages - maxVisiblePages + 1;
      } else {
        startPage = currentPage - 3;
        endPage = currentPage + 4;
      }
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
        {/* First Page */}
        {startPage > 1 && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              className="min-w-[40px]"
            >
              1
            </Button>
            {startPage > 2 && <span className="px-2">...</span>}
          </>
        )}

        {/* Page Numbers */}
        {pages.map(page => (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(page)}
            className="min-w-[40px]"
          >
            {page}
          </Button>
        ))}

        {/* Last Page */}
        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="px-2">...</span>}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              className="min-w-[40px]"
            >
              {totalPages}
            </Button>
          </>
        )}

        {/* Page Info */}
        <span className="text-sm text-gray-600 ml-4">
          {isRTL ? `صفحة ${currentPage} من ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
        </span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">{isRTL ? "جاري التحميل..." : "Loading..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold text-gray-900 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? "إدارة الإعلانات" : "Listing Management"}
          </h1>
          <p className={`text-gray-600 mt-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            {isRTL ? "مراجعة والموافقة على الإعلانات المقدمة" : "Review and approve submitted listings"}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-blue-100 text-sm">{isRTL ? "المجموع" : "Total"}</p>
                  <p className="text-3xl font-bold mt-1">{stats.total}</p>
                </div>
                <Home className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-yellow-100 text-sm">{isRTL ? "قيد المراجعة" : "Pending"}</p>
                  <p className="text-3xl font-bold mt-1">{stats.pending}</p>
                </div>
                <Clock className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-green-100 text-sm">{isRTL ? "موافق عليه" : "Approved"}</p>
                  <p className="text-3xl font-bold mt-1">{stats.approved}</p>
                </div>
                <CheckCircle className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-6">
              <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={isRTL ? 'text-right' : ''}>
                  <p className="text-red-100 text-sm">{isRTL ? "مرفوض" : "Rejected"}</p>
                  <p className="text-3xl font-bold mt-1">{stats.rejected}</p>
                </div>
                <XCircle className="w-12 h-12 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${isRTL ? 'text-right' : ''}`}>
              <div className="relative">
                <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
                <Input
                  placeholder={isRTL ? "ابحث عن إعلان أو اسم المستخدم..." : "Search listings or username..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={isRTL ? 'pr-10' : 'pl-10'}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{isRTL ? "جميع الحالات" : "All Status"}</SelectItem>
                  <SelectItem value="pending">{isRTL ? "قيد المراجعة" : "Pending"}</SelectItem>
                  <SelectItem value="approved">{isRTL ? "موافق عليه" : "Approved"}</SelectItem>
                  <SelectItem value="rejected">{isRTL ? "مرفوض" : "Rejected"}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value);
          setStatusFilter(value);
        }}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-6 h-auto gap-2 sm:gap-0 p-2">
            <TabsTrigger value="all" className="text-xs sm:text-sm py-2">{isRTL ? "الكل" : "All"} ({stats.total})</TabsTrigger>
            <TabsTrigger value="pending" className="text-xs sm:text-sm py-2">{isRTL ? "قيد المراجعة" : "Pending"} ({stats.pending})</TabsTrigger>
            <TabsTrigger value="approved" className="text-xs sm:text-sm py-2">{isRTL ? "موافق عليه" : "Approved"} ({stats.approved})</TabsTrigger>
            <TabsTrigger value="rejected" className="text-xs sm:text-sm py-2">{isRTL ? "مرفوض" : "Rejected"} ({stats.rejected})</TabsTrigger>
          </TabsList>

          {/* Listing Type Filter Tabs */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <Button
                  onClick={() => {
                    setListingTypeFilter('all');
                    setCurrentPage(1);
                  }}
                  variant={listingTypeFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  className={`text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto ${listingTypeFilter === 'all' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}`}
                >
                  {isRTL ? 'الكل' : 'All'} ({properties.filter(p => statusFilter === 'all' || p.status === statusFilter).length})
                </Button>
                <Button
                  onClick={() => {
                    setListingTypeFilter('property');
                    setCurrentPage(1);
                  }}
                  variant={listingTypeFilter === 'property' ? 'default' : 'outline'}
                  size="sm"
                  className={`text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto ${listingTypeFilter === 'property' ? 'bg-green-600' : ''}`}
                >
                  🏠 <span className="hidden xs:inline">{isRTL ? 'عقارات' : 'Properties'}</span> ({properties.filter(p => (statusFilter === 'all' || p.status === statusFilter) && (p.listing_type || 'property') === 'property').length})
                </Button>
                <Button
                  onClick={() => {
                    setListingTypeFilter('car');
                    setCurrentPage(1);
                  }}
                  variant={listingTypeFilter === 'car' ? 'default' : 'outline'}
                  size="sm"
                  className={`text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto ${listingTypeFilter === 'car' ? 'bg-blue-600' : ''}`}
                >
                  🚗 <span className="hidden xs:inline">{isRTL ? 'سيارات' : 'Cars'}</span> ({properties.filter(p => (statusFilter === 'all' || p.status === statusFilter) && p.listing_type === 'car').length})
                </Button>
                <Button
                  onClick={() => {
                    setListingTypeFilter('electronics');
                    setCurrentPage(1);
                  }}
                  variant={listingTypeFilter === 'electronics' ? 'default' : 'outline'}
                  size="sm"
                  className={`text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto ${listingTypeFilter === 'electronics' ? 'bg-indigo-600' : ''}`}
                >
                  📱 <span className="hidden sm:inline">{isRTL ? 'إلكترونيات' : 'Electronics'}</span> ({properties.filter(p => (statusFilter === 'all' || p.status === statusFilter) && p.listing_type === 'electronics').length})
                </Button>
                <Button
                  onClick={() => {
                    setListingTypeFilter('mobile');
                    setCurrentPage(1);
                  }}
                  variant={listingTypeFilter === 'mobile' ? 'default' : 'outline'}
                  size="sm"
                  className={`text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto ${listingTypeFilter === 'mobile' ? 'bg-purple-600' : ''}`}
                >
                  📱 <span className="hidden xs:inline">{isRTL ? 'موبايل' : 'Mobile'}</span> ({properties.filter(p => (statusFilter === 'all' || p.status === statusFilter) && p.listing_type === 'mobile').length})
                </Button>
                <Button
                  onClick={() => {
                    setListingTypeFilter('job');
                    setCurrentPage(1);
                  }}
                  variant={listingTypeFilter === 'job' ? 'default' : 'outline'}
                  size="sm"
                  className={`text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto ${listingTypeFilter === 'job' ? 'bg-orange-600' : ''}`}
                >
                  💼 <span className="hidden xs:inline">{isRTL ? 'وظائف' : 'Jobs'}</span> ({properties.filter(p => (statusFilter === 'all' || p.status === statusFilter) && p.listing_type === 'job').length})
                </Button>
                <Button
                  onClick={() => {
                    setListingTypeFilter('vehicle_booking');
                    setCurrentPage(1);
                  }}
                  variant={listingTypeFilter === 'vehicle_booking' ? 'default' : 'outline'}
                  size="sm"
                  className={`text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto ${listingTypeFilter === 'vehicle_booking' ? 'bg-cyan-600' : ''}`}
                >
                  🚌 <span className="hidden sm:inline">{isRTL ? 'حجز مركبات' : 'Vehicles'}</span> ({properties.filter(p => (statusFilter === 'all' || p.status === statusFilter) && p.listing_type === 'vehicle_booking').length})
                </Button>
                <Button
                  onClick={() => {
                    setListingTypeFilter('doctor_booking');
                    setCurrentPage(1);
                  }}
                  variant={listingTypeFilter === 'doctor_booking' ? 'default' : 'outline'}
                  size="sm"
                  className={`text-[10px] sm:text-xs md:text-sm px-2 sm:px-3 py-1.5 sm:py-2 h-auto ${listingTypeFilter === 'doctor_booking' ? 'bg-pink-600' : ''}`}
                >
                  🩺 <span className="hidden sm:inline">{isRTL ? 'حجز أطباء' : 'Doctors'}</span> ({properties.filter(p => (statusFilter === 'all' || p.status === statusFilter) && p.listing_type === 'doctor_booking').length})
                </Button>
              </div>
            </CardContent>
          </Card>

          <TabsContent value={activeTab}>
            {paginatedProperties.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">
                    {isRTL ? "لا توجد إعلانات" : "No listings found"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Page Counter - Top */}
                <PageCounter />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {paginatedProperties.map((property) => {
                    const isExpanded = expandedProperties.has(property.id);
                    
                    return (
                  <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Property Image */}
                    <div className="relative h-48 bg-gray-200">
                      {property.images && property.images.length > 0 ? (
                        <img
                          src={getImageUrl(property.images[0])}
                          alt={property.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback if image fails to load
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300">
                          <ImageIcon className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        {getStatusBadge(property.status)}
                      </div>
                      {property.is_active === false && (
                        <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'}`}>
                          <Badge className="bg-gray-600 text-white shadow-lg">
                            <Power className="w-3 h-3 mr-1" />
                            {isRTL ? "غير نشط" : "Inactive"}
                          </Badge>
                        </div>
                      )}
                      {property.images && property.images.length > 1 && (
                        <div className={`absolute bottom-4 ${isRTL ? 'left-4' : 'right-4'} bg-black/60 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1`}>
                          <ImageIcon className="w-4 h-4" />
                          <span>{property.images.length}</span>
                        </div>
                      )}
                    </div>

                    <CardContent className="p-6">
                      {/* Compact View - Always Show */}
                      <div className="space-y-3">
                        <div className={`flex items-start justify-between gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className="flex-1">
                            <h3 className={`text-lg font-bold text-gray-900 mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                              {property.title}
                            </h3>
                            <div className={`flex items-center gap-2 text-gray-600 text-sm mb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <MapPin className="w-4 h-4" />
                              <span>{property.location_city}, {property.location_governorate}</span>
                            </div>
                            
                            {/* Listing Type Badges - Compact View */}
                            <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                              {/* Property Badges */}
                              {(property.listing_type === 'property' || !property.listing_type) && (
                                <>
                                  {property.category && (
                                    <Badge variant="outline" className="text-xs text-gray-700 font-medium border-blue-600 capitalize">
                                      {property.category === 'villa' ? (isRTL ? 'فيلا' : 'Villa') :
                                       property.category === 'apartment' ? (isRTL ? 'شقة' : 'Apartment') :
                                       property.category === 'land' ? (isRTL ? 'أرض' : 'Land') :
                                       property.category === 'townhouse' ? (isRTL ? 'تاون هاوس' : 'Townhouse') :
                                       property.category === 'building' ? (isRTL ? 'مبنى' : 'Building') :
                                       property.category === 'commercial' ? (isRTL ? 'تجاري' : 'Commercial') :
                                       property.category}
                                    </Badge>
                                  )}
                                  {property.bedrooms !== undefined && property.bedrooms !== null && (
                                    <Badge variant="secondary" className="text-xs">
                                      {property.bedrooms} {isRTL ? 'غرف' : 'Beds'}
                                    </Badge>
                                  )}
                                  {property.bathrooms !== undefined && property.bathrooms !== null && (
                                    <Badge variant="secondary" className="text-xs">
                                      {property.bathrooms} {isRTL ? 'حمام' : 'Baths'}
                                    </Badge>
                                  )}
                                  {property.area && (
                                    <Badge variant="secondary" className="text-xs">
                                      {property.area} {isRTL ? 'م²' : 'm²'}
                                    </Badge>
                                  )}
                                </>
                              )}
                              
                              {/* Car Badges */}
                              {property.listing_type === 'car' && (
                                <>
                                  {(property as any).car_make && (
                                    <Badge className="text-xs bg-green-600 text-white font-medium capitalize">
                                      {(property as any).car_make}
                                    </Badge>
                                  )}
                                  {(property as any).car_model && (
                                    <Badge variant="outline" className="text-xs text-gray-700 font-medium border-green-600 capitalize">
                                      {(property as any).car_model}
                                    </Badge>
                                  )}
                                  {(property as any).car_year && (
                                    <Badge variant="secondary" className="text-xs font-medium">
                                      {(property as any).car_year}
                                    </Badge>
                                  )}
                                  {(property as any).car_condition && (
                                    <Badge variant="secondary" className="text-xs font-medium capitalize">
                                      {(property as any).car_condition === 'new' ? (isRTL ? 'جديد' : 'New') :
                                       (property as any).car_condition === 'used' ? (isRTL ? 'مستعمل' : 'Used') :
                                       (property as any).car_condition}
                                    </Badge>
                                  )}
                                </>
                              )}
                              
                              {/* Electronics Badges */}
                              {property.listing_type === 'electronics' && (
                                <>
                                  {(property as any).electronics_type && (
                                    <Badge className="text-xs bg-purple-600 text-white font-medium capitalize">
                                      {(property as any).electronics_type}
                                    </Badge>
                                  )}
                                  {(property as any).electronics_brand && (
                                    <Badge variant="outline" className="text-xs text-gray-700 font-medium border-purple-600 capitalize">
                                      {(property as any).electronics_brand}
                                    </Badge>
                                  )}
                                  {((property as any).item_condition || (property as any).electronics_condition) && (
                                    <Badge variant="secondary" className="text-xs font-medium capitalize">
                                      {((property as any).item_condition || (property as any).electronics_condition) === 'new' ? (isRTL ? 'جديد' : 'New') :
                                       ((property as any).item_condition || (property as any).electronics_condition) === 'used' ? (isRTL ? 'مستعمل' : 'Used') :
                                       ((property as any).item_condition || (property as any).electronics_condition)}
                                    </Badge>
                                  )}
                                </>
                              )}
                              
                              {/* Mobile Badges */}
                              {property.listing_type === 'mobile' && (
                                <>
                                  {(property as any).mobile_brand && (
                                    <Badge className="text-xs bg-pink-600 text-white font-medium capitalize">
                                      {(property as any).mobile_brand}
                                    </Badge>
                                  )}
                                  {(property as any).mobile_model && (
                                    <Badge variant="outline" className="text-xs text-gray-700 font-medium border-pink-600 capitalize">
                                      {(property as any).mobile_model}
                                    </Badge>
                                  )}
                                  {(property as any).item_condition && (
                                    <Badge variant="secondary" className="text-xs font-medium capitalize">
                                      {(property as any).item_condition === 'new' ? (isRTL ? 'جديد' : 'New') :
                                       (property as any).item_condition === 'used' ? (isRTL ? 'مستعمل' : 'Used') :
                                       (property as any).item_condition}
                                    </Badge>
                                  )}
                                </>
                              )}
                              
                              {/* Job Badges */}
                              {property.listing_type === 'job' && (
                                <>
                                  {(property as any).job_type && (
                                    <Badge className="text-xs bg-orange-600 text-white font-medium capitalize">
                                      {(property as any).job_type}
                                    </Badge>
                                  )}
                                  {(property as any).job_work_type && (
                                    <Badge variant="outline" className="text-xs text-gray-700 font-medium border-orange-600 capitalize">
                                      {(property as any).job_work_type === 'full_time' ? (isRTL ? 'دوام كامل' : 'Full Time') :
                                       (property as any).job_work_type === 'part_time' ? (isRTL ? 'دوام جزئي' : 'Part Time') :
                                       (property as any).job_work_type === 'contract' ? (isRTL ? 'عقد' : 'Contract') :
                                       (property as any).job_work_type === 'freelance' ? (isRTL ? 'مستقل' : 'Freelance') :
                                       (property as any).job_work_type}
                                    </Badge>
                                  )}
                                  {(property as any).job_location_type && (
                                    <Badge variant="outline" className="text-xs text-gray-700 font-medium border-orange-600 capitalize">
                                      {(property as any).job_location_type === 'remote' ? (isRTL ? 'عن بعد' : 'Remote') :
                                       (property as any).job_location_type === 'onsite' ? (isRTL ? 'في الموقع' : 'Onsite') :
                                       (property as any).job_location_type === 'hybrid' ? (isRTL ? 'هجين' : 'Hybrid') :
                                       (property as any).job_location_type}
                                    </Badge>
                                  )}
                                </>
                              )}
                              
                              {/* Vehicle Booking Badges */}
                              {property.listing_type === 'vehicle_booking' && (
                                <>
                                  {(property as any).vehicle_type && (
                                    <Badge className="text-xs bg-cyan-600 text-white font-medium capitalize">
                                      {(property as any).vehicle_type}
                                    </Badge>
                                  )}
                                  {(property as any).vehicle_with_driver !== undefined && (
                                    <Badge variant="outline" className="text-xs text-gray-700 font-medium border-cyan-600">
                                      {(property as any).vehicle_with_driver ? (isRTL ? 'مع سائق' : 'With Driver') : (isRTL ? 'قيادة ذاتية' : 'Self Drive')}
                                    </Badge>
                                  )}
                                </>
                              )}
                              
                              {/* Doctor Booking Badges */}
                              {property.listing_type === 'doctor_booking' && (
                                <>
                                  {(property as any).doctor_specialty && (
                                    <Badge className="text-xs bg-red-600 text-white font-medium capitalize">
                                      {(property as any).doctor_specialty}
                                    </Badge>
                                  )}
                                  {(property as any).booking_type && (
                                    <Badge variant="outline" className="text-xs text-gray-700 font-medium border-red-600 capitalize">
                                      {(property as any).booking_type === 'online' ? (isRTL ? 'استشارة أونلاين' : 'Online') : 
                                       (property as any).booking_type === 'in_person' ? (isRTL ? 'حضوري' : 'In-Person') : 
                                       (property as any).booking_type}
                                    </Badge>
                                  )}
                                </>
                              )}
                            </div>
                          </div>
                          <div className={`text-lg font-bold text-blue-600 whitespace-nowrap ${isRTL ? 'text-right' : 'text-left'}`}>
                            {formatPrice(property.price)}
                          </div>
                        </div>

                        {/* Expand/Collapse Button */}
                        <Button
                          onClick={() => togglePropertyExpand(property.id)}
                          variant="outline"
                          className="w-full"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                              {isRTL ? "إخفاء التفاصيل" : "Hide Details"}
                            </>
                          ) : (
                            <>
                              <ChevronDown className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                              {isRTL ? "عرض التفاصيل الكاملة" : "Show Full Details"}
                            </>
                          )}
                        </Button>

                        {/* Expanded View - Conditional */}
                        {isExpanded && (
                          <div className="space-y-4 pt-4 border-t">
                            {/* Listing Type and Category Badges */}
                            <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                              {/* Listing Type Badge */}
                              {property.listing_type && (
                                <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium">
                                  {property.listing_type === 'property' ? (isRTL ? 'عقار' : 'Property') :
                                   property.listing_type === 'car' ? (isRTL ? 'سيارة' : 'Car') :
                                   property.listing_type === 'electronics' ? (isRTL ? 'إلكترونيات' : 'Electronics') :
                                   property.listing_type === 'mobile' ? (isRTL ? 'موبايل' : 'Mobile') :
                                   property.listing_type === 'job' ? (isRTL ? 'وظيفة' : 'Job') :
                                   property.listing_type === 'vehicle_booking' ? (isRTL ? 'حجز مركبة' : 'Vehicle Booking') :
                                   property.listing_type === 'doctor_booking' ? (isRTL ? 'حجز طبيب' : 'Doctor Booking') :
                                   property.listing_type}
                                </Badge>
                              )}
                              
                              {/* Category Badge for Property */}
                              {property.category && (property.listing_type === 'property' || !property.listing_type) && (
                                <Badge variant="outline" className="text-gray-700 font-medium border-blue-600 capitalize">
                                  {property.category === 'villa' ? (isRTL ? 'فيلا' : 'Villa') :
                                   property.category === 'apartment' ? (isRTL ? 'شقة' : 'Apartment') :
                                   property.category === 'land' ? (isRTL ? 'أرض' : 'Land') :
                                   property.category === 'townhouse' ? (isRTL ? 'تاون هاوس' : 'Townhouse') :
                                   property.category === 'building' ? (isRTL ? 'مبنى' : 'Building') :
                                   property.category === 'commercial' ? (isRTL ? 'تجاري' : 'Commercial') :
                                   property.category}
                                </Badge>
                              )}
                              
                              {/* Rent or Buy Badge */}
                              <Badge variant="outline" className="text-gray-700 font-medium border-blue-600 capitalize">
                                {property.rent_or_buy === 'rent' ? (isRTL ? 'إيجار' : 'Rent') : (isRTL ? 'شراء' : 'Buy')}
                              </Badge>
                            </div>
                            
                            <p className={`text-gray-600 text-sm ${isRTL ? 'text-right' : 'text-left'}`}>
                              {property.description}
                            </p>

                            {/* Property-Specific Details */}
                            {(property.listing_type === 'property' || !property.listing_type) && (
                              <div className={`flex items-center gap-4 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                                {property.bedrooms !== undefined && property.bedrooms !== null && (
                                  <div className={`flex items-center gap-1 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <Bed className="w-4 h-4" />
                                    <span className="text-sm">{property.bedrooms} {isRTL ? 'غرف' : 'Beds'}</span>
                                  </div>
                                )}
                                {property.bathrooms !== undefined && property.bathrooms !== null && (
                                  <div className={`flex items-center gap-1 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <Bath className="w-4 h-4" />
                                    <span className="text-sm">{property.bathrooms} {isRTL ? 'حمام' : 'Baths'}</span>
                                  </div>
                                )}
                                {property.area && (
                                  <div className={`flex items-center gap-1 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <Square className="w-4 h-4" />
                                    <span className="text-sm">{property.area} {isRTL ? 'م²' : 'm²'}</span>
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {/* Car-Specific Details */}
                            {property.listing_type === 'car' && (
                              <div className="space-y-2">
                                <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                                  {(property as any).car_make && (
                                    <Badge className="bg-green-600 text-white font-medium capitalize">
                                      {(property as any).car_make}
                                    </Badge>
                                  )}
                                  {(property as any).car_model && (
                                    <Badge variant="outline" className="text-gray-700 font-medium border-green-600 capitalize">
                                      {(property as any).car_model}
                                    </Badge>
                                  )}
                                  {(property as any).car_year && (
                                    <Badge variant="secondary" className="font-medium">
                                      {(property as any).car_year}
                                    </Badge>
                                  )}
                                  {(property as any).car_condition && (
                                    <Badge variant="secondary" className="font-medium capitalize">
                                      {(property as any).car_condition === 'new' ? (isRTL ? 'جديد' : 'New') :
                                       (property as any).car_condition === 'used' ? (isRTL ? 'مستعمل' : 'Used') :
                                       (property as any).car_condition}
                                    </Badge>
                                  )}
                                </div>
                                {(property as any).car_mileage && (
                                  <div className={`text-sm text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    <strong>{isRTL ? 'الكيلومترات: ' : 'Mileage: '}</strong>
                                    {(property as any).car_mileage.toLocaleString()} {isRTL ? 'كم' : 'km'}
                                  </div>
                                )}
                              </div>
                            )}
                            
                            {/* Electronics-Specific Details */}
                            {property.listing_type === 'electronics' && (
                              <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Badge className="bg-purple-600 text-white font-medium">
                                  {isRTL ? 'إلكترونيات' : 'Electronics'}
                                </Badge>
                                {(property as any).electronics_type && (
                                  <Badge variant="outline" className="text-gray-700 font-medium border-purple-600 capitalize">
                                    {(property as any).electronics_type}
                                  </Badge>
                                )}
                                {(property as any).electronics_brand && (
                                  <Badge variant="outline" className="text-gray-700 font-medium border-purple-600 capitalize">
                                    {(property as any).electronics_brand}
                                  </Badge>
                                )}
                                {((property as any).item_condition || (property as any).electronics_condition) && (
                                  <Badge variant="secondary" className="font-medium capitalize">
                                    {((property as any).item_condition || (property as any).electronics_condition) === 'new' ? (isRTL ? 'جديد' : 'New') :
                                     ((property as any).item_condition || (property as any).electronics_condition) === 'used' ? (isRTL ? 'مستعمل' : 'Used') :
                                     ((property as any).item_condition || (property as any).electronics_condition)}
                                  </Badge>
                                )}
                              </div>
                            )}
                            
                            {/* Mobile-Specific Details */}
                            {property.listing_type === 'mobile' && (
                              <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Badge className="bg-pink-600 text-white font-medium">
                                  {isRTL ? 'موبايل' : 'Mobile'}
                                </Badge>
                                {(property as any).mobile_brand && (
                                  <Badge className="bg-pink-600 text-white font-medium capitalize">
                                    {(property as any).mobile_brand}
                                  </Badge>
                                )}
                                {(property as any).mobile_model && (
                                  <Badge variant="outline" className="text-gray-700 font-medium border-pink-600 capitalize">
                                    {(property as any).mobile_model}
                                  </Badge>
                                )}
                                {(property as any).item_condition && (
                                  <Badge variant="secondary" className="font-medium capitalize">
                                    {(property as any).item_condition === 'new' ? (isRTL ? 'جديد' : 'New') :
                                     (property as any).item_condition === 'used' ? (isRTL ? 'مستعمل' : 'Used') :
                                     (property as any).item_condition}
                                  </Badge>
                                )}
                              </div>
                            )}
                            
                            {/* Job-Specific Details */}
                            {property.listing_type === 'job' && (
                              <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Badge className="bg-orange-600 text-white font-medium">
                                  {isRTL ? 'وظيفة' : 'Job'}
                                </Badge>
                                {(property as any).job_type && (
                                  <Badge className="bg-orange-600 text-white font-medium capitalize">
                                    {(property as any).job_type}
                                  </Badge>
                                )}
                                {(property as any).job_work_type && (
                                  <Badge variant="outline" className="text-gray-700 font-medium border-orange-600 capitalize">
                                    {(property as any).job_work_type === 'full_time' ? (isRTL ? 'دوام كامل' : 'Full Time') :
                                     (property as any).job_work_type === 'part_time' ? (isRTL ? 'دوام جزئي' : 'Part Time') :
                                     (property as any).job_work_type === 'contract' ? (isRTL ? 'عقد' : 'Contract') :
                                     (property as any).job_work_type === 'freelance' ? (isRTL ? 'مستقل' : 'Freelance') :
                                     (property as any).job_work_type}
                                  </Badge>
                                )}
                                {(property as any).job_location_type && (
                                  <Badge variant="outline" className="text-gray-700 font-medium border-orange-600 capitalize">
                                    {(property as any).job_location_type === 'remote' ? (isRTL ? 'عن بعد' : 'Remote') :
                                     (property as any).job_location_type === 'onsite' ? (isRTL ? 'في الموقع' : 'Onsite') :
                                     (property as any).job_location_type === 'hybrid' ? (isRTL ? 'هجين' : 'Hybrid') :
                                     (property as any).job_location_type}
                                  </Badge>
                                )}
                              </div>
                            )}
                            
                            {/* Vehicle Booking-Specific Details */}
                            {property.listing_type === 'vehicle_booking' && (
                              <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Badge className="bg-cyan-600 text-white font-medium">
                                  {isRTL ? 'حجز مركبة' : 'Vehicle Booking'}
                                </Badge>
                                {(property as any).vehicle_type && (
                                  <Badge className="bg-cyan-600 text-white font-medium capitalize">
                                    {(property as any).vehicle_type}
                                  </Badge>
                                )}
                                {(property as any).vehicle_with_driver !== undefined && (
                                  <Badge variant="outline" className="text-gray-700 font-medium border-cyan-600">
                                    {(property as any).vehicle_with_driver ? (isRTL ? 'مع سائق' : 'With Driver') : (isRTL ? 'قيادة ذاتية' : 'Self Drive')}
                                  </Badge>
                                )}
                              </div>
                            )}
                            
                            {/* Doctor Booking-Specific Details */}
                            {property.listing_type === 'doctor_booking' && (
                              <div className={`flex items-center gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Badge className="bg-red-600 text-white font-medium">
                                  {isRTL ? 'حجز طبيب' : 'Doctor Booking'}
                                </Badge>
                                {(property as any).doctor_specialty && (
                                  <Badge className="bg-red-600 text-white font-medium capitalize">
                                    {(property as any).doctor_specialty}
                                  </Badge>
                                )}
                                {(property as any).booking_type && (
                                  <Badge variant="outline" className="text-gray-700 font-medium border-red-600 capitalize">
                                    {(property as any).booking_type === 'online' ? (isRTL ? 'استشارة أونلاين' : 'Online Consultation') : 
                                     (property as any).booking_type === 'in_person' ? (isRTL ? 'حضوري' : 'In-Person') : 
                                     (property as any).booking_type}
                                  </Badge>
                                )}
                              </div>
                            )}

                            <div className={`border-t pt-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                              <div className={`flex items-center gap-2 text-sm text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <User className="w-4 h-4" />
                                <span>{property.user.name}</span>
                              </div>
                              <div className={`flex items-center gap-2 text-sm text-gray-600 mt-1 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(property.created_at).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US')}</span>
                              </div>
                            </div>

                            {property.rejection_reason && (
                              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                                <p className={`text-sm text-red-800 ${isRTL ? 'text-right' : 'text-left'}`}>
                                  <strong>{isRTL ? "سبب الرفض: " : "Rejection Reason: "}</strong>
                                  {property.rejection_reason}
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className={`flex flex-col gap-2 pt-3 border-t ${isRTL ? 'flex-row-reverse' : ''}`}>
                          {property.status === 'pending' && (
                            <div className={`flex gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <Button
                                onClick={() => handleApprove(property.id)}
                                disabled={!isExpanded || processing === property.id}
                                className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                title={!isExpanded ? (isRTL ? "يجب توسيع التفاصيل أولاً" : "Must expand details first") : ""}
                              >
                                {processing === property.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <>
                                    <CheckCircle className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                                    {isRTL ? "موافقة" : "Approve"}
                                  </>
                                )}
                              </Button>
                              <Button
                                onClick={() => {
                                  setSelectedProperty(property);
                                  setShowRejectDialog(true);
                                }}
                                disabled={!isExpanded}
                                variant="destructive"
                                className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                title={!isExpanded ? (isRTL ? "يجب توسيع التفاصيل أولاً" : "Must expand details first") : ""}
                              >
                                <XCircle className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                                {isRTL ? "رفض" : "Reject"}
                              </Button>
                            </div>
                          )}
                          <div className={`flex gap-2 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <Button
                              onClick={() => {
                                console.log('Opening view dialog for property:', property);
                                setSelectedProperty(property);
                                setShowViewDialog(true);
                              }}
                              variant="outline"
                              className="flex-1"
                            >
                              <Eye className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                              {isRTL ? "عرض" : "View"}
                            </Button>
                            <Button
                              onClick={async () => {
                                setSelectedProperty(property);
                                // Extract governorate and city IDs
                                const govId = String((property as any).governorate?.id || (property as any).governorate_id || '');
                                const cityId = String((property as any).city?.id || (property as any).city_id || '');
                                
                                console.log('Opening edit dialog:', { 
                                  property: property.title,
                                  govId, 
                                  cityId,
                                  governorate: (property as any).governorate,
                                  city: (property as any).city,
                                  fullProperty: property
                                });
                                
                                // Set edit form with all property data including IDs
                                setEditForm({
                                  ...property,
                                  governorate_id: govId,
                                  city_id: cityId
                                } as any);
                                
                                // Load cities for the governorate before opening dialog
                                if (govId) {
                                  setSelectedGovernorateId(govId);
                                  
                                  // Load cities immediately
                                  try {
                                    const token = getAuthToken();
                                    const response = await fetch(`${API_URL}/governorates/${govId}/cities`, {
                                      headers: {
                                        'Authorization': `Bearer ${token}`,
                                        'Content-Type': 'application/json',
                                      },
                                    });

                                    if (response.ok) {
                                      const data = await response.json();
                                      if (data.success && data.data) {
                                        console.log('Cities loaded:', data.data);
                                        setCities(data.data);
                                      }
                                    }
                                  } catch (error) {
                                    console.error('Error loading cities:', error);
                                  }
                                }
                                
                                // Small delay to ensure cities are set before dialog opens
                                setTimeout(() => {
                                  setShowEditDialog(true);
                                }, 100);
                              }}
                              variant="outline"
                              className="flex-1"
                            >
                              <Edit className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                              {isRTL ? "تعديل" : "Edit"}
                            </Button>
                            {/* Only show activate/deactivate for approved properties */}
                            {property.status === 'approved' && (
                              <Button
                                onClick={() => handleToggleActive(property.id, property.is_active ?? true)}
                                disabled={processing === property.id}
                                variant="outline"
                                className={`flex-1 ${property.is_active === false 
                                  ? 'hover:bg-green-50 hover:text-green-600 hover:border-green-300' 
                                  : 'hover:bg-orange-50 hover:text-orange-600 hover:border-orange-300'
                                }`}
                              >
                                {processing === property.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <>
                                    <Power className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                                    {property.is_active === false 
                                      ? (isRTL ? "تفعيل" : "Activate")
                                      : (isRTL ? "تعطيل" : "Deactivate")
                                    }
                                  </>
                                )}
                              </Button>
                            )}
                            <Button
                              onClick={() => {
                                setSelectedProperty(property);
                                setShowDeleteDialog(true);
                              }}
                              variant="outline"
                              className="hover:bg-red-50 hover:text-red-600 hover:border-red-300"
                            >
                              <Trash2 className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                              {isRTL ? "حذف" : "Delete"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  );
                })}
                </div>
                
                {/* Page Counter - Bottom */}
                <PageCounter />
                
                {/* Pagination */}
                <Pagination />
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent dir={isRTL ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle className={isRTL ? 'text-right' : 'text-left'}>
              {isRTL ? "رفض العقار" : "Reject Property"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="rejection-reason" className={isRTL ? 'text-right' : 'text-left'}>
                {isRTL ? "سبب الرفض" : "Rejection Reason"}
              </Label>
              <Textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder={isRTL ? "أدخل سبب رفض العقار..." : "Enter reason for rejecting this property..."}
                rows={4}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter className={isRTL ? 'flex-row-reverse' : ''}>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              {isRTL ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleReject} variant="destructive" disabled={!rejectionReason.trim() || processing !== null}>
              {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : (isRTL ? "رفض" : "Reject")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" dir={isRTL ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle className={isRTL ? 'text-right' : 'text-left'}>
              {isRTL ? "تعديل العقار" : "Edit Property"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Common Fields */}
            <div>
              <Label htmlFor="edit-title">{isRTL ? "العنوان" : "Title"}</Label>
              <Input
                id="edit-title"
                value={editForm.title || ''}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="edit-description">{isRTL ? "الوصف" : "Description"}</Label>
              <Textarea
                id="edit-description"
                value={editForm.description || ''}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={4}
                className="mt-2"
              />
            </div>
            
            {/* Price & Rent/Buy */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-price">{isRTL ? "السعر" : "Price"}</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editForm.price || ''}
                  onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="edit-rent-buy">{isRTL ? "للبيع أو الإيجار" : "Rent or Buy"}</Label>
                <Select value={editForm.rent_or_buy || ''} onValueChange={(value) => setEditForm({ ...editForm, rent_or_buy: value })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={isRTL ? "اختر" : "Select"} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">{isRTL ? "للإيجار" : "For Rent"}</SelectItem>
                    <SelectItem value="buy">{isRTL ? "للبيع" : "For Sale"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Property-Specific Fields - Show ONLY if listing_type is 'property' */}
            {(editForm.listing_type === 'property' || !editForm.listing_type) && (
              <>
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold mb-3 text-green-600">{isRTL ? "تفاصيل العقار" : "Property Details"}</h3>
                  <div>
                    <Label htmlFor="edit-category">{isRTL ? "نوع العقار" : "Property Type"}</Label>
                    <Select value={editForm.category || ''} onValueChange={(value) => setEditForm({ ...editForm, category: value })}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder={isRTL ? "اختر النوع" : "Select type"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="villa">{isRTL ? "فيلا" : "Villa"}</SelectItem>
                        <SelectItem value="apartment">{isRTL ? "شقة" : "Apartment"}</SelectItem>
                        <SelectItem value="townhouse">{isRTL ? "تاون هاوس" : "Townhouse"}</SelectItem>
                        <SelectItem value="land">{isRTL ? "أرض" : "Land"}</SelectItem>
                        <SelectItem value="building">{isRTL ? "مبنى" : "Building"}</SelectItem>
                        <SelectItem value="commercial">{isRTL ? "تجاري" : "Commercial"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <Label htmlFor="edit-bedrooms">{isRTL ? "غرف النوم" : "Bedrooms"}</Label>
                      <Input
                        id="edit-bedrooms"
                        type="number"
                        value={editForm.bedrooms || ''}
                        onChange={(e) => setEditForm({ ...editForm, bedrooms: parseInt(e.target.value) })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-bathrooms">{isRTL ? "الحمامات" : "Bathrooms"}</Label>
                      <Input
                        id="edit-bathrooms"
                        type="number"
                        value={editForm.bathrooms || ''}
                        onChange={(e) => setEditForm({ ...editForm, bathrooms: parseInt(e.target.value) })}
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="edit-area">{isRTL ? "المساحة (م²)" : "Area (m²)"}</Label>
                      <Input
                        id="edit-area"
                        type="number"
                        value={editForm.area || ''}
                        onChange={(e) => setEditForm({ ...editForm, area: parseFloat(e.target.value) })}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Car-Specific Fields - Show ONLY if listing_type is 'car' */}
            {editForm.listing_type === 'car' && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold mb-3 text-blue-600">{isRTL ? "تفاصيل السيارة" : "Car Details"}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{isRTL ? "الماركة" : "Make"}</Label>
                    <Input
                      value={(editForm as any).car_make || ''}
                      onChange={(e) => setEditForm({ ...editForm, car_make: e.target.value } as any)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? "الموديل" : "Model"}</Label>
                    <Input
                      value={(editForm as any).car_model || ''}
                      onChange={(e) => setEditForm({ ...editForm, car_model: e.target.value } as any)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? "السنة" : "Year"}</Label>
                    <Input
                      type="number"
                      value={(editForm as any).car_year || ''}
                      onChange={(e) => setEditForm({ ...editForm, car_year: parseInt(e.target.value) } as any)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? "الحالة" : "Condition"}</Label>
                    <Select value={(editForm as any).car_condition || ''} onValueChange={(value) => setEditForm({ ...editForm, car_condition: value } as any)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">{isRTL ? "جديدة" : "New"}</SelectItem>
                        <SelectItem value="used">{isRTL ? "مستعملة" : "Used"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{isRTL ? "الكيلومترات" : "Mileage (km)"}</Label>
                    <Input
                      type="number"
                      value={(editForm as any).car_mileage || ''}
                      onChange={(e) => setEditForm({ ...editForm, car_mileage: parseInt(e.target.value) } as any)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? "ناقل الحركة" : "Transmission"}</Label>
                    <Select value={(editForm as any).car_transmission || ''} onValueChange={(value) => setEditForm({ ...editForm, car_transmission: value } as any)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="automatic">{isRTL ? "أوتوماتيك" : "Automatic"}</SelectItem>
                        <SelectItem value="manual">{isRTL ? "يدوي" : "Manual"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{isRTL ? "نوع الوقود" : "Fuel Type"}</Label>
                    <Select value={(editForm as any).car_fuel_type || ''} onValueChange={(value) => setEditForm({ ...editForm, car_fuel_type: value } as any)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gasoline">{isRTL ? "بنزين" : "Gasoline"}</SelectItem>
                        <SelectItem value="diesel">{isRTL ? "ديزل" : "Diesel"}</SelectItem>
                        <SelectItem value="electric">{isRTL ? "كهرباء" : "Electric"}</SelectItem>
                        <SelectItem value="hybrid">{isRTL ? "هجين" : "Hybrid"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Electronics-Specific Fields */}
            {editForm.listing_type === 'electronics' && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold mb-3 text-indigo-600">{isRTL ? "تفاصيل الإلكترونيات" : "Electronics Details"}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{isRTL ? "النوع" : "Type"}</Label>
                    <Input
                      value={(editForm as any).electronics_type || ''}
                      onChange={(e) => setEditForm({ ...editForm, electronics_type: e.target.value } as any)}
                      className="mt-2"
                      placeholder={isRTL ? "مثل: تلفزيون، لابتوب، كاميرا" : "e.g., TV, Laptop, Camera"}
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? "الماركة" : "Brand"}</Label>
                    <Input
                      value={(editForm as any).electronics_brand || ''}
                      onChange={(e) => setEditForm({ ...editForm, electronics_brand: e.target.value } as any)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? "الحالة" : "Condition"}</Label>
                    <Select value={(editForm as any).electronics_condition || ''} onValueChange={(value) => setEditForm({ ...editForm, electronics_condition: value } as any)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">{isRTL ? "جديد" : "New"}</SelectItem>
                        <SelectItem value="used">{isRTL ? "مستعمل" : "Used"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile-Specific Fields */}
            {editForm.listing_type === 'mobile' && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold mb-3 text-purple-600">{isRTL ? "تفاصيل الموبايل" : "Mobile Details"}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{isRTL ? "الماركة" : "Brand"}</Label>
                    <Input
                      value={(editForm as any).mobile_brand || ''}
                      onChange={(e) => setEditForm({ ...editForm, mobile_brand: e.target.value } as any)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? "الموديل" : "Model"}</Label>
                    <Input
                      value={(editForm as any).mobile_model || ''}
                      onChange={(e) => setEditForm({ ...editForm, mobile_model: e.target.value } as any)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? "السعة التخزينية" : "Storage"}</Label>
                    <Input
                      value={(editForm as any).mobile_storage || ''}
                      onChange={(e) => setEditForm({ ...editForm, mobile_storage: e.target.value } as any)}
                      className="mt-2"
                      placeholder={isRTL ? "مثل: 128 جيجا" : "e.g., 128GB"}
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? "الحالة" : "Condition"}</Label>
                    <Select value={(editForm as any).mobile_condition || ''} onValueChange={(value) => setEditForm({ ...editForm, mobile_condition: value } as any)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">{isRTL ? "جديد" : "New"}</SelectItem>
                        <SelectItem value="used">{isRTL ? "مستعمل" : "Used"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Job-Specific Fields */}
            {editForm.listing_type === 'job' && (
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold mb-3 text-orange-600">{isRTL ? "تفاصيل الوظيفة" : "Job Details"}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>{isRTL ? "نوع الوظيفة" : "Job Type"}</Label>
                    <Input
                      value={(editForm as any).job_type || ''}
                      onChange={(e) => setEditForm({ ...editForm, job_type: e.target.value } as any)}
                      className="mt-2"
                      placeholder={isRTL ? "مثل: هندسة، تسويق" : "e.g., Engineering, Marketing"}
                    />
                  </div>
                  <div>
                    <Label>{isRTL ? "مستوى الخبرة" : "Experience Level"}</Label>
                    <Select value={(editForm as any).job_experience_level || ''} onValueChange={(value) => setEditForm({ ...editForm, job_experience_level: value } as any)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">{isRTL ? "مبتدئ" : "Entry Level"}</SelectItem>
                        <SelectItem value="mid">{isRTL ? "متوسط" : "Mid Level"}</SelectItem>
                        <SelectItem value="senior">{isRTL ? "خبير" : "Senior Level"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{isRTL ? "نوع التوظيف" : "Employment Type"}</Label>
                    <Select value={(editForm as any).job_employment_type || ''} onValueChange={(value) => setEditForm({ ...editForm, job_employment_type: value } as any)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">{isRTL ? "دوام كامل" : "Full Time"}</SelectItem>
                        <SelectItem value="part-time">{isRTL ? "دوام جزئي" : "Part Time"}</SelectItem>
                        <SelectItem value="contract">{isRTL ? "عقد" : "Contract"}</SelectItem>
                        <SelectItem value="freelance">{isRTL ? "عمل حر" : "Freelance"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-governorate">{isRTL ? "المحافظة" : "Governorate"}</Label>
                <Select 
                  value={String((editForm as any).governorate_id || '')} 
                  onValueChange={(value) => {
                    const previousGovId = String((editForm as any).governorate_id || '');
                    
                    // Only clear city if governorate actually changed to a different one
                    if (previousGovId && previousGovId !== value) {
                      // Governorate changed, clear city
                      setEditForm({ ...editForm, governorate_id: value, city_id: '' } as any);
                    } else {
                      // Same governorate or first selection, keep city
                      setEditForm({ ...editForm, governorate_id: value } as any);
                    }
                    
                    // Update selected governorate to trigger city loading
                    setSelectedGovernorateId(value);
                  }}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={isRTL ? "اختر المحافظة" : "Select governorate"} />
                  </SelectTrigger>
                  <SelectContent>
                    {governorates.map((gov) => (
                      <SelectItem key={gov.id} value={String(gov.id)}>
                        {isRTL ? gov.name_ar : gov.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-city">{isRTL ? "المدينة" : "City"}</Label>
                <Select 
                  value={String((editForm as any).city_id || '')} 
                  onValueChange={(value) => setEditForm({ ...editForm, city_id: value } as any)}
                  disabled={!cities.length}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={isRTL ? "اختر المدينة" : "Select city"} />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.id} value={String(city.id)}>
                        {isRTL ? city.name_ar : city.name_en}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-price">{isRTL ? "السعر" : "Price"}</Label>
                <Input
                  id="edit-price"
                  type="number"
                  value={editForm.price || ''}
                  onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="edit-area">{isRTL ? "المساحة (م²)" : "Area (m²)"}</Label>
                <Input
                  id="edit-area"
                  type="number"
                  value={editForm.area || ''}
                  onChange={(e) => setEditForm({ ...editForm, area: parseFloat(e.target.value) })}
                  className="mt-2"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-bedrooms">{isRTL ? "غرف النوم" : "Bedrooms"}</Label>
                <Input
                  id="edit-bedrooms"
                  type="number"
                  value={editForm.bedrooms || ''}
                  onChange={(e) => setEditForm({ ...editForm, bedrooms: parseInt(e.target.value) })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="edit-bathrooms">{isRTL ? "الحمامات" : "Bathrooms"}</Label>
                <Input
                  id="edit-bathrooms"
                  type="number"
                  value={editForm.bathrooms || ''}
                  onChange={(e) => setEditForm({ ...editForm, bathrooms: parseInt(e.target.value) })}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
          <DialogFooter className={isRTL ? 'flex-row-reverse' : ''}>
            <Button variant="outline" onClick={() => {
              setShowEditDialog(false);
              setEditForm({});
              setSelectedProperty(null);
              setSelectedGovernorateId('');
              setCities([]);
            }}>
              {isRTL ? "إلغاء" : "Cancel"}
            </Button>
            <Button onClick={handleUpdate} disabled={processing !== null}>
              {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : (isRTL ? "حفظ" : "Save")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Full Details Dialog */}
      <Dialog open={showViewDialog} onOpenChange={setShowViewDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir={isRTL ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle className={isRTL ? 'text-right' : 'text-left'}>
              {isRTL ? "تفاصيل العقار الكاملة" : "Full Property Details"}
            </DialogTitle>
          </DialogHeader>
          
          {selectedProperty && (
            <div className="space-y-6">
              {/* Image Gallery */}
              {selectedProperty.images && selectedProperty.images.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">{isRTL ? "الصور" : "Images"}</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedProperty.images.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={getImageUrl(image)}
                          alt={`${selectedProperty.title} - ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Property Information */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedProperty.title}</h2>
                      <div className={`flex items-center gap-2 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <MapPin className="w-4 h-4" />
                        <span>{selectedProperty.location_city}, {selectedProperty.location_governorate}</span>
                      </div>
                    </div>
                    {getStatusBadge(selectedProperty.status)}
                  </div>
                  <div className="mt-4">
                    <div className="text-3xl font-bold text-blue-600">
                      {formatPrice(selectedProperty.price)}
                    </div>
                    <Badge variant="outline" className="mt-2">
                      {selectedProperty.rent_or_buy === 'rent' ? (isRTL ? 'للإيجار' : 'For Rent') : (isRTL ? 'للبيع' : 'For Sale')}
                    </Badge>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className={`font-semibold text-lg mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? "الوصف" : "Description"}
                  </h3>
                  <p className={`text-gray-700 whitespace-pre-wrap ${isRTL ? 'text-right' : 'text-left'}`}>
                    {selectedProperty.description}
                  </p>
                </div>

                {/* Property Features */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {selectedProperty.bedrooms && (
                    <div className={`flex items-center gap-2 bg-gray-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Bed className="w-5 h-5 text-gray-600" />
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <p className="text-sm text-gray-500">{isRTL ? "غرف النوم" : "Bedrooms"}</p>
                        <p className="font-semibold">{selectedProperty.bedrooms}</p>
                      </div>
                    </div>
                  )}
                  {selectedProperty.bathrooms && (
                    <div className={`flex items-center gap-2 bg-gray-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Bath className="w-5 h-5 text-gray-600" />
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <p className="text-sm text-gray-500">{isRTL ? "الحمامات" : "Bathrooms"}</p>
                        <p className="font-semibold">{selectedProperty.bathrooms}</p>
                      </div>
                    </div>
                  )}
                  {selectedProperty.area && (
                    <div className={`flex items-center gap-2 bg-gray-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <Square className="w-5 h-5 text-gray-600" />
                      <div className={isRTL ? 'text-right' : 'text-left'}>
                        <p className="text-sm text-gray-500">{isRTL ? "المساحة" : "Area"}</p>
                        <p className="font-semibold">{selectedProperty.area} {isRTL ? 'م²' : 'm²'}</p>
                      </div>
                    </div>
                  )}
                  <div className={`flex items-center gap-2 bg-gray-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Home className="w-5 h-5 text-gray-600" />
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <p className="text-sm text-gray-500">{isRTL ? "النوع" : "Type"}</p>
                      <p className="font-semibold capitalize">{selectedProperty.category}</p>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className={`flex items-center gap-2 bg-blue-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Eye className="w-5 h-5 text-blue-600" />
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <p className="text-sm text-gray-600">{isRTL ? "المشاهدات" : "Views"}</p>
                      <p className="font-semibold text-blue-600">{selectedProperty.views_count || 0}</p>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2 bg-green-50 p-3 rounded-lg ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <MessageSquare className="w-5 h-5 text-green-600" />
                    <div className={isRTL ? 'text-right' : 'text-left'}>
                      <p className="text-sm text-gray-600">{isRTL ? "الاستفسارات" : "Inquiries"}</p>
                      <p className="font-semibold text-green-600">{selectedProperty.inquiries_count || 0}</p>
                    </div>
                  </div>
                </div>

                {/* Seller Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className={`font-semibold text-lg mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? "معلومات البائع" : "Seller Information"}
                  </h3>
                  <div className="space-y-2">
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">
                        <strong>{isRTL ? "الاسم: " : "Name: "}</strong>
                        {selectedProperty.user.name || (isRTL ? "غير معروف" : "Unknown")}
                      </span>
                    </div>
                    {selectedProperty.user.username && (
                      <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          <strong>{isRTL ? "اسم المستخدم: " : "Username: "}</strong>
                          @{selectedProperty.user.username}
                        </span>
                      </div>
                    )}
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <DollarSign className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">
                        <strong>{isRTL ? "البريد الإلكتروني: " : "Email: "}</strong>
                        {selectedProperty.user.email}
                      </span>
                    </div>
                    {selectedProperty.user.phone && (
                      <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <DollarSign className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-700">
                          <strong>{isRTL ? "الهاتف: " : "Phone: "}</strong>
                          {selectedProperty.user.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submission Date */}
                <div className={`flex items-center gap-2 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Calendar className="w-4 h-4" />
                  <span>
                    <strong>{isRTL ? "تاريخ التقديم: " : "Submitted: "}</strong>
                    {new Date(selectedProperty.created_at).toLocaleString(isRTL ? 'ar-EG' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {/* Rejection Reason */}
                {selectedProperty.rejection_reason && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className={`font-semibold text-red-800 mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {isRTL ? "سبب الرفض" : "Rejection Reason"}
                    </h3>
                    <p className={`text-red-700 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {selectedProperty.rejection_reason}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter className={isRTL ? 'flex-row-reverse' : ''}>
            <Button variant="outline" onClick={() => setShowViewDialog(false)}>
              {isRTL ? "إغلاق" : "Close"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="max-w-md" dir={isRTL ? 'rtl' : 'ltr'}>
          <DialogHeader>
            <DialogTitle className={`text-xl font-bold ${isRTL ? 'text-right' : 'text-left'}`}>
              {isRTL ? "تأكيد الحذف" : "Confirm Deletion"}
            </DialogTitle>
          </DialogHeader>
          
          <div className={`py-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
              <div>
                <p className="font-semibold text-red-900 mb-1">
                  {isRTL ? "سيتم حذف العقار التالي:" : "The following property will be deleted:"}
                </p>
                <p className="text-red-700 font-medium">
                  "{selectedProperty?.title}"
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-3">
              {isRTL 
                ? "هل أنت متأكد من حذف هذا العقار؟ سيتم حذف جميع الصور والبيانات المرتبطة به بشكل دائم."
                : "Are you sure you want to delete this property? All images and associated data will be permanently removed."
              }
            </p>
            
            <p className="text-sm text-gray-600 font-medium">
              {isRTL ? "هذا الإجراء لا يمكن التراجع عنه." : "This action cannot be undone."}
            </p>
          </div>

          <DialogFooter className={`gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <Button 
              variant="outline" 
              onClick={() => {
                setShowDeleteDialog(false);
                setSelectedProperty(null);
              }}
              disabled={processing !== null}
              className="flex-1"
            >
              {isRTL ? "إلغاء" : "Cancel"}
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              disabled={processing !== null}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  {isRTL ? "جاري الحذف..." : "Deleting..."}
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isRTL ? "حذف نهائي" : "Delete Permanently"}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPropertyApproval;

