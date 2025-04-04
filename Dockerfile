FROM node

WORKDIR /app

COPY package*.json ./
# I needed to do this, otherwise it throws an error for the postinstall
COPY src/bounded-contexts/movie-theater-settings/infrastructure/databases/prisma/schema.prisma prisma/

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]