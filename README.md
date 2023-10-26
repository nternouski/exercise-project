# Projectos de pruebas y ejercicios

## Descipcion
Projecto utilizando GCP - firebase con Angular y Node.js

## Proyecto IMGIX

Para probarlo localmente, es necesario crear un proyecto de firebase y agregar las credenciales en `frontends/environments/environment.ts`, luego ejecutar instalar todas las dependencias con el comando `npm run --prefix=./frontends install` y posteriormente `npm run --prefix=./frontends serve:imgix` de esta manera se ejecutara lo mismo que actualmente esta subido a `https://test-imgix.web.app/`

Para probar la integracion de poder manipular imágenes subidas localmente es necesario crear una cuenta de imgix y agregar el dominio a la variable `domains` dentro de `frontends\projects\imgix\src\app\imgix\imgix.module.ts`

## Proyecto Test Tasks
Ir a `https://test-tasks-app.web.app/tasks` para probar la implementacion de Tareas, incluir query `useHttp=true` para utilizar la API del backend en vez de directamente desde el Front, caso contrario no se utilizará.
### Backend
Para ejecutarlo localmente ir a `cd functions` y installar las dependecias. Luego ejecutar `npm run watch-serve`

### Frontend
Para ejecutarlo localmente ir a `cd frontend` y installar las dependecias. Luego ejecutar `npm run serve`

### Deploy
Para deployear el codigo a producción ejecutar el archivo `./deploy.sh`
