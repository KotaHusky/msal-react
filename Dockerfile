ARG NODE_VERSION=18-alpine
FROM node:${NODE_VERSION} as runner
WORKDIR /app

COPY ./package.json package-lock.json ./
COPY ./apps/msal-react-demo/next.config.js ./
COPY ./apps/msal-react-demo/.next ./.next
COPY ./apps/msal-react-demo/public ./public

RUN npm ci

EXPOSE 3000

ARG AZURE_B2C_AUTHORITY
ARG AZURE_B2C_CLIENT_ID
ARG AZURE_B2C_FLOW_EDIT_PROFILE
ARG AZURE_B2C_FLOW_FORGOT_PASSWORD
ARG AZURE_B2C_FLOW_SIGN_UP_SIGN_IN
ARG AZURE_B2C_REDIRECT_URI
ARG AZURE_B2C_TENANT_ID

ENV AZURE_B2C_AUTHORITY=$AZURE_B2C_AUTHORITY
ENV AZURE_B2C_CLIENT_ID=$AZURE_B2C_CLIENT_ID
ENV AZURE_B2C_FLOW_EDIT_PROFILE=$AZURE_B2C_FLOW_EDIT_PROFILE
ENV AZURE_B2C_FLOW_FORGOT_PASSWORD=$AZURE_B2C_FLOW_FORGOT_PASSWORD
ENV AZURE_B2C_FLOW_SIGN_UP_SIGN_IN=$AZURE_B2C_FLOW_SIGN_UP_SIGN_IN
ENV AZURE_B2C_REDIRECT_URI=$AZURE_B2C_REDIRECT_URI
ENV AZURE_B2C_TENANT_ID=$AZURE_B2C_TENANT_ID

CMD ["npx", "next", "start", "-p", "3000"]