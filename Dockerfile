# 1. Imagen ligera
FROM node:20-alpine

# 2. Carpeta de trabajo
WORKDIR /app

# 3. Copiar dependencias
COPY package*.json ./

# 4. Instalar
RUN npm install

# 5. Copiar código
COPY . .

# 6. Exponer puerto
EXPOSE 3000

# 7. Modo desarrollo
CMD ["npm", "run", "start:dev"]