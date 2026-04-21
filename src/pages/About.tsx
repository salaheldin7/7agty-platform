import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Home, Users, Award, Shield, TrendingUp, Sparkles, Globe, Languages, ShoppingBag, Car, Briefcase } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { SEO } from "@/components/SEO";

const About = () => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const isRTL = currentLang === 'ar';

  useEffect(() => {
    setCurrentLang(i18n.language);
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
    
    // Update document direction
    document.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('lang', newLang);
  };

  return (
    <>
      <SEO 
        title="About Us - 7agty حاجتي - Global Marketplace for Everything"
        titleAr="من نحن - 7agty حاجتي - سوق عالمي لكل شيء"
        description="Learn about 7agty حاجتي, a global marketplace platform. We connect buyers and sellers worldwide across all categories: properties, cars, electronics, jobs, services and more."
        descriptionAr="تعرف على 7agty حاجتي، منصة سوق عالمية. نربط المشترين والبائعين في جميع أنحاء العالم في جميع الفئات: عقارات، سيارات، إلكترونيات، وظائف، خدمات والمزيد"
        keywords="about 7agty, global marketplace, worldwide classified ads, buy sell online, trusted marketplace, حاجتي"
        keywordsAr="عن حاجتي, سوق عالمي, إعلانات مبوبة عالمية, بيع وشراء أونلاين, سوق موثوق, 7agty"
        canonical="https://7agty.com/about"
      />
      <div className={`${isRTL ? 'rtl' : 'ltr'} font-sans`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Language Toggle Button */}
        <div className="fixed top-4 right-4 z-50">
     
      </div>

      {/* Hero Section */}
      <section className="py-32 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-sky-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-sky-100 to-blue-100 text-sky-800 font-semibold mb-12 shadow-lg transform hover:scale-105 transition-all duration-300">
              <Globe className="w-5 h-5" />
              <span className={isRTL ? 'font-arabic' : ''}>{isRTL ? 'منصة عالمية لجميع الإعلانات' : 'Global Marketplace for Everything'}</span>
            </div>
            
            <h1 className={`text-6xl md:text-8xl font-bold mb-12 bg-gradient-to-r from-sky-600 via-blue-700 to-cyan-700 bg-clip-text text-transparent leading-tight ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL ? 'من نحن' : 'About Us'}
            </h1>
            
            <p className={`text-2xl md:text-3xl text-gray-700 leading-relaxed max-w-4xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL 
                ? 'منصة عالمية شاملة تربط المشترين بالبائعين حول العالم. نوفر جميع الفئات: عقارات، سيارات، إلكترونيات، وظائف، خدمات والمزيد'
                : "A global marketplace connecting buyers with sellers worldwide. We provide all categories: properties, cars, electronics, jobs, services and everything you need."
              }
            </p>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${isRTL ? 'lg:grid-cols-2' : ''}`}>
            <div className={`relative ${isRTL ? 'lg:order-2' : ''}`}>
              {/* Main Image with enhanced effects */}
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group relative">
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center" 
                  alt={isRTL ? 'منصة إعلانات عالمية' : 'Global marketplace platform'} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Floating elements */}
                <div className="absolute top-6 left-6 w-4 h-4 bg-sky-400 rounded-full animate-bounce"></div>
                <div className="absolute top-12 right-8 w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-500"></div>
                <div className="absolute bottom-8 left-12 w-5 h-5 bg-blue-400 rounded-full animate-bounce delay-1000"></div>
              </div>
              
              {/* Enhanced Contact Card */}
              <Card className={`absolute -bottom-12 ${isRTL ? '-right-12' : '-left-12'} bg-gradient-to-br from-sky-900 via-blue-800 to-cyan-900 text-white p-8 max-w-sm rounded-2xl shadow-2xl border border-white/20 backdrop-blur-lg transform hover:scale-105 transition-all duration-500`}>
                <CardContent className="space-y-6">
                  <h3 className={`text-2xl font-bold bg-gradient-to-r from-sky-300 to-cyan-300 bg-clip-text text-transparent ${isRTL ? 'font-arabic text-right' : ''}`}>
                    {isRTL ? 'تواصل معنا' : 'Get in touch with us'}
                  </h3>
                  <div className="space-y-4">
                    <div className={`flex items-center space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-12 h-12 bg-gradient-to-r from-sky-500/30 to-blue-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <Mail className="w-6 h-6 text-sky-300" />
                      </div>
                      <span className="text-white/90">admin@7agty.com</span>
                    </div>
                    <div className={`flex items-start space-x-4 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className="w-12 h-12 bg-gradient-to-r from-sky-500/30 to-blue-500/30 rounded-xl flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                        <Globe className="w-6 h-6 text-sky-300" />
                      </div>
                      <span className={`text-white/90 ${isRTL ? 'text-right font-arabic' : ''}`}>
                        {isRTL 
                          ? 'نخدم العالم من مصر'
                          : 'Serving the world from Egypt'
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className={`space-y-10 ${isRTL ? 'lg:order-1 text-right' : 'lg:pl-8'}`}>
              <div className="space-y-8">
                <h2 className={`text-6xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL 
                    ? 'نربط العالم بإعلانات موثوقة لكل شيء'
                    : 'Connecting the world with trusted listings for everything'
                  }
                </h2>
                
                <div className={`space-y-8 text-lg text-gray-700 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                  <p>
                    {isRTL 
                      ? 'بدأت رحلتنا برؤية لإنشاء منصة عالمية تربط المشترين والبائعين من جميع أنحاء العالم. سواء كنت تبحث عن عقار، سيارة، إلكترونيات، وظيفة أو خدمة - نحن هنا لمساعدتك.'
                      : 'Our journey began with a vision to create a global marketplace that connects buyers and sellers from around the world. Whether you\'re looking for property, cars, electronics, jobs, or services - we\'re here to help.'
                    }
                  </p>
                  <p>
                    {isRTL 
                      ? 'نؤمن بأن التسوق والبيع عبر الإنترنت يجب أن يكون بسيطاً وآمناً وفعالاً. منصتنا توفر تجربة سلسة للمستخدمين في جميع أنحاء العالم للعثور على ما يحتاجونه أو عرض ما يريدون بيعه.'
                      : 'We believe that buying and selling online should be simple, safe, and effective. Our platform provides a seamless experience for users worldwide to find what they need or list what they want to sell.'
                    }
                  </p>
                  <p>
                    {isRTL 
                      ? 'من العقارات إلى السيارات، من الإلكترونيات إلى الوظائف، نغطي جميع الفئات بإعلانات مفصلة وشاملة. فريقنا يعمل بجد لضمان أن كل إعلان يتم التحقق منه ومراجعته للحفاظ على جودة المنصة.'
                      : 'From real estate to cars, from electronics to jobs, we cover all categories with detailed and comprehensive listings. Our team works hard to ensure every listing is verified and reviewed to maintain platform quality.'
                    }
                  </p>
                </div>
              </div>
              
              <div className="relative group inline-block">
                <div className="absolute -inset-2 bg-gradient-to-r from-sky-500/30 to-blue-600/30 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className={`relative border-2 border-sky-500/40 hover:border-sky-500 text-sky-700 hover:text-white hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-600 px-10 py-6 rounded-2xl font-bold transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-xl ${isRTL ? 'font-arabic' : ''}`} 
                  asChild
                >
                  <Link to="/marketplace" aria-label={isRTL ? "استكشف جميع الإعلانات - عقارات وسيارات ووظائف والمزيد" : "Explore all listings - properties, cars, jobs and more"}>
                    {isRTL ? 'استكشف جميع الإعلانات' : 'Explore All Listings'}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="relative max-w-6xl mx-auto">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&h=675&fit=crop&crop=center" 
                alt={isRTL ? 'منصة إعلانات عالمية حديثة' : 'Modern global marketplace platform'} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-blue-800/50 to-cyan-700/30"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-16">
                <div className={`text-center text-white max-w-4xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
                  <h3 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                    {isRTL 
                      ? 'اكتشف عالم من الإمكانيات'
                      : 'Discover a world of possibilities'
                    }
                  </h3>
                  <p className="text-xl opacity-95">
                    {isRTL 
                      ? 'من العقارات إلى السيارات، من الوظائف إلى الخدمات - كل ما تحتاجه في مكان واحد'
                      : 'From properties to cars, from jobs to services - everything you need in one place'
                    }
                  </p>
                </div>
              </div>
              
              {/* Enhanced decorative elements */}
              <div className="absolute top-8 left-8 w-4 h-4 bg-sky-300 rounded-full animate-pulse"></div>
              <div className="absolute top-16 right-20 w-3 h-3 bg-white/70 rounded-full animate-bounce delay-300"></div>
              <div className="absolute bottom-20 right-8 w-5 h-5 bg-cyan-400 rounded-full animate-pulse delay-700"></div>
              <div className="absolute top-32 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-bounce delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-20 ${isRTL ? 'font-arabic' : ''}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent">
              {isRTL ? 'لماذا تختارنا' : 'Why Choose Us'}
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {isRTL 
                ? 'نوفر منصة شاملة بشفافية وخبرة وتفان في نجاحك'
                : 'We provide a comprehensive marketplace with transparency, expertise, and dedication to your success'
              }
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <Card className="group text-center p-10 border-0 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 bg-white/90 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative z-10 space-y-8">
                <div className="relative">
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6">
                    <Globe className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -inset-3 bg-gradient-to-r from-sky-400/30 to-blue-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <h3 className={`text-2xl font-bold text-gray-800 group-hover:text-sky-700 transition-colors duration-300 ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL ? 'تغطية عالمية' : 'Global Coverage'}
                </h3>
                
                <p className={`text-gray-600 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL 
                    ? 'نخدم المستخدمين في جميع أنحاء العالم، مما يوفر منصة موحدة لجميع احتياجاتك سواء كنت في مصر أو أي مكان آخر.'
                    : 'We serve users worldwide, providing a unified platform for all your needs whether you\'re in Egypt or anywhere else.'
                  }
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="group text-center p-10 border-0 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 bg-white/90 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative z-10 space-y-8">
                <div className="relative">
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-cyan-400 to-sky-500 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6">
                    <ShoppingBag className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400/30 to-sky-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <h3 className={`text-2xl font-bold text-gray-800 group-hover:text-cyan-700 transition-colors duration-300 ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL ? 'جميع الفئات' : 'All Categories'}
                </h3>
                
                <p className={`text-gray-600 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL 
                    ? 'من العقارات إلى السيارات، من الإلكترونيات إلى الوظائف والخدمات - نغطي كل ما تحتاجه في مكان واحد.'
                    : 'From properties to cars, electronics to jobs and services - we cover everything you need in one place.'
                  }
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="group text-center p-10 border-0 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 bg-white/90 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative z-10 space-y-8">
                <div className="relative">
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-400/30 to-cyan-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <h3 className={`text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors duration-300 ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL ? 'إعلانات محققة' : 'Verified Listings'}
                </h3>
                
                <p className={`text-gray-600 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL 
                    ? 'جميع الإعلانات يتم التحقق منها والموافقة عليها بدقة من قبل فريقنا لضمان الأصالة ودقة المعلومات.'
                    : 'All listings are thoroughly verified and approved by our team to ensure authenticity and accurate information.'
                  }
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="group text-center p-10 border-0 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 bg-white/90 backdrop-blur-sm relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative z-10 space-y-8">
                <div className="relative">
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-sky-400 to-cyan-500 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6">
                    <Languages className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -inset-3 bg-gradient-to-r from-sky-400/30 to-cyan-500/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <h3 className={`text-2xl font-bold text-gray-800 group-hover:text-sky-700 transition-colors duration-300 ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL ? 'متعدد اللغات' : 'Multilingual'}
                </h3>
                
                <p className={`text-gray-600 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL 
                    ? 'ندعم لغات متعددة لخدمة المستخدمين من مختلف أنحاء العالم، مع واجهة سهلة الاستخدام بالعربية والإنجليزية.'
                    : 'We support multiple languages to serve users from around the world, with easy-to-use interface in Arabic and English.'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 bg-gradient-to-br from-sky-50 via-white to-blue-50">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-20 ${isRTL ? 'font-arabic' : ''}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent">
              {isRTL ? 'مهمتنا ورؤيتنا' : 'Our Mission & Vision'}
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {isRTL 
                ? 'نحن ملتزمون بتقديم أفضل تجربة تسوق وبيع عبر الإنترنت'
                : 'We are committed to delivering the best online buying and selling experience'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Mission Card */}
            <Card className="group p-12 bg-gradient-to-br from-sky-50 to-blue-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative z-10 space-y-8">
                <div className="flex items-center justify-center w-20 h-20 mx-auto bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className={`text-3xl font-bold text-center text-gray-800 ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL ? 'مهمتنا' : 'Our Mission'}
                </h3>
                <p className={`text-lg text-gray-700 leading-relaxed text-center ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL 
                    ? 'نهدف إلى توفير منصة عالمية شفافة وموثوقة تربط المشترين والبائعين من جميع أنحاء العالم. نسعى لجعل عملية البحث والشراء والبيع تجربة سهلة وآمنة وممتعة لكل مستخدم.'
                    : 'We aim to provide a transparent and trustworthy global platform that connects buyers and sellers from around the world. We strive to make searching, buying, and selling an easy, safe, and enjoyable experience for every user.'
                  }
                </p>
              </CardContent>
            </Card>

            {/* Vision Card */}
            <Card className="group p-12 bg-gradient-to-br from-cyan-50 to-sky-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardContent className="relative z-10 space-y-8">
                <div className="flex items-center justify-center w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500 to-sky-600 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3">
                  <Globe className="w-10 h-10 text-white" />
                </div>
                <h3 className={`text-3xl font-bold text-center text-gray-800 ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL ? 'رؤيتنا' : 'Our Vision'}
                </h3>
                <p className={`text-lg text-gray-700 leading-relaxed text-center ${isRTL ? 'font-arabic' : ''}`}>
                  {isRTL 
                    ? 'نتطلع لأن نكون المنصة الرائدة عالمياً للإعلانات المبوبة، معروفة بالابتكار والجودة والخدمة الاستثنائية. نحن نهدف إلى إنشاء مستقبل حيث يجد كل شخص كل ما يحتاجه بسهولة وثقة عبر الإنترنت.'
                    : 'We aspire to be the leading global marketplace for classified ads, known for innovation, quality, and exceptional service. We aim to create a future where everyone finds everything they need with ease and confidence online.'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Values Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-blue-800 to-cyan-900"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-sky-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className={`text-center mb-20 ${isRTL ? 'font-arabic' : ''}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-sky-200 bg-clip-text text-transparent">
              {isRTL ? 'قيمنا الأساسية' : 'Our Core Values'}
            </h2>
            <p className="text-2xl text-sky-200 max-w-3xl mx-auto leading-relaxed">
              {isRTL 
                ? 'القيم التي توجه كل ما نقوم به في خدمة مستخدمينا'
                : 'The values that guide everything we do in serving our users'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Value 1: Transparency */}
            <div className="group text-center p-8">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6">
                  <Shield className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-sky-400/30 to-blue-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className={`text-2xl font-bold text-white mb-4 group-hover:text-sky-300 transition-colors duration-300 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'الشفافية' : 'Transparency'}
              </h3>
              <p className={`text-sky-200 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL 
                  ? 'نؤمن بالشفافية الكاملة في جميع معاملاتنا، مما يضمن أن مستخدمينا لديهم كامل المعرفة لاتخاذ قرارات مدروسة.'
                  : 'We believe in complete transparency in all our transactions, ensuring our users have full knowledge to make informed decisions.'
                }
              </p>
            </div>

            {/* Value 2: Excellence */}
            <div className="group text-center p-8">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className={`text-2xl font-bold text-white mb-4 group-hover:text-cyan-300 transition-colors duration-300 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'التميز' : 'Excellence'}
              </h3>
              <p className={`text-sky-200 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL 
                  ? 'نسعى للتميز في كل جانب من جوانب خدمتنا، من جودة الإعلانات إلى تجربة المستخدم الاستثنائية.'
                  : 'We strive for excellence in every aspect of our service, from listing quality to exceptional user experience.'
                }
              </p>
            </div>

            {/* Value 3: Innovation */}
            <div className="group text-center p-8">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/30 to-cyan-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className={`text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors duration-300 ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL ? 'الابتكار' : 'Innovation'}
              </h3>
              <p className={`text-sky-200 leading-relaxed ${isRTL ? 'font-arabic' : ''}`}>
                {isRTL 
                  ? 'نحن نتبنى التكنولوجيا والابتكار لتحسين تجربة المستخدم وجعلها أكثر كفاءة وسهولة.'
                  : 'We embrace technology and innovation to improve the user experience and make it more efficient and accessible.'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
        <div className="container mx-auto px-6">
          <div className={`text-center max-w-4xl mx-auto ${isRTL ? 'font-arabic' : ''}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent">
              {isRTL ? 'ابدأ رحلتك معنا اليوم' : 'Start Your Journey With Us Today'}
            </h2>
            <p className="text-2xl text-gray-600 mb-12 leading-relaxed">
              {isRTL 
                ? 'انضم إلى آلاف المستخدمين واكتشف كل ما تحتاجه في مكان واحد'
                : 'Join thousands of users and discover everything you need in one place'
              }
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white px-12 py-6 rounded-2xl font-bold transition-all duration-500 transform hover:scale-110 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link to="/marketplace" aria-label={isRTL ? "تصفح جميع الإعلانات المتاحة" : "Browse all available listings"}>
                  {isRTL ? 'تصفح الإعلانات' : 'Browse Listings'}
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-sky-400 hover:border-sky-500 text-sky-700 hover:text-white hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-600 px-12 py-6 rounded-2xl font-bold transition-all duration-500 transform hover:scale-110"
                asChild
              >
                <Link to="/contact" aria-label={isRTL ? "تواصل معنا للاستفسارات والدعم" : "Contact us for inquiries and support"}>
                  {isRTL ? 'اتصل بنا' : 'Contact Us'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .font-arabic {
          font-family: 'Noto Sans Arabic', 'Cairo', 'Amiri', serif;
        }
        
        .rtl {
          direction: rtl;
        }
        
        .ltr {
          direction: ltr;
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap');
      `}</style>
      </div>
    </>
  );
};

export default About;