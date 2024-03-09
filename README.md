# Development
Pasos para levantar la app en desarrollo

1. levantar la base de datos

```
docker compose up -d
```

2. renombrar el .env.template en .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ``` npm install ```
5. Ejecutar el comando ``` npm run dev ```
6. Ejecutar estos comandos de prisma
```
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el SEED para (Crear la base de datos)

## Nota: usuario por defecto
__email:__ test1@gmail.com
__password:__ 123458

# prisma comandos
```
npx prisma init
npx prisma migrate dev
npx prisma generate
```

# Prod

# Stage