FROM node:18-slim
WORKDIR /app
COPY backend/package*.json ./
RUN npm install --only=production
COPY backend/ .
EXPOSE 5000
CMD ["npm", "start"]
