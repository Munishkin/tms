FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

EXPOSE 8080

CMD ["npm", "run", "dev"]
