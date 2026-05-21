# PRACTICO API C

## Estructura del Proyecto
```
api-c
├── README.md
├── eslint.config.mjs
├── index.html
├── nest-cli.json
├── package-lock.json
├── package.json
├── src
│   ├── app.module.ts
│   ├── categories
│   │   ├── categories.module.ts
│   │   ├── category.types.ts
│   │   ├── controllers
│   │   │   └── categories.controller.ts
│   │   ├── repositories
│   │   │   ├── categories.repository.ts
│   │   │   └── in-memory-categories.repository.ts
│   │   └── services
│   │       └── categories.service.ts
│   ├── common
│   │   └── middlewares
│   │       ├── logger.middleware.ts
│   │       └── timing.middleware.ts
│   ├── main.ts
│   ├── products
│   │   ├── controllers
│   │   │   └── products.controller.ts
│   │   ├── dto
│   │   │   ├── create-product.dto.ts
│   │   │   ├── product-stock.dto.ts
│   │   │   └── update-product.dto.ts
│   │   ├── entities
│   │   │   └── product.entity.ts
│   │   ├── products.module.ts
│   │   ├── repositories
│   │   │   ├── in-memory-products.repository.ts
│   │   │   ├── products.repository.ts
│   │   │   └── typeorm-products.repository.ts
│   │   └── services
│   │       └── products.service.ts
│   ├── shared
│   │   └── pagination.types.ts
│   └── users
│       ├── controllers
│       │   └── users.controller.ts
│       ├── data
│       │   └── users.json
│       ├── gateways
│       │   ├── jsonplaceholder-users.gateway.ts
│       │   ├── local-users.gateway.ts
│       │   └── users.gateway.ts
│       ├── services
│       │   └── users.service.ts
│       ├── user.types.ts
│       └── users.module.ts
├── test
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── tsconfig.build.json
└── tsconfig.json
```
> Puede visualizarse mediante el comando:
```bash
npx tree -l 3 -e 'node_modules|dist|.git'
```
- `-l 3`: límite de recursión del comando. Se visualizará hasta 3 niveles del árbol.
- `-e 'node_modules|dist|.git'`: directorios que no se visualizarán en la estructura del árbol.

## Como levantar
> Ejecutar estos comandos para iniciar el proyecto.
```bash
# Instalar librerías
npm install

# Verificar compilación exitosa
npm run build

# Levantar servidor (cambios automáticos)
npm run start:dev
```