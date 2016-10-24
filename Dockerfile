FROM node:argon

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
RUN npm install

# Bundle app source
COPY . /app

EXPOSE 8080
ENTRYPOINT ./node_modules/nodemon/bin/nodemon.js --legacy-watch /app