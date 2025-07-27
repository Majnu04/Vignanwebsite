export interface NavSubItem {
  name: string;
  link: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
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
  target?: '_blank' | '_self' | '_parent' | '_top';
  isMegaWithImage?: boolean;
  defaultImage?: string;
  sub?: NavColumn[];
}
