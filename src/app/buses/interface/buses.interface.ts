

export interface IGetAllBuses {
  micros: Micro[];
}

export interface Micro {
  id:          string;
  id_entidad:  string;
  id_ruta:     null;
  id_empleado: string;
  placa:       string;
  color:       string;
  estado:      boolean;
  createdAt:   Date;
  updatedAt:   Date;
}
