FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# where available (npm@5+)
COPY package*.json ./

# Install NPM packages
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
EXPOSE 8081

CMD [ "node", "server.js" ]
