export interface Client {
  _id: number;
  mysqlid: number;
  firstName : string;
  lastName : string;
  company : string;
  email : string;
  devisID_list : number[];
  bcid_list : number[];
  blid_list : number[];
  factureID_list : number[];
}
