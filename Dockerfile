FROM node

WORKDIR /server

COPY package.json /server

RUN npm install

COPY . .

EXPOSE 3000

VOLUME [ "/server/data" ]

CMD ["npm", "start"]
