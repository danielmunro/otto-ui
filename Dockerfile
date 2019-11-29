FROM node
WORKDIR /src
COPY . .
ENTRYPOINT ["node", "start"]
