FROM node
WORKDIR /src
COPY . .
ENTRYPOINT ["yarn", "generate:config", "&&", "yarn", "start"]
