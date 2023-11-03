# Projectos de pruebas y ejercicios

## Descipcion
Projecto utilizando GCP - firebase con Angular y Node.js

## Estructura del proyecto
 -- frontends:
	-- projects:
		-- imgix: Ejercicio de procesamiento de imagen e historial
		-- tasks: Lista de tareas
-- functions: Backend, código que se ejecuta en Firebase
 -- shared: Interfaces que se usan para la comunicacion entre FE y BE tanto paylodas de API y modelos

## Proyecto IMGIX

Para probarlo localmente, es necesario crear un proyecto de firebase y agregar las credenciales en `frontends/environments/environment.ts`, luego ejecutar instalar todas las dependencias con el comando `npm run --prefix=./frontends install` notese que es posible que se tenga que instalar con la opción `--legacy-peer-deps` y posteriormente `npm run --prefix=./frontends serve:imgix` de esta manera se ejecutara lo mismo que actualmente esta subido a `https://test-imgix.web.app/`

## Proyecto Test Tasks
Ir a `https://test-tasks-app.web.app/tasks` para probar la implementacion de Tareas, incluir query `useHttp=true` para utilizar la API del backend en vez de directamente desde el Front, caso contrario no se utilizará.
### Backend
Para ejecutarlo localmente ir a `cd functions` y installar las dependecias. Luego ejecutar `npm run watch-serve`

### Frontend
Para ejecutarlo localmente ir a `cd frontend` y installar las dependecias. Luego ejecutar `npm run serve`

### Deploy
Para deployear el codigo a producción ejecutar el archivo `./deploy.sh`
