export interface Icon {
  id: string;
  name: string;
  url: string;
  category?: string;
}

export interface IsoflowProps {
  icons: Icon[];
}
