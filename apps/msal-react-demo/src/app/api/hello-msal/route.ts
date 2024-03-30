import { verifyB2CToken } from "@my-workspace/util-verify-token";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response('Unauthorized, missing or invalid token', { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    await verifyB2CToken(token);

    return new Response('Hello, from protected API!');
  } catch (error) {
    return new Response((error as Error).message || 'Error during token verification', { status: 401 });
  }
}