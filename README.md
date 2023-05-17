# HotelApp
Aplicativo desplegado mediante CI/CD usando Github Actions en maquina virtual de Ubuntu en Azure, mediante el uso de servidor Apache en la IP publica **http://20.172.149.117/**

## Despliegue local 

## Funcionamiento
Funcionan todos los elementos del aplicativo, incluyendo las peticiones PUT, POST Y DELETE  y tambien el acceso al login mediante credenciales con el correo **diego@gmail.com** y la contraseña **calvera**

### Base de datos
Se usa la herramienta [JSON server](https://www.npmjs.com/package/json-server) para simular los datos y respuesta del back, para el manejor de credenciales se usa la herramienta [JSON Server Auth](https://www.npmjs.com/package/json-server-auth), la cual se encarga de ejecutar tanto el JSON Server como la parte del uso de credenciales para el login.
Para usarse se deben instalar **npm install -g json-server** y seguidamente **npm install -D json-server json-server-auth**.
Se ejecuta el archivo db.json que se encuentra dentro del proyecto mediante el comando **json-server-auth --watch db.json** que se expone en el puerto 3000.

## Despliegue en servidor

## Funcionamiento
Funciona el aplicativo solo con las peticiones GET, permite realizar las las demas peticiones con una respuesta 200 por parte del servidor, pero no realiza cambios en la base de datos, ya que se despliega usando la version de [JSON Server Online](https://my-json-server.typicode.com/) mediante el archivo [db.sjon](https://github.com/ccalvera/hoteldb).
Para el ingreso mediante el login, se realiza con cualquier tipo de correo electronico y cualquier contraseña.