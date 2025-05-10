export interface Tab {
  id: string;
  title: string;
  url: string;
  favicon: string;
  isLoading: boolean;
}

export interface Bookmark {
  id: string;
  title: string;
  url?: string;
  favicon?: string;
  isFolder?: boolean;
  children?: Bookmark[];
}

export interface SearchEngine {
  id: string;
  name: string;
  searchUrl: string;
  icon: string;
}

export interface Widget {
  id: string;
  type: string;
  title: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}