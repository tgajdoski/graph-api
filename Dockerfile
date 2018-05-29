
FROM node:8-alpine

# Create app directory
WORKDIR /dist

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install

# Bundle app source
COPY . .

EXPOSE 8080

CMD ["yarn","start"] 
