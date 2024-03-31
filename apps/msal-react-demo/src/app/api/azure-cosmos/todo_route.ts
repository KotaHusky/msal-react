// make a call to azure cosmos db that will return a list of items attributed to the user

import { client, database, container } from "@my-workspace/data-access-azure-cosmos";
import { verifyAzureB2CToken } from "@my-workspace/util-verify-token";

export const GET = async function (request: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user:any = await verifyAzureB2CToken(request, "ReadUser");
    const { resources } = await container.items
      .query({
        query: "SELECT * from c WHERE c.userId = @userId",
        parameters: [{ name: "@userId", value: user.oid }],
      })
      .fetchAll();

    return new Response(JSON.stringify(resources));
  } catch (error) {
    return new Response(
      (error as Error).message || "Error during token verification",
      { status: 401 }
    );
  }
};
