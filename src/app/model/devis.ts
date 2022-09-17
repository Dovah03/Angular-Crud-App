export interface Devis {
  _id: number;
  numOffre: number;
  date: Date;
  datemodif: Date;
  num_Article: string;
  description: string;
  qty: number;
  p_U_HT: number;
  p_T_HT: number;
  isSelected: boolean;
}
