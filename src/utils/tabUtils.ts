import { Tab } from '../types';

export const generateInitialTabs = (): Tab[] => {
  return [
    {
      id: 'tab-1',
      title: 'New Tab',
      url: '',
      favicon: '',
      isLoading: false
    }
  ];
};

export const validateUrl = (url: string): string => {
  // Add http:// if missing
  if (url && !url.match(/^https?:\/\//)) {
    return `https://${url}`;
  }
  return url;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

export const extractDomainFromUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  } catch (err) {
    return url;
  }
};

export const getTabTitle = (url: string): string => {
  if (!url) return 'New Tab';
  const domain = extractDomainFromUrl(url);
  return domain || 'New Tab';
};