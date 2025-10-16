# Backend - Proyecto final Next Js - RollingCode

## Alcance del proyecto 💡

En este proyecto los alumnos en forma grupal se dividirán las tareas necesarias para diseñar una aplicación de Aula Link de Next Js.

## Tecnologias / Herramientas 🛠

- [HTML](https://developer.mozilla.org/es/docs/Web/HTML)
- [Javascript](https://www.w3schools.com/js/)
- [NodeJs](https://nodejs.org/es)
- [ExpressJs](https://expressjs.com/es/)
- [BabelJs](https://babeljs.io/)
- [Mongoose](https://mongoosejs.com/)
- [Cors](https://github.com/expressjs/cors#readme)
- [Morgan](https://github.com/expressjs/morgan)
- [Express Validator](https://express-validator.github.io/docs)
- [Markdown](https://markdown.es/)

## Link a la API en producción:

- [Vercel](https://backend-aulalink-next.vercel.app/)

## Pasos para clonar y ejecutar el Servidor 🖥

Sigue estos pasos para clonar y ejecutar el servidor en tu entorno local:

1.  **Requisitos previos:** Asegúrate de tener Node.js instalado en tu sistema. Puedes descargar la versión más reciente desde el sitio web oficial de Node.js (https://nodejs.org).
    Asegúrate también de tener un administrador de paquetes de Node.js instalado, como npm (que se instala junto con Node.js) o Yarn.

2.  **Clona el repositorio:** En tu línea de comandos, ejecuta el siguiente comando para clonar el repositorio:

    ```
    git clone https://github.com/jgromerou/backend-aulalink-next.git
    ```

3.  **Accede al directorio:** Ve al directorio de la aplicación clonada:

    ```
    cd <backend-aulalink-next>
    ```

4.  **Instala las dependencias:** Ejecuta el siguiente comando para instalar las dependencias de la aplicación:

    ```
    npm install
    ```

5.  **Inicia el servidor:** Utiliza el siguiente comando para iniciar la aplicación en tu entorno local:

    ```
     npm run dev
    ```

    Esto ejecutará el script definido en el archivo package.json para iniciar el servidor Node.js.

6.  **Accede al servidor:** Abre tu navegador web y visita la siguiente URL: _http://localhost:4010_. El servidor debería cargarse y estar listo para usarse.

- Se recomienda usar [Postman](https://www.postman.com/) para las solicitudes al servidor.

## Variables de entorno
- DATABASE_URI=mongodb+srv://admin-user:DM8CkVhk2fEH77On@cluster0.npl00mh.mongodb.net/aulalinkdb
- SECRET_JWT=EstaEsUn4P4l4braS3cr3ta
- YOUR_PUBLIC_KEY=USJUwbLYmCqsLPgeV
- YOUR_PRIVATE_KEY=GNT_lP-mJD7nzKX_qKXXO
- YOUR_SERVICE_ID=service_sisg2gl
- YOUR_TEMPLATE_ID=template_s5vbxx6

## Credenciales para la autenticación

Usuario admin: **admin@admin.com** - Password: **12345678Aa**

Usuario profesor: **profesor@profesor.com** - Password: **12345678Aa**

Usuario alumno: **alumno@alumno.com** - Password: **12345678Aa**

## Métodos:

## Métodos de roles:

| Método | #Url de roles           | #Acción                             |
| ------ | ----------------------- | ----------------------------------- |
| POST   | /api/roles/nuevo        | Crea un nuevo rol                   |
| GET    | /api/roles              | Muestra todos los roles             |
| GET    | /api/roles/:id          | Busca un rol por su id              |
| PUT    | /api/roles/:id          | Edita los datos de un rol por su id |
| DELETE | /api/roles/:id          | Elimina un rol por su id            |

Ejemplo de Body parar crear un rol:

```
    {
        "nombreRol": "admin"
    }
```

## Métodos de Usuarios:

| Método | #Url de Usuarios            | #Acción                                 |
| ------ | --------------------------- | --------------------------------------- |
| POST   | /api/registro               | Registrar profesor/a o alumno/a         |
| POST   | /api/auth/nuevo             | Registrar administrador/a               |
| POST   | /api/auth/login             | Loguear un usuario                      |
| GET    | /api/auth                   | Muestra la lista de usuarios            |
| GET    | /api/auth/:id               | Busca un usuario por su id              |
| PUT    | /api/auth/:id               | Edita los datos de un usuario por su id |
| DELETE | /api/auth/:id               | Borra un usuario por su id              |
| PUT    | /api/auth/nuevopassword/:id | Crear nueva contraseña                  |

Ejemplo de Body en el envío de Crear nuevo usuario administrador:

```
    {
        "nombreUsuario":"Fabian",
        "apellidoUsuario":"Perez",
        "dni":11333555,
        "email":"fabianperez@admin.com",
        "password":"12345678Aa",
        "role":"admin"
    }
```

Ejemplo de Body en el envío de Crear nuevo usuario profesor:

```
   {
    "nombreUsuario":"Carlos",
    "apellidoUsuario":"Romero",
    "dni":"33444555",
    "email":"carlosromero@profesor.com",
    "password":"12345678Aa",
    "role":"profesor"
    }
```

Ejemplo de Body en el envío de Crear nuevo usuario alumno:

```
   {
    "nombreUsuario":"Franco",
    "apellidoUsuario":"Fernandez",
    "dni":"32323232",
    "email":"francofernandez@alumno.com",
    "password":"12345678Aa",
    "role":"alumno"
    }
```

## Métodos de materias:

| Método | #Url de materias             | #Acción                                   |
| ------ | ---------------------------- | ----------------------------------------- |
| POST   | /api/materias/nuevo          | Crear nueva materia                       |
| GET    | /api/materias                | Muestra la lista de materias              |
| GET    | /api/materias/activas        | Muestra la lista de materias activas      |
| GET    | /api/materias/:id            | Busca una materia por su id               |
| PUT    | /api/materias/:id            | Edita los campos de una materia por su id |
| DELETE | /api/materias/:id            | Borra una materia por su id               |

Ejemplo de Body en el envío de Crear una materia:

```
    {
    "nombreMateria": "Álgebra y Geometría Analítica",
    "descripcion": "Vectores, matrices, espacios y geometría en el plano y espacio.",
    "nivel":"1"
    }
```

## Métodos de comisiones:

| Método | #Url de comisiones         | #Acción                                    |
| ------ | -------------------------- | ------------------------------------------ |
| POST   | /api/comisiones/nuevo      | Crear nueva comisión                       |
| GET    | /api/comisiones            | Muestra la lista de comisiones             |
| GET    | /api/comisiones/activos    | Muestra la lista de comisiones activas     |
| GET    | /api/comisiones/:id        | Busca una comisión por su id               |
| PUT    | /api/comisiones/:id        | Edita los campos de una comisión por su id |
| DELETE | /api/comisiones/:id        | Borra una comisión por su id               |

Ejemplo de Body en el envío de Crear una comisión:

```
    {
    "nombreComision": "Segundo Semestre 2025 - Álgebra y Geometría Analítica",
    "fechaInicio": "2025-09-01",
    "fechaFin": "2025-12-15",
    "horaInicio": "08:00",
    "horaFin": "10:00",
    "diasDictado": "Lunes, Miércoles",
    "cupo": 40,
    "nombreMateria": "Álgebra y Geometría Analítica",
    "emailUsuario": "carlosromero@profesor.com"
    }
```

## Métodos de inscripciones:

| Método | #Url de inscripciones         | #Acción                                       |
| ------ | ----------------------------- | --------------------------------------------- |
| POST   | /api/inscripciones/nuevo      | Crear nueva inscripción                       |
| GET    | /api/inscripciones            | Muestra la lista de inscripciones             |
| GET    | /api/inscripciones/:id        | Busca una inscripción por su id               |
| PUT    | /api/inscripciones/:id        | Edita los campos de una inscripción por su id |
| DELETE | /api/inscripciones/:id        | Borra una inscripción por su id               |

Ejemplo de Body en el envío de Crear una inscripción:

```
    {
    "comision": "68bdcadd94b14d6cc9b788b6",
    "materia": "68bdadeeddc63ea39f0c3f51",
    "usuario": "68c07df88a8a269d21ada3e5"
    }
```
Obs: Estos son los IDs respectivos a una comisión, una materia y un usuario creados anteriormente.

## Repositorio FrontEnd 📌

[FrontEnd AulaLink](https://github.com/pablogonza37/next-proyecto-final.git)

## Integrantes del grupo:

- *Perez, Francisco Miguel*
- *Gonzalez, Pablo Gaston*
- *Capdevilla, Lucas*
- *Romero Uro, Juan Gerardo*
