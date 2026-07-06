import { useEffect } from "react";

export interface OpenGraphData {
  type?: "website" | "article" | "profile" | "book" | "music" | "video";
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  siteName?: string;
  locale?: string;
}

export interface TwitterCardData {
  card?: "summary" | "summary_large_image" | "app" | "player";
  url?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  site?: string;
  creator?: string;
}

export interface StructuredDataItem {
  "@context"?: string;
  "@type"?: string;
  [key: string]: unknown;
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  robots?: string;
  themeColor?: string;
  themeColorDark?: string;
  openGraph?: OpenGraphData;
  twitterCard?: TwitterCardData;
  appleTouchIcon?: string;
  manifest?: string;
  language?: string;
  charset?: string;
  structuredData?: StructuredDataItem | StructuredDataItem[];
}

const SITE_NAME = "Digital Graphics India";
const DEFAULT_TITLE = "Digital Graphics India | Creative Agency & Brand Identity Design";
const DEFAULT_DESCRIPTION =
  "Digital Graphics is where strategy meets storytelling. We craft visual identities, campaigns, and experiences that cut through the noise and stay remembered.";
const DEFAULT_KEYWORDS =
  "digital marketing, brand identity, logo design, social media management, trophy design, awards, corporate gifts, Ranchi, Jharkhand";
const DEFAULT_URL = "https://digitalgraphicsindia.com";
const DEFAULT_OG_IMAGE = `${DEFAULT_URL}/og-image.jpg`;
const DEFAULT_LOCALE = "en_IN";
const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const DEFAULT_THEME_COLOR = "#0A0A0A";
const DEFAULT_THEME_COLOR_DARK = "#FCFCFC";
const DEFAULT_APPLE_TOUCH_ICON = "/apple-touch-icon.png";
const DEFAULT_MANIFEST = "/site.webmanifest";

const createdElements: Element[] = [];
const createdLinkTags: HTMLLinkElement[] = [];

function createOrUpdateMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", name);
    document.head.appendChild(meta);
    createdElements.push(meta);
  }
  meta.setAttribute("content", content);
}

function createOrUpdateProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("property", property);
    document.head.appendChild(meta);
    createdElements.push(meta);
  }
  meta.setAttribute("content", content);
}

function createOrUpdateLink(rel: string, href: string) {
  let link = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", rel);
    document.head.appendChild(link);
    createdLinkTags.push(link);
  }
  link.setAttribute("href", href);
}

function removeCreatedTags() {
  createdElements.forEach((tag) => {
    if (tag.parentNode) {
      tag.parentNode.removeChild(tag);
    }
  });
  createdElements.length = 0;

  createdLinkTags.forEach((tag) => {
    if (tag.parentNode) {
      tag.parentNode.removeChild(tag);
    }
  });
  createdLinkTags.length = 0;
}

