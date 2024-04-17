# ./Dockerfile

# Base image
FROM node:21-alpine

# puppeteer 실행을 위해 필요한 패키지들을 설치
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont udev xvfb x11vnc fluxbox dbus

#puppeteer 다운로드를 위해 필요한 라이브러리들을 설치하고 마지막에는 빌드를 위해 추가적으로 설치한 패키지들을 삭제
RUN apk add --no-cache --virtual .build-deps curl \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && echo "http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
    && apk add --no-cache curl wget \
    && apk del .build-deps


# puppeteer가 chromium-browser를 실행할 수 있도록 설정
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser 

# 이미 chromium을 설치했기 때문에 puppeteer가 chromium을 다시 다운로드하지 않도록 설정
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true      

# Xvfb에서 사용할 디스플레이 설정
ENV DISPLAY=:99  

# 작업 디렉토리를 /var/app으로 설정
WORKDIR /var/app  

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
# RUN npm run build

# Xvfb를 실행하고, node 앱 실행
#CMD Xvfb :99 -screen 0 1024x768x16 -ac & node dist/src/main.js  

# Start the server using the production build
CMD [ "node", "./bin/www" ]