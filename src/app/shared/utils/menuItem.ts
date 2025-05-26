import { IMenuNav } from "../interface";

export const menuItem: IMenuNav[] =[
  {
    name: "Empleados",
    icon: "person",
    router: "/dashboard/employees",
    items: [
      {
        name: "Todos los Empleados",
        icon: "list",
        router: "/dashboard/employees",
        items: []
      },
      {
        icon: "add_circle",
        name: "Crear Empleado",
        router: "/dashboard/employees/create",
        items: []
      }
    ]
  },
]
