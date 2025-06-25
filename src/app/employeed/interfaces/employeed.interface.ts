export interface IGetAllEmployeed {
  empleados: Empleado[];
  total:     number;
}

export interface Empleado {
  id:         string;
  tipo:       string;
  id_entidad: string;
  createdAt:  Date;
  updatedAt:  Date;
  usuario:    Usuario;
  entidad:    Entidad;
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

export interface Usuario {
  id:         string;
  nombre:     string;
  correo:     string;
  contrasena: string;
  estado:     boolean;
  tipo:       string;
  createdAt:  Date;
  updatedAt:  Date;
}




export interface ICreateEmployeed {
  nombre: string;
  correo: string;
  contrasena: string;
  tipo: string; // Tipo de empleado, por ejemplo, 'ADMIN', 'CONDUCTOR', etc.
  empleado: ITypeEmployeed; // Detalle del tipo de empleado
}

export interface ITypeEmployeed {
  tipo: string;
  id_entidad: string;
}
export interface IResponseCreateEmployeed {
  user: User;
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
  empleado:   Empleado;
}

export interface Empleado {
  id:         string;
  tipo:       string;
  id_entidad: string;
  createdAt:  Date;
  updatedAt:  Date;
}
