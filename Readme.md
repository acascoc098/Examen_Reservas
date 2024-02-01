# RA4: Bases de datos Orientadas a Objetos (JSON)

## GIT
Para crear el repositorio podemos hacerlo en la _terminal_ de la carpeta del proyecto:
```
git init
```
Y creamos la rama dev de la siguiente forma:
```
git checkout -b dev
```
Para hacer el _merge_ lo que haremos será movernos a la rama _main_ y desde ahí hacer:
```
git merge dev
```
O de manera gráfica en el visual studio, en el apartado de _git_ nos aparece la opción de iniciar el repositorio y subirlo a remoto, después haremos un _chekout_ to y creamos la rama _dev_. Posteriromente haremos el merge.

# BACKEND
Para crear el `package.json` nos vamos a la carpeta de backend y en la terminal ponemos:
```
nmp init -y
```
Para instalar las dependencias:
```
npm install express express-session mongoose bcrypt pug dotenv
```

Para inciar la aplicación podemos añadir al `package.json` en los scripts:
```
"start": "node app.js"
```
Y así al hacer en l aterminal uso de:
```
node app.js
```
Ya nos correría la aplicación.

# DOCKER
Para crear los contenedores y levantarlos lo que haremos en la terminal de la carpeta stack-mongo:
```
-> CREACIÓN DE CONTENEDORES
docker-compose up -d

-> ARRANCAMOS LOS CONTENEDORES
docker-compose start
```
Además, tenemos otros comando como:
```
-> BORRAR LOS CONTENEDORES
docker-compose down

-> BORRAMOS
docker volume prune

-> BORRAMOS LAS IMÁGENES PARA BORRAR DEL
docker image rm mongo mongo-express
```

En la carpeta `stack-mongo` creamos un archivo .env con las credenciales:

```
MONGO_USER=root
MONGO_PASSWORD=83uddjfp0cmMD
MONGO_PORT=27017
EXPRESS_USER=mongo
EXPRESS_PASSWORD=83uddjfp0cmMD
EXPRESS_PORT=8081
```

Con el patrón MVC (_Modelo-Vista-Controlador_).

**`¡No olvides!`** Crear un archivo .env en la carpeta backend con el formato:

```
MONGO_URI=mongodb://root:83uddjfp0cmMD@localhost:27017/GestionAcademica?authSource=admin
BACKEND_PORT=8000
```

Donde `MONGO_URI` es la URL de conexión a Mongo y `BACKEND_PORT` es el puerto donde corre el servidors.

# MONGO
Para crear la base de datos lo que hacemos es desde mongo creamos la base de datos reservas.

## BBDD Documentales
Un ejemplo para una base de datos documetal sería la acción de reservar en un sitio, ya que está en un constante cambio, al igual que una zapatería ya que el precio siempre está cambiando.