FROM node:20-alpine

WORKDIR /app
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install
COPY ./ .

ENV PORT=5000
ENV NODE_ENV=production

CMD ["npm", "run", "serve"]

EXPOSE 5000
