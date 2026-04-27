# FIFA Project ⚽

Aplicación web Full Stack para crear cartas personalizadas estilo FIFA.

## Tecnologías usadas

### Frontend
- React
- Vite
- CSS3
- html2canvas

### Backend
- Node.js
- Express
- CORS

---

## Funcionalidades

- Crear jugador personalizado
- Vista previa en tiempo real
- Cálculo automático de GRL
- Descargar carta en PNG
- Guardar cartas en servidor
- Diseño responsive mobile

---

## Instalación local

### 1. Clonar repositorio

git clone https://github.com/Javixd0612/FIFA.git

### Proyecto Local

### 2. Frontend

cd client  
npm install  
npm run dev

### 3. Backend

cd ../server  
npm install  
node index.js

---

## Variables de entorno

Crear archivo `.env` dentro de `client`:

VITE_API_URL=http://localhost:3000

---

## Despliegue

### Backend en Render

- Iniciar sesión con GitHub
- Crear **Web Service**
- Seleccionar repositorio `FIFA`
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `node index.js`

URL:

https://fifa-api-n3ea.onrender.com

### Frontend en Vercel

- Iniciar sesión con GitHub
- Importar repositorio `FIFA`
- Framework: `Vite`
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`

Variable de entorno:

VITE_API_URL=https://fifa-api-n3ea.onrender.com

URL:

https://fifa-olive.vercel.app/

---

## Verificación

### Backend funcionando:

Entrar a:

https://fifa-api-n3ea.onrender.com

Debe mostrar:

Proyecto Fifa Funcionando

### Frontend funcionando:

Entrar a:

https://fifa-olive.vercel.app/

Debe mostrar formulario y generador de carta FIFA.

---

## Autor

Javier Enrique Rincon Maldonado
