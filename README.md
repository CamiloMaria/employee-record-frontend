# Employee Record Frontend

<p align="center">
  <a href="https://angular.io/" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg" width="200" alt="Angular Logo" /></a>
</p>


## Descripcion

El **Employee Record Frontend** es una aplicación desarrollada en Angular que permite buscar empleados por diferentes criterios, gestionar administradores y realizar operaciones de creación, edición y eliminación de empleados y administradores, según los roles de usuario.

## Características principales

- **Búsqueda de empleados**: Los usuarios pueden buscar empleados por su nombre completo, extensión, correo, tienda y departamento.

- **Autenticación de usuarios**: La aplicación cuenta con un sistema de autenticación que incluye dos roles: admin y subAdmin. Los administradores pueden realizar operaciones avanzadas, mientras que los subAdmins tienen un conjunto limitado de permisos.

- **Gestión de empleados**: Los administradores pueden crear, editar y eliminar empleados.

- **Gestión de administradores**: El rol de Admin pueden crear, editar y eliminar otros administradores.

- **Seguridad**: La aplicación utiliza bcryptjs para almacenar de forma segura las contraseñas de los administradores.

- **Interfaz de usuario atractiva**: Se utiliza Bootstrap Icons y Font Awesome para una interfaz de usuario moderna y amigable.

- **Notificaciones**: Se incorpora ngx-toastr para mostrar notificaciones al usuario sobre las operaciones realizadas.

## Requisitos

Antes de ejecutar la aplicación, asegúrate de tener instalado lo siguiente:

- Node.js y npm
- Angular CLI
- Dependencias del proyecto (puedes instalarlas ejecutando `npm install` en la raíz del proyecto)

## Configuración

1. Clona este repositorio en tu máquina local.
2. Navega hasta la carpeta del proyecto con tu terminal.
3. Ejecuta `npm install` para instalar todas las dependencias necesarias.
4. Configura las variables de entorno en el archivo `src/environments/environment.ts` para apuntar al backend si es necesario.

## Uso

1. Ejecuta `ng serve` para iniciar el servidor de desarrollo. La aplicación estará disponible en `http://localhost:4200/`.

2. Accede a la página de inicio de sesión y utiliza las credenciales de administrador para comenzar a utilizar la aplicación.

3. Explora la aplicación, busca empleados y gestiona las operaciones disponibles según tu rol de usuario.

## Roles de usuario

- **Admin**: Tiene acceso completo para crear, editar y eliminar empleados y administradores.

- **SubAdmin**: Puede crear, editar y eliminar empleados, pero no tiene permiso para gestionar administradores.

## Bibliotecas Utilizadas

- RxJS
- Zone.js
- tslib
- Bootstrap Icons
- ngx-toastr
- bcryptjs
- Font Awesome

## Enlace hacia el repositorio del backend
<p align="center">
  <a href="https://github.com/CamiloMaria/employee-record-backend" target="blank">Github Backend Repository</a>
</p>
