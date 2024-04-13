FROM node:18.19.1
WORKDIR /my-app
COPY ./package.json ./package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]