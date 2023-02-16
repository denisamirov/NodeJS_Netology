FROM node:alpine

WORKDIR /app1

COPY ./package*.json ./
RUN npm install

COPY middleware/ ./middleware
COPY public/ ./public
COPY routes/ ./routes
COPY views/ ./views
COPY ./config.js ./
COPY ./index.js ./

CMD ["npm", "run", "dev"]