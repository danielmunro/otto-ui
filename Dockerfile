FROM node
WORKDIR /src
COPY . .
ENTRYPOINT ["npm", "start"]
