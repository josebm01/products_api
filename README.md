# Products MS

Microservicio de Productos construido con [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/) (con el adaptador `better-sqlite3`) y SQLite.

## Requisitos previos

- Node.js v22+
- npm

## Cómo levantar el proyecto

1. **Instalar dependencias**

   ```bash
   npm install
   ```

2. **Configurar variables de entorno**

   ```bash
   cp .env.template .env
   ```

   | Variable       | Descripción                         | Valor en `.env.template` |
   | -------------- | ----------------------------------- | ------------------------ |
   | `PORT`         | Puerto en el que corre la app       | `3001`                   |
   | `DATABASE_URL` | Ruta de conexión a la base SQLite   | `file:./dev.db`          |

   > Si `PORT` no está definido, la app usa `3000` por defecto ([src/config/envs.ts](src/config/envs.ts)).

3. **Aplicar migraciones y generar el cliente de Prisma**

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

   El cliente se genera en `src/generated/prisma` (ignorado por git), así que este paso es obligatorio tras clonar el repo.

4. **(Opcional) Poblar la base de datos con datos de prueba**

   ```bash
   npm run seed
   ```

   Inserta ~47 productos de ejemplo definidos en [src/seed.ts](src/seed.ts).

5. **Levantar la aplicación**

   ```bash
   # modo watch (recomendado en desarrollo)
   npm run start:dev

   # desarrollo sin watch
   npm run start

   # producción
   npm run build
   npm run start:prod
   ```

   La app queda escuchando en `http://localhost:3001` (o el puerto configurado en `PORT`).

## Estructura del proyecto

```
products-ms/
├── prisma/
│   ├── migrations/              # Migraciones de la base de datos
│   └── schema.prisma            # Modelo Product y configuración del cliente
├── src/
│   ├── common/
│   │   ├── dto/pagination.dto.ts  # DTO de paginación (page, limit)
│   │   └── index.ts
│   ├── config/
│   │   ├── envs.ts              # Carga y validación de variables de entorno (Joi)
│   │   └── index.ts
│   ├── generated/prisma/        # Cliente de Prisma generado (no versionado)
│   ├── products/
│   │   ├── dto/                 # CreateProductDto, UpdateProductDto
│   │   ├── entities/
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   └── products.service.ts  # Extiende PrismaClient para acceder a la BD
│   ├── app.module.ts
│   ├── main.ts                  # Bootstrap + ValidationPipe global
│   └── seed.ts                  # Script de seed
├── test/                        # Pruebas e2e
├── .env.template
├── prisma.config.ts             # Configuración de Prisma (schema, migraciones, datasource)
├── vitest.config.ts
└── vitest.config.e2e.ts
```

## Endpoints

Base: `http://localhost:3001/products`

| Método   | Ruta            | Descripción                                          |
| -------- | --------------- | ---------------------------------------------------- |
| `POST`   | `/products`     | Crea un producto. Body: `{ "name": string, "price": number }` |
| `GET`    | `/products`     | Lista productos paginados. Query: `?page=1&limit=10` |
| `GET`    | `/products/:id` | Obtiene un producto por ID (404 si no existe)        |
| `PATCH`  | `/products/:id` | Actualiza un producto *(pendiente de implementar)*   |
| `DELETE` | `/products/:id` | Elimina un producto *(pendiente de implementar)*     |

La respuesta de `GET /products` tiene la forma:

```json
{
  "data": [ /* productos */ ],
  "meta": { "total": 47, "page": 1, "lastPage": 5 }
}
```

## Scripts útiles

```bash
npm run test       # pruebas unitarias (Vitest)
npm run test:e2e   # pruebas e2e
npm run test:cov   # cobertura
npm run lint       # oxlint
npm run format     # prettier
npx prisma studio  # explorar la base de datos en el navegador
```
