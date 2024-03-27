ARG NODE_VERSION
FROM node:${NODE_VERSION} as runner
WORKDIR /app

COPY ./package.json package-lock.json ./
COPY ./apps/msal-react-demo/next.config.js ./
COPY ./apps/msal-react-demo/.next ./.next
COPY ./apps/msal-react-demo/public ./public

RUN npm ci

EXPOSE 3000

ARG NEXT_PUBLIC_AZURE_AD_CLIENT_ID
ARG NEXT_PUBLIC_AZURE_AD_TENANT_ID
ARG NEXT_PUBLIC_REDIRECT_URI

ENV NEXT_PUBLIC_AZURE_AD_CLIENT_ID=$NEXT_PUBLIC_AZURE_AD_CLIENT_ID
ENV NEXT_PUBLIC_AZURE_AD_TENANT_ID=$NEXT_PUBLIC_AZURE_AD_TENANT_ID
ENV NEXT_PUBLIC_REDIRECT_URI=$NEXT_PUBLIC_REDIRECT_URI

CMD ["npx", "next", "start", "-p", "3000"]