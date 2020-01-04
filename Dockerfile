FROM node
WORKDIR /src
COPY . .
ENTRYPOINT ["yarn", "start"]
