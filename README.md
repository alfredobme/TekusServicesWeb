# TekusServiceWeb

## Descripción
TekusServiceWeb es una aplicación web desarrollada con **Angular v19** y **Angular Material v19** para la gestión de Proveedores  y Servicios.

## Tecnologías Utilizadas
- **Angular v19**: Framework frontend para la construcción de aplicaciones web dinámicas.
- **Angular Material v19**: Biblioteca de componentes UI para mejorar la experiencia de usuario.
- **TypeScript**: Lenguaje de programación que extiende JavaScript con tipado estático.
- **SCSS/CSS**: Para la estilización y diseño responsivo.
- **HTTP Client**: Para la comunicación con servicios backend.

## Estructura del Proyecto
```
app/
│── components/                    # Componentes de la aplicación
│   ├── custom-message             # Mensaje personalizado. Para los diferentes mensajes de la aplicación
│   ├── header                     # Encabezado y menú
│   ├── providers-detail           # Permite la modificacion y eliminacion de proveedores
│   ├── providers-list             # Permite la consulta de proveedores
│   ├── providers-new              # Permite la creación de un nuevo proveedor
│   ├── services-detail            # Permite la modificacion y eliminacion de servicios
│   ├── services-list              # Permite la consulta de servicios
│   ├── services-new               # Permite la creación de un nuevo servicio
│── models/                        # Modelos de datos
│   ├── provider.model.ts          # Modelo para el CRUD de proveedores
│   ├── service.model.ts           # Modelo para el CRUD de servicios
│── services/                      # Servicios para gestionar datos
│   ├── countries                  # Servicio para gestionar los países
│   ├── providers                  # Servicio para gestionar los proveedores
│   ├── services                   # Servicio para gestionar los servicios
│   ├── users                      # Servicio para gestionar la autenticación de usuarios
assets/
│── images/                     # Almacenamiento de imagenes
```

## Instalación y Ejecución
1. **Clonar el repositorio:**

2. **Instalar dependencias:**
   ```sh
   npm install
   ```
3. **Configurar la API:**   
   ```sh
   En app/app.config.ts. Configurar la url base de la api.
   Ejemplo:
      { provide: API_URL, useValue: 'http://localhost:5041/api' }
   ```
4. **Ejecutar la aplicación:**
   ```sh
   ng serve -o
   ```

## Características Principales
- CRUD de proveedores.
- CRUD de servicios.
- Paginación y filtrado con **Angular Material**.
- Uso de **modales y diálogos** para interacción con el usuario.
- Diseño responsivo y optimizado.
- Menú principal en el header

## Servicios externos
- Para la consulta de los países se usa el servicio externo **https://restcountries.com/**

## Manejo de Proveedores
<img width="1652" height="881" alt="image" src="https://github.com/user-attachments/assets/e9a3a677-3419-45b9-bdc4-ee205aba2817" />

## Manejo de Servicios

<img width="1652" height="878" alt="image" src="https://github.com/user-attachments/assets/a5633637-314f-40f2-8f8b-7770856ead42" />



