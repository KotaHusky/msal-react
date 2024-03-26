FROM node:18-alpine as runner
WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/msal-react-demo/next.config.js ./

# Copy the .next directory and the public directory
COPY apps/msal-react-demo/.next ./.next
COPY apps/msal-react-demo/public ./public

EXPOSE 3000

ENV NEXT_PUBLIC_AZURE_AD_CLIENT_ID=bb626b2e-8bd8-44ee-bb90-afc1959a9274
ENV NEXT_PUBLIC_AZURE_AD_TENANT_ID=5e3f37f1-3b80-467a-a949-70b4cd2c4ac0
ENV NEXT_PUBLIC_REDIRECT_URI=/auth

CMD ["npx", "next", "start", "-p", "3000"]