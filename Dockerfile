FROM node:12
WORKDIR /app
COPY . .
RUN yarn install
ENTRYPOINT [ "yarn", "start:prod" ]