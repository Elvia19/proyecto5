# 📌 Lista de Tareas Básica

---

## 📖 Descripción del Proyecto

**Lista de Tareas Básica** es una aplicación web desarrollada con **React** que permite visualizar y gestionar tareas pendientes.

Las tareas se obtienen desde una **API desplegada en AWS Lambda**, lo que permite integrar un frontend moderno con un backend en la nube.

El proyecto está accesible públicamente mediante una URL generada por **Vercel**, permitiendo que cualquier persona pueda acceder desde su navegador.

---

## 🎯 Objetivos del Proyecto

- ✅ Practicar la integración entre frontend y backend
- ☁️ Desplegar una API en la nube (AWS)
- 🌍 Publicar una aplicación React accesible públicamente
- 📝 Documentar correctamente el código y funcionamiento del sistema

---

## 🚀 Funcionalidades

- 📋 Mostrar lista de tareas desde una API en AWS  
- ➕ Agregar nuevas tareas  
- 🔄 Marcar tareas como completadas o pendientes  
- 🔍 Filtrar tareas (Todas, Pendientes, Completadas)  
- 🌐 Acceso público mediante URL  

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|------------|------|
| React | Desarrollo del frontend |
| AWS Lambda | Backend en la nube |
| API Gateway | Conexión HTTP |
| Vercel | Despliegue del frontend |
| JavaScript (ES6) | Lógica de programación |
| HTML & CSS | Estructura y estilos |

---

## 🌍 Acceso Público

👉 **https://proyecto5-xi.vercel.app**

---

## ⚙️ Cómo ejecutar el proyecto localmente

```
git clone https://github.com/Elvia19/proyecto5.git
cd proyecto5
npm install
npm start
```

Para construir versión de producción:

```
npm run build
```

---

## 📁 Estructura del Proyecto

```
src/
 ├── App.js
 ├── index.js
 ├── index.css
```

- **App.js** → Contiene la lógica principal y conexión con la API.
- **index.js** → Punto de entrada de React.
- **index.css** → Estilos globales.

---

## 🧠 Arquitectura del Proyecto

```
Usuario → React → API Gateway → AWS Lambda → Respuesta JSON
```

El frontend realiza peticiones HTTP a la API en AWS, la cual devuelve las tareas en formato JSON.

---

## 🏁 Conclusión

Este proyecto demuestra:

- ✔ Integración frontend-backend
- ✔ Despliegue en la nube
- ✔ Aplicación accesible públicamente
- ✔ Código documentado correctamente

✨ Proyecto académico desarrollado como práctica de integración en la nube.
