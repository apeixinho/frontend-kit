# FROM node:8-alpine
FROM node:10-alpine

# Setup environment variables. 
# If using one liner breakpoint '\' you can't use previously defined
# variables in posterior variables. Just define ENV per line
ENV NODE_ENV=production
# ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
# ENV PATH=${PATH}:${NPM_CONFIG_PREFIX}/bin

# Following best practices at:
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md

# add a group and user for our app, for a system user or group
# add '-S' to addgroup or adduser commands
#RUN addgroup -S app && adduser -S -g app app && \
RUN apk update && apk upgrade && \
    apk add --no-cache build-base git && \
    rm -f /var/cache/apk/*

# ENV PATH=${PATH}:"$(yarn global bin)"

RUN addgroup -S app && adduser -S -g app app    

COPY . /home/app/site2
# COPY pm2-conf.json homepage.js dist /home/node/

RUN chown -R app:app /home/app
# RUN chown -R node:node /home/node

# USER node

# WORKDIR /home/node

# RUN yarn global add pm2 --no-lockfile --ignore-scripts --no-save && \
    # yarn global add express helmet --no-lockfile --ignore-scripts --no-save
# RUN npm i -g pm2 --no-save --no-package-lock --ignore-scripts && \
    # npm i -g express helmet --no-save --no-package-lock --ignore-scripts 

USER app

WORKDIR /home/app/site2

RUN yarn 

RUN yarn run build:prod 

EXPOSE 10002

CMD ["node_modules/pm2/bin/pm2-docker", "start", "pm2-conf.json"]
# CMD ["tail","-f", "/dev/null"]