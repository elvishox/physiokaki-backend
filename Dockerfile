# 1. Usar una imagen de Node.js ligera
FROM node:20-alpine

# 2. Crear carpeta de trabajo
WORKDIR /app

# 3. Copiar archivos de dependencias
COPY package*.json ./

# 4. Instalar dependencias
RUN npm install

# 5. Copiar el resto del código
COPY . .

# 6. Construir la aplicación (pasar de TS a JS)
RUN npm run build

# 7. Exponer el puerto
EXPOSE 3000

# 8. Comando para arrancar
CMD ["npm", "run", "start:prod"]