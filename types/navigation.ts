export interface NavSubItem {
  name: string;
  link: string;
  image?: string;
  sub?: NavSubItem[];
  opensDown?: boolean;
  isScrollable?: boolean;
}

export interface NavColumn {
  name: string;
  sub: NavSubItem[];
  image?: string;
}

export interface NavItem {
  name: string;
  link: string;
  isMegaWithImage?: boolean;
  defaultImage?: string;
  sub?: NavColumn[];
}
