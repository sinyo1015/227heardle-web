FROM debian
WORKDIR /src
EXPOSE 3001
ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && apt install curl -y
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs

COPY package.json ./
COPY tsconfig.json ./

RUN npm -g i yarn --loglevel verbose
RUN yarn global add typescript http-server
RUN yarn install
COPY . .
CMD yarn build; node server.cjs