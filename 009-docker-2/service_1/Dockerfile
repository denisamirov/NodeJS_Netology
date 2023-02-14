FROM node:alpine

WORKDIR /app1

COPY ./package*.json ./
RUN npm install
COPY src/ ./src

CMD ["npm", "run", "dev"]