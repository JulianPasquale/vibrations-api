# Vibrations API

# Versión en español 🇦🇷

Servicio backend creado para el trabajo de la tesina de Licenciatura en sistemas de Julian Pasquale.
Este servicio se encagar de almacenar y retornar vibraciones a traves de una JSON API.

Los endpoints que esta app expone son consumidos actualmente por un [servicio frontend](https://github.com/JulianPasquale/haptic-design-UI), basado en ReactJS, creado para el mismo propósito.

Los datos se almacenan en una base de datos NoSQL proporcionada por el servicio [Firebase Firestore](https://firebase.google.com/docs/firestore). 🚨 Para poder acceder a estos datos localmente, deberá tener a su disposición credenciales de Google cloud Platform 🚨.

Todos los endpoints son públicos, es decir que no es necesario iniciar sesión.

## Prerrequisitos
- [node](https://nodejs.org/es/download/) ~14.15.0
- [yarn](https://classic.yarnpkg.com/en/docs/install) ~1.22.0
- Archivo JSON con las credenciales de Google.

## Cómo empezar

1. Clonar el repositorio:
```bash
# Usando ssh
git clone git@github.com:JulianPasquale/vibrations-api.git

# Usando https
git clone https://github.com/JulianPasquale/vibrations-api.git
```
2. Instalar las dependencias
```bash
yarn install
```
3. Crear archivo `.env` en la raíz del proyecto, para configurar las variables de entorno con el siguiente contenido:
```
PORT=3000
GOOGLE_APPLICATION_CREDENTIALS=path/to/google-access.json
```
4. Correr el servidor
```bash
yarn build
yarn start

# Para que el código se actualice cada vez que un archivo es modificado,
# se puede utilizar este comando en lugar de los anteriores.
yarn watch
```

## URLs públicas

Este servicio está publicado en Heroku, usando la versión gratuita, por lo que la primer petición puede demorar algunos segundos.
- [Entorno de desarrollo](https://vibrations-api.herokuapp.com/)
- [Entorno de producción](https://vibrations-api-production.herokuapp.com/)

## Endpoints
Se puede ver una documentación completa de todos los endpoints [aquí](https://documenter.getpostman.com/view/5808957/TzY1iwof), incluyendo ejempos de peticiones y respuestas. Tambien puede descargarse una colección de Postman del mismo sitio.


# English version 🇺🇸 🏴󠁧󠁢󠁥󠁮󠁧󠁿

Backend service created for Julian Pasquale's Bachelor of Systems thesis work.

This service is in charge of storing and returning vibrations through a JSON API. The endpoints that this app exposes are currently consumed by a [frontend service](https://github.com/JulianPasquale/haptic-design-UI), created with ReactJS for the same purpose.

Data is stored in a NoSQL database provided by [Firebase Firestore](https://firebase.google.com/docs/firestore) service. 🚨 To be able to access to this data locally, you'll need to have GCP credentials 🚨.

All endpoints are public - no sign in required
## Prerequisites
- [node](https://nodejs.org/es/download/) ~14.15.0
- [yarn](https://classic.yarnpkg.com/en/docs/install) ~1.22.0
- JSON file with Google credentials.

## Getting started

1. Clone the repository:
```bash
# Using ssh
git clone git@github.com:JulianPasquale/vibrations-api.git

# Using https
git clone https://github.com/JulianPasquale/vibrations-api.git
```
2. Install dependencies
```bash
yarn install
```
3. Create a `.env` file to setup your environment variables at the root of the project and put this content inside:
```
PORT=3000
GOOGLE_APPLICATION_CREDENTIALS=path/to/google-access.json
```
4. Start the server
```bash
yarn build
yarn start

# Or if you want to have live-reloading on your code.
# You can also skip the build step
yarn watch
```

## Public URLs

This service is published in Heroku, using free dynos - first request can take some time to respond.
- [Development environment](https://vibrations-api.herokuapp.com/)
- [Production environment](https://vibrations-api-production.herokuapp.com/)

## Endpoints
You can see a full documentation, with requests and responses examples [here](https://documenter.getpostman.com/view/5808957/TzY1iwof). You can also download a Postman collection from there.
