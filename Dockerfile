FROM node
WORKDIR /app
COPY . .
COPY package*.json .
RUN npm install --legacy-peer-deps
# RUN npm run build
EXPOSE 4200
CMD [ "npm", "run", "dev" ]
