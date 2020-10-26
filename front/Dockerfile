FROM node:12.18.4

WORKDIR /server

COPY ./package.json /server
COPY ./yarn.lock /server
RUN yarn install

COPY . /server
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]
