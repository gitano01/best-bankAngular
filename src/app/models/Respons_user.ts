export interface Response_user{
    codigo:   number;
    mensaje:  string;
    response: Usuario;
}
interface Usuario {
    usuario_id:         number;
    usuario:            string;
    contrasenia:        null;
    email:              string;
    activo:             boolean;
    rol_id:             number;
    permiso_id:         number;
    empleado_id:        number;
    fecha_alta:         Date;
    fecha_baja:         string;
    fecha_modificacion: Date;
    cliente_id:         number;
}