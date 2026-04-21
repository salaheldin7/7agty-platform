import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { ChatNotification } from "@/components/ChatNotification";
import { 
  Menu, 
  User, 
  LogOut, 
  Shield, 
  Home, 
  Building, 
  Plus, 
  List, 
  Globe, 
  Building2,
  ChevronDown,
  X,
  Info,
  Mail,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  initializeSession, 
  isAuthenticated, 
  getUser, 
  logout as authLogout,
  setupAuthSync,
  refreshSession,
  getAuthToken
} from "@/utils/auth";
import { API_URL } from "@/config/api";

  
const Navigation = () => {
  const { t } = useTranslation();
  const { language, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isFounder, setIsFounder] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [authLoaded, setAuthLoaded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

    const handleLanguageToggle = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setSearchParams({ lang: newLang });
  };
  // Optimized auth check with session management
  const checkAuth = useCallback(() => {
    try {
      initializeSession();
      
      if (isAuthenticated()) {
        const userData = getUser();
        if (userData) {
          setUser(userData);
          setIsFounder(userData.is_founder || false);
          setIsAdmin(userData.is_admin || userData.is_founder || false);
          setIsSeller(userData.role === 'seller' || userData.is_seller || false);
          setAuthLoaded(true);
          return;
        }
      }
      
      setUser(null);
      setIsAdmin(false);
      setIsSeller(false);
      setIsFounder(false);
    } catch (error) {
      console.error('Auth check error:', error);
      authLogout(false);
      setUser(null);
      setIsAdmin(false);
      setIsSeller(false);
      setIsFounder(false);
    } finally {
      setAuthLoaded(true);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const cleanupAuthSync = setupAuthSync(
      () => checkAuth(),
      () => {
        setUser(null);
        setIsAdmin(false);
        setIsSeller(false);
        setIsFounder(false);
        navigate('/');
      }
    );

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element)?.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        refreshSession();
        checkAuth();
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      cleanupAuthSync();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkAuth, navigate]);

  const handleLogout = async () => {
    try {
      const token = getAuthToken();
      if (token) {
        fetch(`${API_URL}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }).catch(() => {});
      }
    } catch (error) {
      console.error('Logout error:', error);
    }

    authLogout(true);
    setUser(null);
    setIsAdmin(false);
    setIsSeller(false);
    setShowUserMenu(false);
    navigate('/');
    
    toast({
      title: t('nav.logout'),
      description: "You have been logged out successfully.",
    });
  };

  const navItems = [
    { name: t('nav.home'), path: "/", icon: Home },
    { name: t('nav.marketplace'), path: "/marketplace", icon: Building },
    { name: t('nav.about'), path: "/about", icon: Info },
    { name: t('nav.contact'), path: "/contact", icon: Mail },
  ];

  const sellerItems = [
    { name: t('nav.sellerPanel'), path: "/seller-panel", icon: List },
    { name: t('nav.myAds'), path: "/my-ads", icon: List },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-gradient-to-r from-white via-sky-50/80 to-blue-50/80 backdrop-blur-lg shadow-lg animate-gradient-x' 
            : 'bg-gradient-to-r from-white/90 via-sky-50/60 to-blue-50/60 backdrop-blur-md shadow-md animate-gradient-x'
        }`} 
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className="w-full">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`flex items-center h-16 ${isRTL ? 'flex-row-reverse' : ''}`}>
              
              {/* Logo - Absolute far left for desktop */}
              <Link 
                to="/" 
                className={`flex items-center gap-2 group flex-shrink-0 min-w-fit ${isRTL ? 'lg:mr-auto' : 'lg:absolute lg:left-8'}`}
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <div className="hidden xl:block">
                  <span className="font-bold text-base bg-gradient-to-r from-sky-600 to-blue-700 bg-clip-text text-transparent block leading-tight whitespace-nowrap">
                    {isRTL ? 'حاجتي 7agty' : '7agty حاجتي'}
                  </span>
                  <span className="text-xs text-gray-600 font-medium whitespace-nowrap">
                    {isRTL ? 'سوق عالمي' : 'Global Marketplace'}
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation - Centered with no wrap */}
              <div className="hidden lg:flex items-center flex-1 justify-center gap-3 min-w-0 ml-[200px]">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`group relative text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${
                      location.pathname === item.path 
                        ? 'text-white bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg' 
                        : 'text-gray-700 hover:text-sky-600 hover:bg-sky-50'
                    } ${isRTL ? 'flex-row-reverse' : ''} flex items-center gap-2`}
                  >
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    <span className="whitespace-nowrap">{item.name}</span>
                  </Link>
                ))}
              </div>

            {/* Desktop Right Actions */}
            <div className={`hidden lg:flex items-center gap-2 flex-shrink-0 min-w-fit ${isRTL ? 'flex-row-reverse' : ''}`}>
              
              {authLoaded && user && (isSeller || isAdmin) && (
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse border-r border-gray-200 pr-3 mr-3' : 'border-l border-gray-200 pl-3 ml-3'}`}>
                  {sellerItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`text-sm font-semibold px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                        location.pathname === item.path 
                          ? 'text-sky-700 bg-sky-50 shadow-md' 
                          : 'text-gray-700 hover:text-sky-600 hover:bg-sky-50'
                      } flex items-center gap-2`}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={handleLanguageToggle}
                className="h-10 px-3 text-sm font-semibold rounded-lg text-gray-700 hover:bg-sky-50 hover:text-sky-600 border border-gray-200 whitespace-nowrap flex-shrink-0"
              >
                <Globe className="w-4 h-4 mr-2" />
                {language === 'en' ? 'العربية' : 'English'}
              </Button>

              {authLoaded && user && <ChatNotification />}

              {authLoaded ? (
                user ? (
                  <div className="relative user-menu-container">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowUserMenu(!showUserMenu);
                      }}
                      className={`h-11 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 ${isRTL ? 'flex-row-reverse' : ''} flex items-center gap-2`}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-blue-600 border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-md">
                        {user.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <span className="text-sm font-semibold text-gray-700 max-w-24 truncate">{user.name}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </Button>

                    {showUserMenu && (
                      <div className={`absolute top-full mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 ${isRTL ? 'right-0' : 'left-0'}`}>
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className={`flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                          <User className="w-4 h-4" />
                          <span>{t('nav.profile')}</span>
                        </Link>
                        
                        {isAdmin && (
                          <>
                            <Link
                              to="/admin"
                              onClick={() => setShowUserMenu(false)}
                              className={`flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                              <Shield className="w-4 h-4" />
                              <span>{t('nav.admin')}</span>
                            </Link>
                          </>
                        )}
                        
                        <div className="border-t border-gray-100 my-2"></div>
                        
                        <button
                          onClick={() => {
                            handleLogout();
                            setShowUserMenu(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                          <LogOut className="w-4 h-4" />
                          <span>{t('nav.logout')}</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Link to="/login">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-10 px-4 text-sm font-semibold rounded-lg text-gray-700 hover:bg-sky-50 hover:text-sky-600 border border-gray-200"
                      >
                        {t('nav.login')}
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button 
                        size="sm" 
                        className="h-10 px-4 text-sm font-semibold rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                      >
                        {t('nav.register')}
                      </Button>
                    </Link>
                  </div>
                )
              ) : (
                <div className="w-32 h-9 bg-gray-100 animate-pulse rounded-lg"></div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className={`flex lg:hidden items-center gap-2 ml-auto ${isRTL ? 'flex-row-reverse mr-auto ml-0' : ''}`}>
              {/* Mobile Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLanguageToggle}
                className="h-10 w-10 p-0 rounded-lg text-gray-600 hover:bg-sky-50"
              >
                <Globe className="w-5 h-5" />
              </Button>

              {/* Mobile Chat */}
              {authLoaded && user && (
                <div className="flex items-center">
                  <ChatNotification />
                </div>
              )}

              {/* Mobile Menu Button */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-10 w-10 p-0 rounded-lg text-gray-600 hover:bg-sky-50"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent 
  side={isRTL ? "left" : "right"} 
  className="w-full max-w-sm bg-gradient-to-b from-white to-gray-50 p-0 border-0 overflow-hidden flex flex-col [&>button]:hidden" 
  dir={isRTL ? 'rtl' : 'ltr'}
  style={{ maxHeight: '80vh', height: '80vh' }}
>
  {/* Accessibility elements - hidden but required */}
  <div className="sr-only">
    <h2>{isRTL ? 'القائمة الرئيسية' : 'Main Menu'}</h2>
    <p>{isRTL ? 'قائمة التنقل الرئيسية للموقع' : 'Main navigation menu'}</p>
  </div>

  {/* Header with Close Button */}
  <div className={`relative flex items-center justify-between px-6 py-5 bg-gradient-to-br from-sky-500 via-blue-500 to-cyan-600 shadow-xl ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="relative">
                        <div className="w-11 h-11 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-lg">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <span className="font-bold text-white text-xl block leading-tight">
                          {isRTL ? 'حاجتي 7agty' : '7agty حاجتي'}
                        </span>
                        <span className="text-sky-50 text-xs font-medium">
                          {isRTL ? 'القائمة الرئيسية' : 'Main Menu'}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="h-10 w-10 p-0 rounded-xl hover:bg-white/20 transition-all duration-200 active:scale-95"
                    >
                      <X className="w-5 h-5 text-white" />
                    </Button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
                    
                    {/* User Info */}
                    {authLoaded && user && (
                      <div className={`relative bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 rounded-2xl p-4 border-2 border-sky-100 shadow-sm ${isRTL ? 'text-right' : ''}`}>
                        <div className="absolute top-2 right-2 w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
                        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className="relative">
                            <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg">
                              {user.name?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-md">
                              <span className="text-xs">
                                {isFounder ? '👑' : isAdmin ? '⚡' : isSeller ? '🏪' : '👤'}
                              </span>
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-base text-gray-800 truncate">{user.name || 'User'}</p>
                            <p className="text-xs text-gray-600 truncate">{user.email}</p>
                            <span className="text-xs text-sky-700 font-semibold px-2 py-0.5 bg-sky-100 rounded-lg inline-block mt-1">
                              {isFounder ? 'Founder' : isAdmin ? 'Admin' : isSeller ? 'Seller' : 'User'}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Main Navigation */}
                    <div className="space-y-1.5">
                      <h3 className={`text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-3 ${isRTL ? 'text-right' : ''}`}>
                        {isRTL ? 'التنقل' : 'Navigation'}
                      </h3>
                      {navItems.map((item, index) => (
                        <Link
                          key={item.name}
                          to={item.path}
                          className={`group flex items-center gap-3 text-sm font-semibold py-3 px-3.5 rounded-xl transition-all duration-200 ${
                            location.pathname === item.path 
                              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-200' 
                              : 'text-gray-700 hover:bg-white hover:shadow-md active:scale-[0.98]'
                          } ${isRTL ? 'flex-row-reverse' : ''}`}
                          onClick={() => setIsOpen(false)}
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                            location.pathname === item.path ? 'bg-white/25 scale-110' : 'bg-gradient-to-br from-sky-50 to-blue-50 group-hover:scale-110'
                          }`}>
                            <item.icon className={`w-4.5 h-4.5 ${location.pathname === item.path ? 'text-white' : 'text-sky-600'}`} />
                          </div>
                          <span className="flex-1">{item.name}</span>
                          {location.pathname === item.path && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          )}
                        </Link>
                      ))}
                    </div>

                    {/* Seller Section */}
                    {authLoaded && user && (isSeller || isAdmin) && (
                      <div className="space-y-1.5 pt-3">
                        <h3 className={`text-[11px] font-bold text-sky-600 uppercase tracking-wider mb-2 px-3 ${isRTL ? 'text-right' : ''}`}>
                          {isRTL ? '🏪 البائع' : '🏪 Seller'}
                        </h3>
                        {sellerItems.map((item, index) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className={`group flex items-center gap-3 text-sm font-semibold py-3 px-3.5 rounded-xl transition-all duration-200 ${
                              location.pathname === item.path 
                                ? 'bg-sky-50 text-sky-700 border-2 border-sky-200 shadow-sm' 
                                : 'text-gray-700 hover:bg-white hover:shadow-md active:scale-[0.98]'
                            } ${isRTL ? 'flex-row-reverse' : ''}`}
                            onClick={() => setIsOpen(false)}
                          >
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                              location.pathname === item.path ? 'bg-sky-100 scale-110' : 'bg-gray-100 group-hover:scale-110'
                            }`}>
                              <item.icon className="w-4.5 h-4.5 text-sky-600" />
                            </div>
                            <span className="flex-1">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Admin Section */}
                    {authLoaded && user && isAdmin && (
                      <div className="space-y-1.5 pt-3">
                        <h3 className={`text-[11px] font-bold text-purple-600 uppercase tracking-wider mb-2 px-3 ${isRTL ? 'text-right' : ''}`}>
                          {isRTL ? '⚡ الإدارة' : '⚡ Admin'}
                        </h3>
                        <Link
                          to="/admin"
                          onClick={() => setIsOpen(false)}
                          className={`group flex items-center gap-3 text-sm font-semibold py-3 px-3.5 rounded-xl transition-all duration-200 ${
                            location.pathname === '/admin' 
                              ? 'bg-purple-50 text-purple-700 border-2 border-purple-200 shadow-sm' 
                              : 'text-gray-700 hover:bg-white hover:shadow-md active:scale-[0.98]'
                          } ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                            location.pathname === '/admin' ? 'bg-purple-100 scale-110' : 'bg-gray-100 group-hover:scale-110'
                          }`}>
                            <Shield className="w-4.5 h-4.5 text-purple-600" />
                          </div>
                          <span className="flex-1">{t('nav.admin')}</span>
                        </Link>
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom Actions */}
                  <div className="border-t border-gray-200 bg-white px-4 py-4 space-y-2.5 shadow-lg">
                    {authLoaded ? (
                      user ? (
                        <>
                          <Link to="/profile" onClick={() => setIsOpen(false)}>
                            <Button 
                              variant="outline" 
                              className="w-full h-11 text-sm font-semibold rounded-xl border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98] shadow-sm"
                            >
                              <User className="w-4.5 h-4.5 mr-2" />
                              {t('nav.profile')}
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            className="w-full h-11 text-sm font-semibold rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all active:scale-[0.98] shadow-sm"
                            onClick={() => {
                              handleLogout();
                              setIsOpen(false);
                            }}
                          >
                            <LogOut className="w-4.5 h-4.5 mr-2" />
                            {t('nav.logout')}
                          </Button>
                        </>
                      ) : (
                        <div className="space-y-2.5">
                          <Link to="/login" onClick={() => setIsOpen(false)} className="block">
                            <Button 
                              variant="outline" 
                              className="w-full h-11 text-sm font-semibold rounded-xl border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all active:scale-[0.98] shadow-sm"
                            >
                              {t('nav.login')}
                            </Button>
                          </Link>
                          <Link to="/register" onClick={() => setIsOpen(false)} className="block">
                            <Button 
                              className="w-full h-11 text-sm font-semibold rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-cyan-600 hover:from-sky-600 hover:via-blue-600 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                            >
                              {t('nav.register')}
                            </Button>
                          </Link>
                        </div>
                      )
                    ) : (
                      <div className="space-y-2.5">
                        <div className="w-full h-11 bg-gray-200 animate-pulse rounded-xl"></div>
                        <div className="w-full h-11 bg-gray-200 animate-pulse rounded-xl"></div>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
          </div>
        </div>
      </nav>
      
      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
};

export default Navigation;