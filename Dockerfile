FROM node:argon
MAINTAINER Shawn Seymour

# Create our application directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app


# Copy our files and install node dependencies
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app

# Open our port and run the server
EXPOSE 3000
CMD ["npm", "start"]
