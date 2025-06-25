export interface IResponseCreateEntity {
  entidad: IEntity;
}

export interface IEntity {
  id:              string;
  nombre:          string;
  tipo:            string;
  direccion:       string;
  correo_contacto: string;
  wallet_address:  string;
  saldo_ingresos:  number;
  estado:          boolean;
  latitud:         number;
  longitud:        number;
  cobro_pasaje:    number;
  id_divisa:       string;
  createdAt:       Date;
  updatedAt:       Date;
}
