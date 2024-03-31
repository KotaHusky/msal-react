import { verifyAzureB2CToken } from "@my-workspace/util-verify-token";

export const GET = async function (request: Request) {
  try {
    await verifyAzureB2CToken(request, 'ReadUser');
    return new Response('Hello, from protected API!');
  } catch (error) {
    return new Response(
      (error as Error).message || 'Error during token verification',
      { status: 401 },
    );
  }
};