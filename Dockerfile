FROM node
WORKDIR /src
COPY . .
RUN ["yarn", "generate:config"]
ENTRYPOINT ["yarn", "start"]
