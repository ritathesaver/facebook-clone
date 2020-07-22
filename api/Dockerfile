FROM node:12

EXPOSE 5000
COPY ["./package.json", "./package-lock.json", ".eslintrc.js", "/app/"]
WORKDIR /app
RUN npm i --quiet
COPY ./src /app/src

CMD npm start
