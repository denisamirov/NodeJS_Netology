FROM node:alpine

WORKDIR /app2

COPY ./package*.json ./
RUN npm install
COPY src/ ./src

CMD ["npm", "run", "dev"]