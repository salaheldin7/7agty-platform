import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { API_URL } from "@/config/api";
import { SEO } from "@/components/SEO";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  User, 
  Tag, 
  Send, 
  Check,
  Building,
  Home
} from "lucide-react";

const Contact = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    property_interest: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // API call to send contact message to Laravel backend
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setIsSubmitted(true);
      toast({
        title: t('contact.messageSent'),
        description: isRTL 
          ? "سيتواصل معك فريقنا خلال 24 ساعة."
          : "Our team will get back to you within 24 hours.",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          property_interest: ''
        });
      }, 3000);

    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: isRTL ? "فشل في إرسال الرسالة" : "Failed to send message",
        description: isRTL 
          ? "يرجى المحاولة مرة أخرى لاحقاً أو الاتصال بنا مباشرة."
          : "Please try again later or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <SEO 
        title="Contact Us - Get in Touch with 7agty حاجتي Team"
        titleAr="اتصل بنا - تواصل مع فريق حاجتي"
        description="Have questions about products or services in Egypt? Contact 7agty team. We're here to help you buy, sell, or rent anything. Reach us via email, phone, or visit our office in Cairo."
        descriptionAr="هل لديك أسئلة حول المنتجات أو الخدمات في مصر؟ اتصل بفريق حاجتي. نحن هنا لمساعدتك في شراء أو بيع أو استئجار أي شيء. تواصل معنا عبر البريد الإلكتروني أو الهاتف أو قم بزيارة مكتبنا في القاهرة"
        keywords="contact 7agty, support Egypt, inquiries, customer service, hagty, حاجتي"
        keywordsAr="اتصل بحاجتي, دعم مصر, استفسارات, خدمة العملاء, حاجتي"
        canonical="https://7agty.com/contact"
      />
      <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen font-sans pt-16">
        {/* Hero Section */}
        <section className="py-24 bg-gradient-to-br from-slate-50 via-sky-50/30 to-blue-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-sky-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-cyan-200/20 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-500/10 to-blue-500/10 backdrop-blur-sm border border-sky-200/30 text-sky-700 font-medium mb-8 transition-all duration-500 hover:scale-105 hover:shadow-lg ${isRTL ? 'space-x-reverse' : ''}`}>
              <Mail className="w-5 h-5" />
              <span className="text-sm font-semibold">
                {isRTL ? 'تواصل معنا' : 'Get In Touch'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent leading-tight">
              {isRTL ? 'تواصل مع فريق حاجتي' : 'Contact 7agty Team'}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {isRTL 
                ? 'هل تبحث عن شيء معين أو تحتاج إلى مساعدة؟ فريقنا المتمرس هنا لمساعدتك في إيجاد ما تحتاجه.'
                : 'Looking for something specific or need help? Our experienced team is here to help you find what you need.'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Enhanced Contact Form */}
            <div className="order-2 lg:order-1">
              <Card className="overflow-hidden border-0 shadow-2xl bg-white/70 backdrop-blur-xl rounded-3xl transition-all duration-500 hover:shadow-3xl hover:bg-white/80">
                <div className="relative">
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-400/30 via-blue-400/20 to-cyan-400/30 rounded-3xl blur-lg opacity-50"></div>
                  <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-10 m-1">
                    {isSubmitted ? (
                      // Success State
                      <div className="text-center py-16">
                        <div className="mb-8">
                          <div className="w-24 h-24 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce shadow-lg">
                            <Check className="w-12 h-12 text-white" />
                          </div>
                          <h3 className="text-3xl font-bold text-gray-800 mb-4">
                            {isRTL ? 'تم إرسال الرسالة!' : 'Message Sent!'}
                          </h3>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            {isRTL 
                              ? 'شكراً لتواصلك معنا. سيقوم فريقنا بالرد خلال 24 ساعة.'
                              : 'Thank you for contacting us. Our team will respond within 24 hours.'
                            }
                          </p>
                        </div>
                      </div>
                    ) : (
                      // Contact Form
                      <CardContent className="p-0">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                          {isRTL ? 'أرسل لنا رسالة' : 'Send us a Message'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-8">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                                {isRTL ? 'الاسم الكامل' : 'Full Name'} *
                              </Label>
                              <div className="relative group">
                                <Input
                                  id="name"
                                  value={formData.name}
                                  onChange={(e) => handleInputChange('name', e.target.value)}
                                  placeholder={isRTL ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                                  className="border-2 border-gray-200 focus:border-sky-400 focus:ring-sky-400/20 rounded-2xl py-4 pl-5 pr-14 transition-all duration-300 group-hover:border-sky-300 group-hover:shadow-md bg-white/80 backdrop-blur-sm"
                                  required
                                />
                                <User className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sky-500 transition-all duration-300`} />
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                                {isRTL ? 'عنوان البريد الإلكتروني' : 'Email Address'} *
                              </Label>
                              <div className="relative group">
                                <Input
                                  id="email"
                                  type="email"
                                  value={formData.email}
                                  onChange={(e) => handleInputChange('email', e.target.value)}
                                  placeholder={isRTL ? 'أدخل عنوان البريد الإلكتروني' : 'Enter email address'}
                                  className="border-2 border-gray-200 focus:border-sky-400 focus:ring-sky-400/20 rounded-2xl py-4 pl-5 pr-14 transition-all duration-300 group-hover:border-sky-300 group-hover:shadow-md bg-white/80 backdrop-blur-sm"
                                  required
                                />
                                <Mail className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sky-500 transition-all duration-300`} />
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="phone" className="text-sm font-semibold text-gray-700">
                              {isRTL ? 'رقم الهاتف' : 'Phone Number'}
                            </Label>
                            <div className="relative group">
                              <Input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                placeholder="+20 100 123 4567"
                                className="border-2 border-gray-200 focus:border-sky-400 focus:ring-sky-400/20 rounded-2xl py-4 pl-5 pr-14 transition-all duration-300 group-hover:border-sky-300 group-hover:shadow-md bg-white/80 backdrop-blur-sm"
                              />
                              <Phone className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sky-500 transition-all duration-300`} />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                              {isRTL ? 'الموضوع' : 'Subject'} *
                            </Label>
                            <div className="relative group">
                              <Input
                                id="subject"
                                value={formData.subject}
                                onChange={(e) => handleInputChange('subject', e.target.value)}
                                placeholder={isRTL ? 'استفسار عن منتج، نصائح، إلخ.' : 'Product inquiry, advice, etc.'}
                                className="border-2 border-gray-200 focus:border-sky-400 focus:ring-sky-400/20 rounded-2xl py-4 pl-5 pr-14 transition-all duration-300 group-hover:border-sky-300 group-hover:shadow-md bg-white/80 backdrop-blur-sm"
                                required
                              />
                              <Tag className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sky-500 transition-all duration-300`} />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Label htmlFor="message" className="text-sm font-semibold text-gray-700">
                              {isRTL ? 'الرسالة' : 'Message'} *
                            </Label>
                            <div className="relative group">
                              <Textarea
                                id="message"
                                value={formData.message}
                                onChange={(e) => handleInputChange('message', e.target.value)}
                                placeholder={isRTL ? 'أخبرنا عن احتياجاتك، ما تبحث عنه، الميزانية، إلخ.' : 'Tell us about your needs, what you are looking for, budget, etc.'}
                                rows={6}
                                className="border-2 border-gray-200 focus:border-sky-400 focus:ring-sky-400/20 rounded-2xl py-4 px-5 transition-all duration-300 resize-none group-hover:border-sky-300 group-hover:shadow-md bg-white/80 backdrop-blur-sm"
                                required
                              />
                            </div>
                          </div>

                          <Button 
                            type="submit" 
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-600 hover:via-sky-700 hover:to-blue-700 text-white font-bold py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                          >
                            {isSubmitting ? (
                              <div className={`flex items-center justify-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                <span>{isRTL ? 'جاري الإرسال...' : 'Sending...'}</span>
                              </div>
                            ) : (
                              <div className={`flex items-center justify-center space-x-3 ${isRTL ? 'space-x-reverse' : ''}`}>
                                <Send className="w-5 h-5" />
                                <span>{isRTL ? 'إرسال الرسالة' : 'Send Message'}</span>
                              </div>
                            )}
                          </Button>
                        </form>
                      </CardContent>
                    )}
                  </div>
                </div>
              </Card>
            </div>

            {/* Enhanced Contact Information */}
            <div className="space-y-6 order-1 lg:order-2">
              {/* Email Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-sky-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border border-blue-100/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] rounded-3xl">
                  <CardContent className="p-8">
                    <div className={`flex items-center space-x-5 ${isRTL ? 'space-x-reverse' : ''}`}>
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:shadow-blue-500/25 transition-all duration-300">
                        <Mail className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                          {isRTL ? 'راسلنا بالبريد الإلكتروني' : 'Email Us'}
                        </h3>
                        <p className="text-xl text-gray-600 hover:text-blue-600 transition-colors duration-300 cursor-pointer font-semibold">
                          admin@7agty.com
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {isRTL ? 'نرد خلال 24 ساعة' : 'We respond within 24 hours'}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Office Hours Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border border-teal-100/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] rounded-3xl">
                  <CardContent className="p-8">
                    <div className={`flex items-start space-x-5 ${isRTL ? 'space-x-reverse' : ''}`}>
                      <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:shadow-teal-500/25 transition-all duration-300">
                        <Clock className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          {isRTL ? 'ساعات المكتب' : 'Office Hours'}
                        </h3>
                        <div className="space-y-3">
                          <p className="text-gray-600 text-lg">
                            <span className="font-bold text-gray-700">
                              {isRTL ? 'الأحد-الخميس: 9 صباحاً - 8 مساءً' : 'Sunday-Thursday: 9am - 8pm'}
                            </span>
                          </p>
                          <p className="text-gray-600 text-lg">
                            <span className="font-bold text-gray-700">
                              {isRTL ? 'الجمعة-السبت: 10 صباحاً - 6 مساءً' : 'Friday-Saturday: 10am - 6pm'}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Location Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border border-purple-100/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] rounded-3xl">
                  <CardContent className="p-8">
                    <div className={`flex items-start space-x-5 ${isRTL ? 'space-x-reverse' : ''}`}>
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:shadow-purple-500/25 transition-all duration-300">
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          {isRTL ? 'زر مكتبنا' : 'Visit Our Office'}
                        </h3>
                        <p className="text-lg text-gray-600 leading-relaxed">
                          {isRTL 
                            ? 'عالميا '
                            : 'Worldwide'
                          }
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Services Card */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Card className="relative bg-white/80 backdrop-blur-xl border border-indigo-100/50 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.03] rounded-3xl">
                  <CardContent className="p-8">
                    <div className={`flex items-start space-x-5 ${isRTL ? 'space-x-reverse' : ''}`}>
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl group-hover:shadow-indigo-500/25 transition-all duration-300">
                        <Home className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          {isRTL ? 'خدماتنا' : 'Our Services'}
                        </h3>
                        <ul className="text-gray-600 space-y-2 text-lg">
                          <li>{isRTL ? '• شراء وبيع المنتجات' : '• Buying & Selling Products'}</li>
                          <li>{isRTL ? '• إيجار المنتجات' : '• Product Rentals'}</li>
                          <li>{isRTL ? '• استشارات تجارية' : '• Business Consulting'}</li>
                          <li>{isRTL ? '• خدمات الحجز' : '• Booking Services'}</li>
                          <li>{isRTL ? '• تحليل السوق' : '• Market Analysis'}</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-10 right-20 w-2 h-2 bg-sky-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-20 left-10 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-bounce opacity-50"></div>
      </section>
      </div>
    </>
  );
};

export default Contact;
