import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Star, Quote, MapPin, Phone, Mail, ArrowRight, Home, Car, Smartphone, Briefcase, Truck, Stethoscope, Sparkles, ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEO } from "@/components/SEO";
import { isAuthenticated } from "@/utils/auth";

const Index = () => {
  const { t } = useTranslation();
  const { isRTL, language } = useLanguage();
  const navigate = useNavigate();

  const handlePostListingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAuthenticated()) {
      e.preventDefault();
      navigate('/login', { state: { from: '/seller-panel' } });
    }
  };
 const seoContent = {
    ar: {
      title: "حاجتي | 7agty - اشتري، بيع واحصل على كل ما تحتاجه",
      description: " حاجتي بيع مجانا ,بيع عربية ,عمل اعلان, بيع سيارة ,بيع شقة ,بيع, ايجار,حجز طبيب, حجز دكتور, شراء شقة, شقق , شقق مصر, فلل مصر, شقق السعودية, شقق الامارات.",
      keywords: "حاجتي,بيع عربية ,عمل اعلان, بيع سيارة ,بيع شقة ,بيع, ايجار,حجز طبيب, حجز دكتور, شراء شقة, شقق , شقق مصر, فلل مصر, شقق السعودية, شقق الامارات , سوق حاجتي, بيع وشراء مجانا, سوق إلكتروني, عقارات للبيع, سيارات للبيع, وظائف, إلكترونيات, سوق عالمي, سوق مجاني, بيع بدون عمولة",
      h1: "حاجتي | بيع وشراء مجانا في مصر، السعودية، والإمارات — سيارات،عربيات و عقارات، وظائف، إلكترونيات وخدمات"
    },
    en: {
      title: "7agty | Buy, Sell and Get Everything You Need",
      description: "Your global marketplace! 7agty free selling, sell car, post ad, sell property, rent, doctor booking, apartments, Egypt properties, Saudi properties, UAE properties.",
      keywords: "7agty, marketplace, buy and sell, free classifieds, properties for sale, cars for sale, jobs, electronics, global marketplace, free selling, commission-free",
      h1: "7agty | Buy and Sell Free in Egypt, Saudi Arabia, UAE — Cars, Properties, Jobs, Electronics and Services"
    }
  };
 const currentSEO = language === 'ar' ? seoContent.ar : seoContent.en;
  const listingCategories = [
    { 
      icon: <Home className="w-6 h-6 sm:w-8 sm:h-8" />, 
      title: isRTL ? 'عقارات' : 'Properties',
      description: isRTL ? 'اكتشف منزل أحلامك من مجموعة واسعة من الشقق والفلل والتاون هاوس في جميع أنحاء مصر' : 'Find your dream home with our extensive collection of apartments, villas, and townhouses across Egypt.',
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&crop=center",
      gradient: "from-sky-400/20 to-blue-600/20",
      iconBg: "from-sky-400 to-blue-600",
      filter: "property"
    },
    { 
      icon: <Car className="w-6 h-6 sm:w-8 sm:h-8" />, 
      title: isRTL ? 'سيارات' : 'Cars',
      description: isRTL ? 'تصفح مجموعة كبيرة من السيارات الجديدة والمستعملة بأفضل الأسعار' : 'Browse a wide selection of new and used cars at the best prices.',
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop&crop=center",
      gradient: "from-blue-400/20 to-indigo-600/20",
      iconBg: "from-blue-400 to-indigo-600",
      filter: "car"
    },
    { 
      icon: <Smartphone className="w-6 h-6 sm:w-8 sm:h-8" />, 
      title: isRTL ? 'إلكترونيات وهواتف' : 'Electronics & Mobiles',
      description: isRTL ? 'أحدث الأجهزة الإلكترونية والهواتف الذكية من أفضل العلامات التجارية' : 'Latest electronics and smartphones from top brands.',
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop&crop=center",
      gradient: "from-purple-400/20 to-pink-600/20",
      iconBg: "from-purple-400 to-pink-600",
      filter: "electronics"
    },
    { 
      icon: <Briefcase className="w-6 h-6 sm:w-8 sm:h-8" />, 
      title: isRTL ? 'وظائف' : 'Jobs',
      description: isRTL ? 'ابحث عن فرص العمل المثالية في مختلف المجالات والتخصصات' : 'Find perfect job opportunities across various fields and specializations.',
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop&crop=center",
      gradient: "from-orange-400/20 to-amber-600/20",
      iconBg: "from-orange-400 to-amber-600",
      filter: "job"
    },
    { 
      icon: <Truck className="w-6 h-6 sm:w-8 sm:h-8" />, 
      title: isRTL ? 'حجز مركبات' : 'Vehicle Booking',
      description: isRTL ? 'احجز السيارات والمركبات لرحلاتك وتنقلاتك اليومية' : 'Book vehicles for your trips and daily commute.',
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&h=300&fit=crop&crop=center",
      gradient: "from-rose-400/20 to-red-600/20",
      iconBg: "from-rose-400 to-red-600",
      filter: "vehicle_booking"
    },
    { 
      icon: <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8" />, 
      title: isRTL ? 'حجز أطباء' : 'Doctor Booking',
      description: isRTL ? 'احجز موعدك مع أفضل الأطباء في جميع التخصصات الطبية' : 'Book appointments with top doctors across all medical specializations.',
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop&crop=center",
      gradient: "from-cyan-400/20 to-teal-600/20",
      iconBg: "from-cyan-400 to-teal-600",
      filter: "doctor_booking"
    }
  ];



  return (
    <>
  <SEO
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        canonical={`https://7agty.com/?lang=${language}`}
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "حاجتي - 7agty",
          "alternateName": ["7agty", "حاجتي"],
          "url": "https://7agty.com/",
          "inLanguage": ["ar", "en"], // ✅ Both languages supported
          "description": isRTL 
            ? "حاجتي هو سوق إلكتروني شامل لبيع وشراء كل ما تحتاجه — سيارات، عقارات، وظائف، إلكترونيات، وخدمات في مصر، السعودية والإمارات."
            : "7agty is a comprehensive online marketplace for buying and selling everything you need — cars, properties, jobs, electronics, and services in Egypt, Saudi Arabia, and UAE.",
          "publisher": {
            "@type": "Organization",
            "name": "حاجتي - 7agty",
            "url": "https://7agty.com/",
            "logo": "https://7agty.com/logo.png"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://7agty.com/marketplace?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
<h1 className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0" style={{ clip: 'rect(0, 0, 0, 0)' }}>
  حاجتي | بيع وشراء مجانا في مصر، السعودية، والإمارات — سيارات، عقارات، وظائف، إلكترونيات وخدمات
</h1>


      <div className="overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        <style>{`
        .text-responsive-hero {
          font-size: clamp(2.5rem, 8vw, 4rem);
          line-height: 1.1;
          word-break: break-word;
          hyphens: auto;
        }
        
        .text-responsive-large {
          font-size: clamp(1.25rem, 3vw, 1.5rem);
          line-height: 1.6;
          word-break: break-word;
          hyphens: auto;
        }
        
        .text-responsive-title {
          font-size: clamp(2rem, 5vw, 3rem);
          line-height: 1.2;
          word-break: break-word;
          hyphens: auto;
        }
        
        [dir="rtl"] .text-responsive-hero,
        [dir="rtl"] .text-responsive-large,
        [dir="rtl"] .text-responsive-title {
          direction: rtl;
          text-align: right;
          word-break: keep-all;
          overflow-wrap: break-word;
        }
        
        .btn-responsive {
          padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem);
          font-size: clamp(0.875rem, 2.5vw, 1rem);
        }
        
        .card-title-responsive {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          line-height: 1.3;
          word-break: break-word;
          hyphens: auto;
        }
        
        .card-description-responsive {
          font-size: clamp(0.8rem, 2vw, 0.875rem);
          line-height: 1.5;
          word-break: break-word;
          hyphens: auto;
        }
        
        [dir="rtl"] .card-title-responsive,
        [dir="rtl"] .card-description-responsive {
          direction: rtl;
          text-align: right;
          word-break: keep-all;
          overflow-wrap: break-word;
        }
        
        .contact-card-responsive {
          max-width: min(90vw, 18rem);
        }
        
        @media (max-width: 640px) {
          .hero-buttons {
            flex-direction: column;
            width: 100%;
          }
          
          .hero-buttons > * {
            width: 100%;
            max-width: 20rem;
          }
        }
      `}</style>

      {/* Ultra-Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Enhanced Background with Parallax Effect */}
        <div className="absolute inset-0">
          {/* Marketplace Hero Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 transition-transform duration-[2000ms] ease-out hover:scale-105"
            style={{ 
              backgroundImage: `url(https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop&crop=center)`,
              backgroundAttachment: window.innerWidth > 768 ? 'fixed' : 'scroll'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-sky-900/70 via-blue-900/60 to-cyan-900/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-sky-900/60 via-transparent to-transparent" />
          
          {/* Animated overlay patterns */}
          <div className="absolute inset-0 opacity-10 hidden sm:block">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-sky-400 rounded-full animate-ping"></div>
            <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
            <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-700"></div>
          </div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6">
          <div className="space-y-6 sm:space-y-8">
            {/* Premium Badge */}
            <div className={`inline-flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl text-xs sm:text-sm`}>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 fill-current flex-shrink-0" />
              <span className="font-semibold tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">
                {isRTL ? 'منصة 7agty حاجتي العالمية' : "Global Marketplace - 7agty حاجتي"}
              </span>
              <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse flex-shrink-0"></div>
            </div>
            
            <h2 className={`text-responsive-hero font-bold leading-tight ${isRTL ? 'font-arabic' : ''}`}>
              <span className="bg-gradient-to-r from-white via-sky-100 to-white bg-clip-text text-transparent block">
                {isRTL ? 'اعثر على' : 'Find Everything'}
              </span>
              <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-600 bg-clip-text text-transparent animate-pulse block">
                {isRTL ? 'حاجتك' : 'You Need'}
              </span>
            </h2>
            
            <p className={`text-responsive-large opacity-90 max-w-4xl mx-auto leading-relaxed font-light px-4 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL 
                ? 'اكتشف كل ما تحتاجه في العالم. عقارات، سيارات، إلكترونيات، وظائف، خدمات والمزيد. منصتك العالمية لجميع احتياجاتك'
                : 'Discover everything you need worldwide. Properties, cars, electronics, jobs, services and more. Your global marketplace for all your needs.'
              }
            </p>
            
            <div className={`hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
              <div className="relative group w-full sm:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-all duration-700"></div>
                <Button size="lg" className="relative bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold btn-responsive rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-700 border border-white/20 w-full sm:w-auto" asChild>
                  <Link to="/marketplace" aria-label={isRTL ? "تصفح جميع الإعلانات المتاحة حول العالم" : "Browse all available listings worldwide"}>
                    <span className={`flex items-center justify-center ${isRTL ? 'space-x-reverse' : ''} space-x-2 sm:space-x-3`}>
                      <span className="whitespace-nowrap">{isRTL ? 'تصفح الإعلانات' : 'Explore Listings'}</span>
                      <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} transition-transform duration-500 ${isRTL ? 'rotate-180' : ''} flex-shrink-0`} />
                    </span>
                  </Link>
                </Button>
              </div>
              
              <div className="relative group w-full sm:w-auto">
                <div className="absolute -inset-1 bg-gradient-to-r from-white/30 to-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                <Button variant="outline" size="lg" className="relative btn-responsive rounded-2xl border-2 border-white/80 text-white bg-white/10 hover:bg-white/20 hover:border-white backdrop-blur-md transition-all duration-700 hover:scale-105 font-semibold shadow-xl w-full sm:w-auto" asChild>
                  <Link to="/seller-panel" onClick={handlePostListingClick} aria-label={isRTL ? "أضف إعلانك على منصة 7agty حاجتي" : "Post your listing on 7agty platform"}>
                    <span className={`flex items-center justify-center ${isRTL ? 'space-x-reverse' : ''} space-x-2 sm:space-x-3`}>
                      <span className="whitespace-nowrap">{isRTL ? 'أضف إعلانك' : 'Post Listing'}</span>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce flex-shrink-0"></div>
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block">
          <div className="flex flex-col items-center space-y-2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
            <span className="text-white/60 text-xs font-medium">
              {isRTL ? 'مرر للأسفل' : 'Scroll Down'}
            </span>
          </div>
        </div>
      </section>

      {/* Enhanced Browse Properties Section */}
      <section className="py-12 sm:py-24 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 via-transparent to-blue-500/5"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 font-medium mb-6 text-sm">
              <ShoppingBag className="w-4 h-4" />
              <span>{isRTL ? 'فئات الإعلانات' : 'Listing Categories'}</span>
            </div>
            <h2 className={`text-responsive-title font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent px-4 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL ? 'استكشف جميع الفئات' : 'Explore All Categories'}
            </h2>
            <p className={`text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4 ${isRTL ? 'font-arabic' : ''}`}>
              {isRTL ? 'اكتشف كل ما تحتاجه من عقارات، سيارات، إلكترونيات، وظائف وخدمات' : 'Discover everything you need from properties, cars, electronics, jobs and services'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {listingCategories.map((category, index) => (
              <div key={index} className="group">
                <Card className={`relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 bg-gradient-to-br ${category.gradient} backdrop-blur-sm h-full`}>
                  {/* Background Image */}
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-700">
                    <img 
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-white/70"></div>
                  
                  <CardContent className="relative z-10 text-center p-6 sm:p-8 space-y-4 sm:space-y-6 flex flex-col h-full">
                    <div className="relative flex-shrink-0">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl bg-gradient-to-br ${category.iconBg} flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-700 transform group-hover:scale-110 group-hover:rotate-3 text-white`}>
                        {category.icon}
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 to-green-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>
                    
                    <div className="space-y-2 flex-shrink-0">
                      <h3 className={`card-title-responsive font-bold text-gray-800 group-hover:text-sky-700 transition-colors duration-500 ${isRTL ? 'font-arabic' : ''}`}>
                        {category.title}
                      </h3>
                    </div>
                    
                    <p className={`card-description-responsive text-gray-600 leading-relaxed flex-grow ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {category.description}
                    </p>
                    
                    <Button variant="link" className="text-sky-600 hover:text-blue-600 font-bold group-hover:scale-110 transition-all duration-500 flex-shrink-0 p-0" asChild>
                      <Link to={`/marketplace?listing_type=${category.filter}`} aria-label={isRTL ? "عرض جميع الإعلانات في السوق" : "View all listings in the marketplace"}>
                        <span className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2`}>
                          <span className="text-sm">{isRTL ? 'عرض الإعلانات' : 'View Listings'}</span>
                          <ArrowRight className={`w-3 h-3 sm:w-4 sm:h-4 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} transition-transform duration-500 ${isRTL ? 'rotate-180' : ''}`} />
                        </span>
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="py-12 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50/30 to-white"></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center ${isRTL ? 'lg:grid-flow-col-dense' : ''}`}>
            <div className={`space-y-6 sm:space-y-8 ${isRTL ? 'lg:col-start-2 lg:pl-8 lg:pr-0' : 'lg:pr-8'}`}>
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-sky-100 text-sky-800 font-medium text-sm">
                  <span>{isRTL ? 'من نحن' : 'About Us'}</span>
                </div>
                <h2 className={`text-responsive-title font-bold leading-tight bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent ${isRTL ? 'font-arabic text-right' : ''}`}>
                  {isRTL ? 'شريكك الموثوق للإعلانات في العالم' : 'Your trusted marketplace partner worldwide'}
                </h2>
              </div>
              
              <div className={`space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-600 leading-relaxed ${isRTL ? 'font-arabic text-right' : ''}`}>
                <p>
                  {isRTL 
                    ? 'نحن منصة عالمية رائدة، نربط الناس بكل ما يحتاجونه من عقارات وسيارات وإلكترونيات ووظائف وخدمات. مع خبرة واسعة في الأسواق المتعددة، نفهم احتياجات عملائنا الفريدة حول العالم'
                    : "We are a leading global marketplace, connecting people with everything they need - properties, cars, electronics, jobs and services. With extensive experience in multiple markets, we understand our clients' unique needs worldwide."
                  }
                </p>
                <p>
                  {isRTL 
                    ? 'قاعدة بياناتنا الشاملة تضم إعلانات من جميع أنحاء العالم، سواء كنت تبحث عن منزل، مساحة تجارية، أو فرصة استثمارية. نحن هنا لإرشادك في كل خطوة'
                    : 'Our comprehensive database features listings from around the world. Whether you\'re looking for a home, commercial space, or investment opportunity, we\'re here to guide you every step of the way.'
                  }
                </p>
              </div>
              
              <div className="relative group inline-block">
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-blue-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <Button variant="outline" size="lg" className="relative border-2 border-sky-500/30 hover:border-sky-500 text-sky-700 hover:text-white hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-all duration-700 transform hover:scale-105" asChild>
                  <Link to="/about" aria-label={isRTL ? "اعرف المزيد عن 7agty حاجتي وخدماتنا" : "Learn more about 7agty and our services"}>
                    <span className={`flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-2 sm:space-x-3`}>
                      <span>{t('home.about.learnBtn', isRTL ? 'اعرف المزيد عن خدماتنا' : 'Learn More About Our Services')}</span>
                      <ArrowRight className={`w-4 h-4 sm:w-5 sm:h-5 group-hover:${isRTL ? '-translate-x-1' : 'translate-x-1'} transition-transform duration-500 ${isRTL ? 'rotate-180' : ''}`} />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className={`relative ${isRTL ? 'lg:col-start-1 lg:pr-8 lg:pl-0' : 'lg:pl-8'}`}>
              <div className="relative">
                {/* Main Image */}
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&crop=center" 
                    alt="Modern real estate" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                </div>
                
                {/* Enhanced Contact Card Overlay */}
                <Card className={`contact-card-responsive absolute -bottom-4 sm:-bottom-6 ${isRTL ? '-right-4 sm:-right-6' : '-left-4 sm:-left-6'} bg-gradient-to-br from-sky-900 via-blue-800 to-cyan-900 text-white p-4 sm:p-6 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-sm`}>
                  <CardContent className="space-y-3 sm:space-y-4 p-0">
                    <h3 className={`text-lg sm:text-xl font-bold bg-gradient-to-r from-sky-300 to-cyan-400 bg-clip-text text-transparent ${isRTL ? 'font-arabic text-right' : ''}`}>
                      {t('home.about.contact.title', 'Get in touch with us')}
                    </h3>
                    <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                      <div className={`flex items-center ${isRTL ? 'space-x-reverse flex-row-reverse' : ''} space-x-3`}>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-sky-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-sky-400" />
                        </div>
                        <span className="text-white/90 font-mono text-xs sm:text-sm break-all">admin@7agty.com</span>
                      </div>
                      <div className={`flex items-start ${isRTL ? 'space-x-reverse flex-row-reverse' : ''} space-x-3`}>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-sky-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-sky-400" />
                        </div>
                        <span className={`text-white/90 ${isRTL ? 'font-arabic text-right' : ''}`}>
                          {isRTL ? 'نخدم العالم' : 'Serving Worldwide'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials section removed as requested */}
      </div>
    </>
  );
};

export default Index;