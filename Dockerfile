#Dockerfile for FE

# pull official base image
FROM node:14-alpine

RUN apk update && apk add python make g++

RUN addgroup app && adduser -S -G app app

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . .

EXPOSE 3000 

# start app
CMD ["npm", "start"]  
