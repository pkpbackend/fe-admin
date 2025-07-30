FROM node:20.10.0-alpine as build

RUN apk add --no-cache git
WORKDIR /app
COPY . .
COPY yarn.stable.lock yarn.lock
RUN yarn install
RUN yarn build:staging

# Serve app with nginx
FROM nginx:1.21-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
