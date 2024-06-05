FROM node:latest

WORKDIR /app

COPY package*.json ./

COPY node_modules ./node_modules

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]