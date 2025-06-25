



export interface ICreateEmployeed {
  nombre: string,
  correo: string,
  contrasena: string,
  tipo: string,
  tipo_empleado: string, // CHOFER, ADMIN
  id_entidad: string
}



export interface IResponseAdminCreate {
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
