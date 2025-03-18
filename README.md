# Prueba para Desarrollador Junior - Node.js y MongoDB

Este proyecto consiste en el desarrollo de una API REST utilizando Node.js y Express, con integración a una base de datos MongoDB a través de Mongoose. El objetivo es crear un backend robusto para la gestión de usuarios, implementando operaciones CRUD y funcionalidades adicionales como validación de datos, manejo de errores y paginación (opcional).

## Temas Principales

* **Desarrollo de un Backend con Node.js y Express:**
    * Creación de un servidor Express.
    * Definición de rutas (endpoints) para una API REST.
    * Manejo de solicitudes HTTP (POST, GET, PUT, DELETE).
* **Integración con MongoDB y Mongoose:**
    * Conexión a una base de datos MongoDB.
    * Definición de un modelo de datos (Usuario) utilizando Mongoose.
    * Operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en la base de datos.
* **Validación de Datos y Manejo de Errores:**
    * Validación de la integridad de los datos (emails únicos, datos requeridos).
    * Manejo de errores para diferentes escenarios.
* **Funcionalidades Adicionales (Opcional):**
    * Implementación de paginación para la lista de usuarios.
    * Uso de variables de entorno con dotenv.

## Temas Detallados

* **Configuración del Servidor:**
    * Uso del puerto 3000.
* **Modelo de Datos (Usuario):**
    * Definición de campos: nombre, email, edad, fecha\_creacion, direcciones.
    * Uso de tipos de datos: String, Number, Date, Array, Object.
    * Definición de restricciones: requerido, único, valor por defecto.
* **Rutas de la API:**
    * `POST /usuarios`: creación de usuarios.
    * `GET /usuarios`: obtención de la lista de usuarios.
    * `GET /usuarios/:id`: obtención de un usuario por su ID.
    * `PUT /usuarios/:id`: actualización de un usuario.
    * `DELETE /usuarios/:id`: eliminación de un usuario.
    * `GET /usuarios/buscar`: filtro de usuarios por ciudad en su dirección.
* **Validaciones:**
    * Emails únicos.
    * Datos requeridos.
    * Formato correcto del array direcciones.
* **Manejo de Errores:**
    * Respuestas adecuadas para errores de validación y otros problemas.
* **Opcionales:**
    * Paginación de resultados.
    * Uso de `.env` para variables de entorno.

## Instalación

1.  Clona el repositorio:

    git clone https://github.com/jkmilop/prueba_backend.git
2.  Navega al directorio del proyecto:

    cd prueba\_backend

3.  Instala las dependencias:

    npm install

4.  Ejecuta el servidor en modo desarrollo:

    npm run dev
