import React, { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MarketplaceSEOEnhancerProps {
  selectedListingType: string;
  filterCity: string;
  filterGovernorate: string;
  searchTerm: string;
  cities: any[];
  governorates: any[];
  listingTypes: any;
}

export const MarketplaceSEOEnhancer: React.FC<MarketplaceSEOEnhancerProps> = ({
  selectedListingType,
  filterCity,
  filterGovernorate,
  searchTerm,
  cities,
  governorates,
  listingTypes
}) => {
  const { isRTL } = useLanguage();

  useEffect(() => {
    // Add hidden SEO-friendly content to the page
    const seoContainer = document.getElementById('seo-keywords-container');
    if (seoContainer) {
      seoContainer.remove();
    }

    const container = document.createElement('div');
    container.id = 'seo-keywords-container';
    container.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;';
    
    // Core brand variations
    const brandVariations = [
      '7agty', 'hagty', 'hagti', 'hagaty', 'hagati', '7agati', '7agaty',
      'حاجتي', 'حاجاتي', 'حاجتى', '٧اجتي'
    ];

    // Selling keywords
    const sellKeywords = isRTL ? [
      'بيع مجانا', 'بيع سيارة مجانا', 'بيع عربية مجانا', 'بيع شقة مجانا',
      'بيع فيلا مجانا', 'بيع قصر مجانا', 'بيع تليفون مجانا', 'بيع موبايل مجانا',
      'بيع الكترونيات مجانا', 'بيع سيارة', 'بيع عربية', 'بيع شقة', 'بيع فيلا',
      'بيع قصر', 'بيع موبايل', 'بيع الكترونيات', 'اعلن مجانا', 'سوق مجاني',
      'اعلانات مجانية', 'بدون عمولة', 'بدون رسوم'
    ] : [
      'sell for free', 'sell car free', 'sell apartment free', 'sell villa free',
      'sell palace free', 'sell phone free', 'sell mobile free', 'sell electronics free',
      'free marketplace', 'free classifieds', 'no fees', 'no commission'
    ];

    // Create comprehensive keyword text
    let keywordText = `<h1 style="font-size:0.1px">${brandVariations.join(' ')} - Free Marketplace</h1>`;
    keywordText += `<p>${brandVariations.join(', ')} ${sellKeywords.join(', ')}</p>`;
    
    // Add location-based keywords
    const locationText = isRTL ? 
      'مصر الإمارات السعودية القاهرة الإسكندرية الجيزة دبي أبوظبي الرياض جدة' :
      'Egypt UAE Saudi Arabia Cairo Alexandria Giza Dubai Abu Dhabi Riyadh Jeddah';
    keywordText += `<p>${locationText}</p>`;

    // Add category variations
    if (selectedListingType !== 'all' && listingTypes?.listing_types?.[selectedListingType]) {
      const category = listingTypes.listing_types[selectedListingType];
      keywordText += `<p>${isRTL ? category.name_ar : category.name_en}</p>`;
    }

    container.innerHTML = keywordText;
    document.body.appendChild(container);

    return () => {
      const elem = document.getElementById('seo-keywords-container');
      if (elem) elem.remove();
    };
  }, [selectedListingType, isRTL, listingTypes]);

  return null;
};

// Enhanced SEO meta tags component
export const useMarketplaceSEO = () => {
  useEffect(() => {
    // Add comprehensive meta keywords
    const addMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Brand name variations for better discovery
    addMetaTag('brand-variations', '7agty, hagty, hagti, hagaty, hagati, 7agati, 7agaty, حاجتي, حاجاتي');
    
    // Google-specific tags
    addMetaTag('google-site-verification', 'your-verification-code-here');
    
    // Enhanced robots meta
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');

    // Add alternate language links
    const addAlternateLink = (hreflang: string, href: string) => {
      let link = document.querySelector(`link[hreflang="${hreflang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    addAlternateLink('ar', 'https://7agty.com/marketplace?lang=ar');
    addAlternateLink('en', 'https://7agty.com/marketplace?lang=en');
    addAlternateLink('x-default', 'https://7agty.com/marketplace');

  }, []);
};

// Integration instructions for Marketplace.tsx:
// 1. Import this component at the top of Marketplace.tsx
// 2. Add inside the main return statement, before other content
// 3. Update the generateMarketplaceSEO function as shown below

export default MarketplaceSEOEnhancer;