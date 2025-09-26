## MAVIDE
## Al probarla
Debido que la aplicacion no funcionó al momento de probarla con AWS no pude probarla completa, se listaran los problemas que tuve al ser usuario:
- No me pude registrar debido a un error del CAPTCHA
- Se puede acceder a las vistas de admin y user sin estar logeado
- Al momento de querer desplegarla localmente no tenia readme de lo que se necesitaba y como

## Cambios hechos (mejoras)
- Se genero seguridad en la vista /admin con JWT
- Se agrego el middleware para la proteccion de esa ruta


## Lo que se uso y se necesitaban

* **Para la aplicación**: Next.js y React
* **Para guardar datos**: MongoDB
* **Para la seguridad**: Usamos `jose` JWT para para mantener sesiones seguras
* **Se necesitaban cuentas en**: reCAPTCHA y PLAIN para verificar correos y proteger el sitio

## Como desplegarlo

- Tener instalados Node.js, npm y jose (JWT)
- Tener cuenta en Mongodb Atlas
- Clonar el repo en tu dispositivo
- Ejecutar el siguiente comando `npm i && npm run build && npm run start` o en caso `npm run dev` 
- En caso de no funcionar añadir el .env manualmente con `URI de mongoDB`, `token de JWT`, `los 2 tokens de CAPTCHA` y los de `tokens de PLAIN`
- Queda pendiente funcionalidad de registro de usuario
