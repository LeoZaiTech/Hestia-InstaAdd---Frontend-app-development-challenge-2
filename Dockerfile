#
#  Build
#
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN --mount=type=cache,id=npm,target=/root/.npm,sharing=locked npm ci --silent
COPY / ./
RUN --mount=type=cache,id=npm,target=/root/.npm,sharing=locked npm run build

#
#  Run
#
FROM nginx:1.23.2-alpine
EXPOSE 80
WORKDIR /app
COPY --from=build /app/dist/hestia-insta-add-frontend/browser /usr/share/nginx/html
COPY --from=build /app/start.sh .
COPY /nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod +x start.sh
ENTRYPOINT ["./start.sh"]
