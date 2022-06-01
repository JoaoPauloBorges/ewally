FROM node:lts-alpine
#Build
WORKDIR /code

COPY ./package.json /code
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 8080

CMD ["yarn", "run", "start"]