export function SEO({
  title,
  description,
  keywords,
  canonical,
  robots,
  themeColor,
  themeColorDark,
  openGraph,
  twitterCard,
  appleTouchIcon,
  manifest,
  language,
  charset,
  structuredData,
}: SEOProps) {
  useEffect(() => {
    removeCreatedTags();

    const fullTitle = title
      ? title === SITE_NAME
        ? title
        : `${title} | ${SITE_NAME}`
      : DEFAULT_TITLE;

    document.title = fullTitle;

    if (language) {
      const html = document.documentElement;
      if (html.getAttribute("lang") !== language) {
        html.setAttribute("lang", language);
      }
    }

    if (charset) {
      const existingCharset = document.querySelector('meta[charset]') as HTMLMetaElement | null;
      if (existingCharset) {
        existingCharset.setAttribute("charset", charset);
      } else {
        const meta = document.createElement("meta");
        meta.setAttribute("charset", charset);
        document.head.appendChild(meta);
        createdElements.push(meta);
      }
    }

    createOrUpdateMeta("author", "Kush Vardhan");
    createOrUpdateMeta("generator", "Digital Graphics India");
    createOrUpdateMeta("application-name", SITE_NAME);
    createOrUpdateMeta("apple-mobile-web-app-title", SITE_NAME);
    createOrUpdateMeta("format-detection", "telephone=no");
    createOrUpdateMeta("referrer", "strict-origin-when-cross-origin");
    createOrUpdateMeta("color-scheme", "light dark");

    const effectiveRobots = robots || DEFAULT_ROBOTS;
    createOrUpdateMeta("robots", effectiveRobots);

    const effectiveDescription = description || DEFAULT_DESCRIPTION;
    createOrUpdateMeta("description", effectiveDescription);

    const effectiveKeywords = keywords || DEFAULT_KEYWORDS;
    createOrUpdateMeta("keywords", effectiveKeywords);

    const effectiveCanonical = canonical || DEFAULT_URL;
    createOrUpdateLink("canonical", effectiveCanonical);

    const effectiveThemeColor = themeColor || DEFAULT_THEME_COLOR;
    const effectiveThemeColorDark = themeColorDark || DEFAULT_THEME_COLOR_DARK;
    const effectiveAppleTouchIcon = appleTouchIcon || DEFAULT_APPLE_TOUCH_ICON;
    const effectiveManifest = manifest || DEFAULT_MANIFEST;

    createOrUpdateMeta("theme-color", effectiveThemeColor);
    createOrUpdateMeta("theme-color", effectiveThemeColorDark);
    const lightTheme = document.querySelector(
      'meta[name="theme-color"]'
    ) as HTMLMetaElement | null;
    if (lightTheme) {
      lightTheme.setAttribute("media", "(prefers-color-scheme: light)");
    }

    const darkTheme = document.querySelector(
      'meta[name="theme-color"][media*="dark"]'
    ) as HTMLMetaElement | null;
    if (darkTheme) {
      darkTheme.setAttribute("content", effectiveThemeColorDark);
      darkTheme.setAttribute("media", "(prefers-color-scheme: dark)");
    } else {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      meta.setAttribute("content", effectiveThemeColorDark);
      meta.setAttribute("media", "(prefers-color-scheme: dark)");
      document.head.appendChild(meta);
      createdElements.push(meta);
    }

    createOrUpdateLink("apple-touch-icon", effectiveAppleTouchIcon);
    createOrUpdateLink("manifest", effectiveManifest);

    const ogUrl = openGraph?.url || effectiveCanonical;
    const ogTitle = openGraph?.title || fullTitle;
    const ogDescription = openGraph?.description || effectiveDescription;
    const ogImage = openGraph?.image || DEFAULT_OG_IMAGE;

    createOrUpdateProperty("og:type", openGraph?.type || "website");
    createOrUpdateProperty("og:url", ogUrl);
    createOrUpdateProperty("og:title", ogTitle);
    createOrUpdateProperty("og:description", ogDescription);
    createOrUpdateProperty("og:image", ogImage);
    createOrUpdateProperty("og:image:width", String(openGraph?.imageWidth ?? 1200));
    createOrUpdateProperty("og:image:height", String(openGraph?.imageHeight ?? 630));
    createOrUpdateProperty("og:image:alt", openGraph?.imageAlt || ogTitle);
    createOrUpdateProperty("og:site_name", openGraph?.siteName || SITE_NAME);
    createOrUpdateProperty("og:locale", openGraph?.locale || DEFAULT_LOCALE);

    const tcTitle = twitterCard?.title || ogTitle;
    const tcDescription = twitterCard?.description || ogDescription;
    const tcImage = twitterCard?.image || ogImage;

    createOrUpdateProperty("twitter:card", twitterCard?.card || "summary_large_image");
    createOrUpdateProperty("twitter:url", twitterCard?.url || ogUrl);
    createOrUpdateProperty("twitter:title", tcTitle);
    createOrUpdateProperty("twitter:description", tcDescription);
    createOrUpdateProperty("twitter:image", tcImage);
    createOrUpdateProperty("twitter:image:alt", twitterCard?.imageAlt || tcTitle);
    if (twitterCard?.site) {
      createOrUpdateProperty("twitter:site", twitterCard.site);
    }
    if (twitterCard?.creator) {
      createOrUpdateProperty("twitter:creator", twitterCard.creator);
    }

    if (structuredData) {
      const items = Array.isArray(structuredData) ? structuredData : [structuredData];
      items.forEach((data) => {
        const script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        script.setAttribute("data-structured-data-page", "true");
        script.textContent = JSON.stringify(data, null, 2);
        document.head.appendChild(script);
        createdElements.push(script);
      });
    }

    return () => {
      removeCreatedTags();
      document.title = DEFAULT_TITLE;
    };
  }, [
    title,
    description,
    keywords,
    canonical,
    robots,
    themeColor,
    themeColorDark,
    openGraph,
    twitterCard,
    appleTouchIcon,
    manifest,
    language,
    charset,
    structuredData,
  ]);

  return null;
}
