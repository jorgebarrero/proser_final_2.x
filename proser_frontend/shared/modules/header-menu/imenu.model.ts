export interface IMenu {
  id: number;
  title: string;
  class: string;
  url: string;
  menu?: IMenu[];
}
