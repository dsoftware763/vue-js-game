FROM node:8.7

# Expose the default port
EXPOSE 8080

# Create/Set the working directory
RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

# Set Command
CMD ["node", "src/server.js"]