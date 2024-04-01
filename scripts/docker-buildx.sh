#!/bin/bash

# Iterate over the lines in the .env.local file
while IFS='=' read -r key value; do
  # Store each line as a variable in the script
  eval "${key}='${value}'"
done < apps/msal-react-demo/.env.local

# Check if the variables are set
if [ -z "$NEXT_PUBLIC_AZURE_B2C_AUTHORITY" ]; then
  echo "NEXT_PUBLIC_AZURE_B2C_AUTHORITY is not set"
  exit 1
fi

# Cleanup old msal-react-demo Docker image
docker rmi -f msal-react-demo

# Build the Docker image using the variables
docker build \
  --build-arg NEXT_PUBLIC_AZURE_B2C_AUTHORITY=$NEXT_PUBLIC_AZURE_B2C_AUTHORITY \
  --build-arg NEXT_PUBLIC_AZURE_B2C_CLIENT_ID=$NEXT_PUBLIC_AZURE_B2C_CLIENT_ID \
  --build-arg NEXT_PUBLIC_AZURE_B2C_FLOW_EDIT_PROFILE=$NEXT_PUBLIC_AZURE_B2C_FLOW_EDIT_PROFILE \
  --build-arg NEXT_PUBLIC_AZURE_B2C_FLOW_FORGOT_PASSWORD=$NEXT_PUBLIC_AZURE_B2C_FLOW_FORGOT_PASSWORD \
  --build-arg NEXT_PUBLIC_AZURE_B2C_FLOW_SIGN_UP_SIGN_IN=$NEXT_PUBLIC_AZURE_B2C_FLOW_SIGN_UP_SIGN_IN \
  --build-arg NEXT_PUBLIC_AZURE_B2C_REDIRECT_URI=$NEXT_PUBLIC_AZURE_B2C_REDIRECT_URI \
  --build-arg NEXT_PUBLIC_AZURE_B2C_TENANT_ID=$NEXT_PUBLIC_AZURE_B2C_TENANT_ID \
  --build-arg NODE_VERSION=$NODE_VERSION \
  -f Dockerfile \
  -t msal-react-demo \
  .

# Load docker image into the Docker daemon
docker run -d -p 3000:3000 msal-react-demo