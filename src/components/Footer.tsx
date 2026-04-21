import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Building2, MapPin, Phone, Mail, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const currentYear = new Date().getFullYear();

  const propertyImages = [
    {
      src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&h=200&fit=crop&crop=center",
      alt: t('footer.properties.villa')
    },
    {
      src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=200&h=200&fit=crop&crop=center", 
      alt: t('footer.properties.apartment')
    },
    {
      src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&h=200&fit=crop&crop=center",
      alt: t('footer.properties.house')
    },
    {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop&crop=center",
      alt: t('footer.properties.commercial')
    }
  ];

  return (
    <footer
      className="relative overflow-hidden mt-auto w-full bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Modern mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-blue-900/20 opacity-40"></div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className={`absolute top-20 ${isRTL ? 'left-10' : 'right-10'} w-32 h-32 bg-sky-500/10 rounded-full blur-3xl`}></div>
        <div className={`absolute bottom-20 ${isRTL ? 'right-20' : 'left-20'} w-40 h-40 bg-blue-500/10 rounded-full blur-3xl`}></div>
      </div>
      
      <div className="container mx-auto px-6 py-16 relative z-10 max-w-7xl w-full">
        <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-12 w-full ${isRTL ? 'text-right' : 'text-left'}`}>
          
          {/* Logo & Description */}
          <div className={`space-y-6 w-full ${isRTL ? 'lg:order-1' : 'lg:order-1'}`}>
            <Link 
              to="/" 
              className={`group flex items-center transition-all duration-300 ${
                isRTL ? 'flex-row-reverse justify-start' : 'justify-start'
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-sky-500/50 transition-all duration-300 group-hover:scale-105">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full"></div>
              </div>
              <div className={isRTL ? 'mr-3' : 'ml-3'}>
                <span className={`text-xl font-bold text-white block leading-tight ${
                  isRTL ? 'font-arabic text-right' : ''
                }`}>
                  {isRTL ? 'حاجتي 7agty' : '7agty حاجتي'}
                </span>
                <span className="text-sm text-gray-400 font-medium">
                  {isRTL ? 'سوق عالمي' : 'Global Marketplace'}
                </span>
              </div>
            </Link>
            
            <p className={`text-gray-400 text-sm leading-relaxed ${
              isRTL ? 'text-right font-arabic leading-7' : 'text-left'
            }`}>
              {t('footer.description')}
            </p>
            
            <div className={`flex ${isRTL ? 'flex-row-reverse justify-start' : 'justify-start'} gap-3`}>
              <a href="#" className="group w-10 h-10 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-sky-500 hover:scale-110 border border-white/10 hover:border-sky-400">
                <Facebook className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="group w-10 h-10 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-sky-500 hover:scale-110 border border-white/10 hover:border-sky-400">
                <Twitter className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="group w-10 h-10 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-sky-500 hover:scale-110 border border-white/10 hover:border-sky-400">
                <Instagram className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
              <a href="#" className="group w-10 h-10 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-sky-500 hover:scale-110 border border-white/10 hover:border-sky-400">
                <Linkedin className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-300" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={`space-y-5 w-full ${isRTL ? 'lg:order-3' : 'lg:order-2'}`}>
            <h3 className={`text-base font-bold text-white ${
              isRTL ? 'text-right font-arabic' : 'text-left'
            }`}>
              {t('footer.quickLinks.title')}
            </h3>
            <div className="space-y-2">
              {[
                { path: '/', key: 'home' },
                { path: '/about', key: 'about' },
                { path: '/marketplace', key: 'marketplace' },
                { path: '/contact', key: 'contact' }
              ].map(({ path, key }) => (
                <Link 
                  key={key}
                  to={path} 
                  className={`group flex items-center gap-2 text-sm text-gray-400 hover:text-sky-400 transition-all duration-300 ${
                    isRTL 
                      ? 'flex-row-reverse text-right font-arabic' 
                      : 'text-left'
                  }`}
                >
                  <span className={`w-0 h-px bg-sky-400 group-hover:w-4 transition-all duration-300 ${isRTL ? 'order-2' : ''}`}></span>
                  <span>{t(`footer.quickLinks.${key}`)}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className={`space-y-5 w-full ${isRTL ? 'lg:order-2' : 'lg:order-3'}`}>
            <h3 className={`text-base font-bold text-white ${
              isRTL ? 'text-right font-arabic' : 'text-left'
            }`}>
              {t('footer.contact.title')}
            </h3>
            <div className="space-y-4">
              <div className={`flex items-start gap-3 ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                  <MapPin className="w-4 h-4 text-sky-400" />
                </div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className={`text-xs text-gray-500 mb-1 ${
                    isRTL ? 'font-arabic' : ''
                  }`}>
                    {t('footer.contact.locationLabel')}
                  </p>
                  <p className={`text-sm text-gray-300 ${
                    isRTL ? 'font-arabic leading-6' : ''
                  }`}>
                    {isRTL ? 'نخدم العالم' : 'Serving Worldwide'}
                  </p>
                </div>
              </div>
              
              <div className={`flex items-start gap-3 ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Mail className="w-4 h-4 text-sky-400" />
                </div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className={`text-xs text-gray-500 mb-1 ${
                    isRTL ? 'font-arabic' : ''
                  }`}>
                    {t('footer.contact.emailLabel')}
                  </p>
                  <p className="text-sm text-gray-300 font-mono">
                    admin@7agty.com
                  </p>
                </div>
              </div>
              
              <div className={`flex items-start gap-3 ${
                isRTL ? 'flex-row-reverse' : 'flex-row'
              }`}>
                <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 border border-white/10">
                  <Clock className="w-4 h-4 text-sky-400" />
                </div>
                <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                  <p className={`text-xs text-gray-500 mb-1 ${
                    isRTL ? 'font-arabic' : ''
                  }`}>
                    {t('footer.contact.hoursLabel')}
                  </p>
                  <p className={`text-sm text-gray-300 ${
                    isRTL ? 'font-arabic leading-6' : ''
                  }`}>
                    {t('footer.contact.weekdays')}<br />
                    {t('footer.contact.saturday')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          <div className={`space-y-5 w-full ${isRTL ? 'lg:order-4' : 'lg:order-4'}`}>
            <h3 className={`text-base font-bold text-white ${
              isRTL ? 'text-right font-arabic' : 'text-left'
            }`}>
              <span className="sr-only">{t('footer.featured.title')}</span>
              {isRTL ? 'معرض الصور' : 'Gallery'}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {propertyImages.map((image, index) => (
                <div key={index} className="group aspect-square rounded-xl overflow-hidden relative cursor-pointer transition-all duration-300 hover:scale-105 border border-white/10 hover:border-sky-400/50">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
            <Link 
              to="/marketplace" 
              className={`inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 font-medium transition-colors duration-300 group ${
                isRTL ? 'flex-row-reverse font-arabic' : 'flex-row'
              }`}
            >
              <span>{isRTL ? 'عرض جميع الإعلانات' : 'View All Listings'}</span>
              <span className={`transition-transform group-hover:${
                isRTL ? '-translate-x-1' : 'translate-x-1'
              } ${isRTL ? 'mr-1' : 'ml-1'}`}>
                {isRTL ? '←' : '→'}
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-12 pt-8 w-full">
          <div className={`flex flex-col md:flex-row justify-between items-center gap-4 w-full ${
            isRTL ? 'md:flex-row-reverse text-right' : 'text-left'
          }`}>
            <p className={`text-sm text-gray-500 ${
              isRTL ? 'text-right font-arabic' : 'text-left'
            }`}>
              © {currentYear} <span className="text-gray-400 font-semibold">7agty حاجتي</span>. {isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.
            </p>
            <div className={`flex text-sm gap-6 ${
              isRTL ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <Link 
                to="/privacy" 
                className={`text-gray-500 hover:text-sky-400 transition-colors duration-300 ${
                  isRTL ? 'font-arabic' : ''
                }`}
              >
                {t('footer.legal.privacy')}
              </Link>
              <Link 
                to="/terms" 
                className={`text-gray-500 hover:text-sky-400 transition-colors duration-300 ${
                  isRTL ? 'font-arabic' : ''
                }`}
              >
                {t('footer.legal.terms')}
              </Link>
              <Link 
                to="/cookies" 
                className={`text-gray-500 hover:text-sky-400 transition-colors duration-300 ${
                  isRTL ? 'font-arabic' : ''
                }`}
              >
                {t('footer.legal.cookies')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for Arabic font support */}
      <style>{`
        .font-arabic {
          font-family: 'Noto Sans Arabic', 'Cairo', 'Amiri', 'Tajawal', system-ui, -apple-system, sans-serif;
          font-weight: 400;
        }
        
        .direction-rtl {
          direction: rtl;
          unicode-bidi: embed;
        }
        
        .text-wrap-rtl {
          word-wrap: break-word;
          overflow-wrap: break-word;
          hyphens: auto;
          text-align: right;
          white-space: pre-wrap;
        }
        
        [dir="rtl"] .font-arabic {
          font-feature-settings: 'liga' 1, 'kern' 1;
          text-rendering: optimizeLegibility;
          direction: rtl;
        }
        
        /* Ensure proper spacing for Arabic text */
        [dir="rtl"] p.font-arabic,
        [dir="rtl"] .font-arabic {
          line-height: 1.7;
          word-spacing: 0.1em;
          direction: rtl;
          text-align: right;
        }
        
        /* Force RTL text direction for Arabic content */
        [dir="rtl"] .direction-rtl {
          direction: rtl !important;
          unicode-bidi: bidi-override;
          text-align: right;
        }
        
        /* Better text wrapping for Arabic */
        [dir="rtl"] .text-wrap-rtl {
          word-break: keep-all;
          overflow-wrap: anywhere;
          hyphens: manual;
          text-align-last: right;
        }
        
        /* Better hover effects for RTL */
        [dir="rtl"] .group:hover .hover\\:translate-x-2 {
          transform: translateX(-0.5rem);
        }
        
        /* Ensure consistent RTL behavior */
        [dir="rtl"] * {
          direction: rtl;
        }
        
        [dir="rtl"] p, [dir="rtl"] span, [dir="rtl"] div {
          text-align: right;
        }
      `}</style>
    </footer>
  );
};

export default Footer;