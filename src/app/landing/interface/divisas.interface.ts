

export interface IGetDivisas {
  divisas: IDivisa[];
}

export interface IDivisa {
  id:        string;
  nombre:    string;
  simbolo:   string;
  pais:      string;
  createdAt: Date;
  updatedAt: Date;
}
