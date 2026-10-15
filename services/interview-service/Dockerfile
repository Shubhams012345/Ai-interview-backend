FROM node:20-alpine

WORKDIR /app

COPY package.json .
RUN npm install --omit=dev

COPY src ./src
COPY .env .env

EXPOSE 6005

CMD ["npm", "start"]
