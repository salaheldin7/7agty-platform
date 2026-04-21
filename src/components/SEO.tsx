import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface SEOProps {
  title: string;
  description: string;
  keywords: string;
  canonical?: string;
  ogType?: 'website' | 'article' | 'product' | 'profile';
  structuredData?: object;
}

export const SEO = ({
  title,
  description,
  keywords,
  canonical,
  ogType = 'website',
  structuredData
}: SEOProps) => {
  const { isRTL } = useLanguage();
  const baseUrl = 'https://7agty.com';
  const logoUrl = `${baseUrl}/logo.svg`;
  const ogImage = `${baseUrl}/og-image.jpg`;

  useEffect(() => {
    // title
    document.title = title;

    // viewport
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement('meta');
      viewportMeta.setAttribute('name', 'viewport');
      document.head.appendChild(viewportMeta);
    }
    viewportMeta.setAttribute(
      'content',
      'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover'
    );

    // url
    const currentUrl = canonical || window.location.href;

    // base meta
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { property: 'og:type', content: ogType },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:url', content: currentUrl },
      { property: 'og:site_name', content: 'حاجتي - 7agty' },
      { property: 'og:locale', content: isRTL ? 'ar_EG' : 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      { name: 'twitter:site', content: '@7agty' },
      { name: 'theme-color', content: '#0EA5E9' }
    ];

    // insert meta
    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (name) element.setAttribute('name', name);
        if (property) element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    });

    // canonical
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', currentUrl);

    // logo
    let logoLink = document.querySelector('link[rel="image_src"]');
    if (!logoLink) {
      logoLink = document.createElement('link');
      logoLink.setAttribute('rel', 'image_src');
      document.head.appendChild(logoLink);
    }
    logoLink.setAttribute('href', logoUrl);

    // structured data
    if (structuredData) {
      let jsonScript = document.querySelector('script[data-structured]');
      if (!jsonScript) {
        jsonScript = document.createElement('script');
        jsonScript.type = 'application/ld+json';
        jsonScript.setAttribute('data-structured', 'true');
        document.head.appendChild(jsonScript);
      }
      jsonScript.textContent = JSON.stringify(structuredData);
    }

    // language + direction - FIXED: Now dynamic!
    document.documentElement.lang = isRTL ? 'ar' : 'en';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    
    // Add charset if missing
    let charsetMeta = document.querySelector('meta[charset]');
    if (!charsetMeta) {
      charsetMeta = document.createElement('meta');
      charsetMeta.setAttribute('charset', 'UTF-8');
      document.head.insertBefore(charsetMeta, document.head.firstChild);
    }

  }, [title, description, keywords, canonical, ogType, structuredData, isRTL]);

  return null;
};