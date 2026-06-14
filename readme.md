# GeStore

## Descripción

GeStore es un proyecto académico enfocado en el desarrollo de un sistema web para la gestión de una tienda, sirviendo para administrar procesos básicos del negocio.

En este caso se implementa una arquitectura modular por capas y utiliza MySQL como sistema de almacenamiento de datos.

## Tecnologías utilizadas

- Java
- Spring Boot
- Spring Data JPA
- Hybernate
- MySQL
- HTML
- CSS
- JavaScript
- Gradle

## Framework utilizado

Spring Boot

## Arquitectura del proyecto

El proyecto se encuentra organizado en las siguientes capas:

- Controller: gestión de las peticiones HTTP.
- Service: lógica de negocio.
- Repository: acceso a datos.
- Model: entidades del sistema.

## Funcionalidades implementadas

- Gestión de clientes.
- Gestión de productos.
- Gestión de pedidos.
- Persistencia de datos en MySQL.
- Interfaz web para interacción con el sistema.

## Base de datos

La aplicación utiliza MySQL mediante Spring Data JPA  e Hibernate.

Configuración principal:

- Base de datos: demo
- Motor: MySQL
- ORM: Hybernate

## Evidencias

La carpeta "/evidencias" contiene capturas de pantalla donde se muestra:

- Estructura del proyecto.
- Configuración de conexión a MySQL.
- Tablas de la base de datos.
- Aplicación en ejecución.
- Registro de clientes, productos y pedidos.
- Almacenamiento de información en la base de datos.

## Ejecución del proyecto

1. Crear la base de datos "demo" en MySQL
2. Configurar las credenciales en application.properties
3. Ejecutar la clase "DemoApplication"
4. Abrir el navegador en: "http://localhost:8080/"

## Estandares de codificación aplicados

- Separación por capas
- Modularización del código
- Uso de nomenclatura descriptiva
- Reutilización de componentes
- Persistencia mediante repositorios JPA.


