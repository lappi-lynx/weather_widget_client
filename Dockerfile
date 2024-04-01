FROM node:20-alpine as build

WORKDIR /client

COPY . .

RUN npm install

FROM node:20-alpine

WORKDIR /client

COPY --from=build /client /client

EXPOSE 3333

CMD npm run dev -- --host
