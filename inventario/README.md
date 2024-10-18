# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
    },
  },
});
```

# Proyecto de Inventario - Backend

Este proyecto es un sistema de inventario desarrollado con Node.js, Express y MongoDB. El backend proporciona una API RESTful para gestionar usuarios, categorías, productos, movimientos y reportes.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework web para Node.js.
- **MongoDB**: Base de datos NoSQL.
- **Mongoose**: ODM (Object Data Modeling) para MongoDB y Node.js.
- **JWT (JSON Web Tokens)**: Para la autenticación y autorización.
- **bcryptjs**: Para el hashing de contraseñas.
- **dotenv**: Para la gestión de variables de entorno.
- **Jest**: Framework de pruebas para JavaScript.
- **Supertest**: Biblioteca para probar aplicaciones HTTP.

## Estructura del Proyecto

```
Backend/
├── controllers/
│   ├── categoryController.js
│   ├── historyController.js
│   ├── movementController.js
│   ├── productController.js
│   └── userController.js
├── models/
│   ├── category.js
│   ├── history.js
│   ├── movement.js
│   ├── product.js
│   └── user.js
├── routes/
│   ├── categoryRoutes.js
│   ├── historyRoutes.js
│   ├── movementRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── test/
│   ├── categoryController.test.js
│   ├── historyController.test.js
│   ├── movementController.test.js
│   ├── productController.test.js
│   └── userController.test.js
├── .env
├── app.js
├── package.json
└── 

README.md


```

## Configuración del Proyecto

### 1. Clonar el Repositorio

```sh
git clone https://github.com/tu-usuario/proyecto-inventario.git
cd proyecto-inventario/Backend
```

### 2. Instalar Dependencias

```sh
npm install
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables de entorno:

```
MONGODB_URI=mongodb://localhost:27017/inventario
JWT_SECRET=tu_secreto_jwt
```

### 4. Ejecutar el Proyecto

```sh
npm start
```

El servidor estará disponible en `http://localhost:3000`.

## Ejecutar Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando:

```sh
npm test
```

## Endpoints de la API

### Usuarios

- **POST /api/users/register**: Registrar un nuevo usuario.
- **POST /api/users/login**: Iniciar sesión.
- **GET /api/users**: Obtener todos los usuarios.
- **GET /api/users/:id**: Obtener un usuario por ID.
- **PUT /api/users/:id**: Actualizar un usuario.
- **DELETE /api/users/:id**: Eliminar un usuario.

### Categorías

- **POST /api/categories**: Crear una nueva categoría.
- **GET /api/categories**: Obtener todas las categorías.
- **GET /api/categories/:id**: Obtener una categoría por ID.
- **PUT /api/categories/:id**: Actualizar una categoría.
- **DELETE /api/categories/:id**: Eliminar una categoría.

### Productos

- **POST /api/products**: Crear un nuevo producto.
- **GET /api/products**: Obtener todos los productos.
- **GET /api/products/:id**: Obtener un producto por ID.
- **PUT /api/products/:id**: Actualizar un producto.
- **DELETE /api/products/:id**: Eliminar un producto.

### Movimientos

- **POST /api/movements**: Crear un nuevo movimiento.
- **GET /api/movements**: Obtener todos los movimientos.
- **GET /api/movements/:id**: Obtener un movimiento por ID.
- **PUT /api/movements/:id**: Actualizar un movimiento.
- **DELETE /api/movements/:id**: Eliminar un movimiento.

### Reportes

- **GET /api/reports/inventory**: Obtener un reporte de inventario.
- **GET /api/reports/movements**: Obtener un reporte de movimientos.

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
```

Este README proporciona una descripción completa del backend del proyecto, incluyendo las tecnologías utilizadas, la estructura del proyecto, cómo configurarlo y ejecutarlo, y cómo ejecutar las pruebas. También incluye información sobre los endpoints de la API y cómo contribuir al proyecto.