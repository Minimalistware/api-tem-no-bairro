FROM node:22 as build

WORKDIR /usr/src/api

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:22

WORKDIR /usr/src/api

COPY --from=build /usr/src/api/.env.production ./
COPY --from=build /usr/src/api/package*.json ./
COPY --from=build /usr/src/api/dist ./dist
COPY --from=build /usr/src/api/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "dist/main"]
