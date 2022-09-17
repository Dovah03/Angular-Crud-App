export interface BL {
  _id: number;
  numoffre: number;
  date: Date;
  datemodif: Date;
  ref: number | string;
  po: number | string;
  desi: string;
  qty: number;
  item: string;
  isSelected : boolean;
}
