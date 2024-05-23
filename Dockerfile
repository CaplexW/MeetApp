FROM node:20 as client

WORKDIR /app/client

COPY client/package.json /app/client

RUN npm install

COPY client /app/client

RUN npm run build

FROM node:20

WORKDIR /app

COPY server/package.json /app

RUN npm install

COPY server /app

COPY --from=client /app/client/build /app/client

EXPOSE 8080

CMD ["curl", "-fsSL", "https://pgp.mongodb.com/server-7.0.asc", "|", "sudo", "gpg", "-o", "/usr/share/keyrings/mongodb-server-7.0"]

CMD ["echo", "deb", "[", "arch=amd64,arm64", "signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg", "]", "https://repo.mongodb.org/apt/ubuntu", "jammy/mongodb-org/7.0 multiverse", "|", "sudo", "tee", "/etc/apt/sources.list.d/mongodb-org-7.0.list"]

CMD ["sudo", "apt", "update"]

CMD ["sudo", "apt", "install", "mongodb-org"]

CMD ["sudo", "systemctl", "start", "mongod"]

CMD ["sudo", "systemctl", "enable", "mongod"]

CMD ["npm", "start"]