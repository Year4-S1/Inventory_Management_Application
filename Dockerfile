FROM node:16-alpine

RUN npm i -g express mongoose dotenv cors body-parser pino dayjs

WORKDIR /app

# copy the apps in my machine to the working directory /app
COPY . .

RUN npm install

EXPOSE 8080
ENTRYPOINT [ "npm", "run" ]
CMD ["start" ]