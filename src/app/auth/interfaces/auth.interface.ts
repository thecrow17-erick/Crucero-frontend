export interface IAuthBody{
  correo: string;
  contrasena: string;
}



export interface IResponseAuthLogin {
  user:     User;
  cliente:  null;
  empleado: Empleado;
  token:    string;
}

export interface Empleado {
  id:         string;
  tipo:       string;
  id_entidad: string;
  createdAt:  Date;
  updatedAt:  Date;
  entidad:    Entidad;
  micros:     any[];
}

export interface Entidad {
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

export interface User {
  id:         string;
  nombre:     string;
  correo:     string;
  contrasena: string;
  estado:     boolean;
  tipo:       string;
  createdAt:  Date;
  updatedAt:  Date;
}
