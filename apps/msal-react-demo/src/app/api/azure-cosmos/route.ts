/* eslint-disable @typescript-eslint/no-explicit-any */
import { client, database, container } from "@my-workspace/data-access-azure-cosmos";
import { verifyAzureB2CToken } from "@my-workspace/util-verify-token";

/**
 * Retrieves resources from Azure Cosmos DB based on the user's ID.
 * @param request - The request object.
 * @returns A response object containing the retrieved resources.
 */
export const GET = async function (request: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user:any = await verifyAzureB2CToken(request, "ReadUser");
    const { resources } = await container.items
      .query({
        query: "SELECT TOP 3 * from c WHERE c.userId = @userId ORDER BY c.timestamp DESC",
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

/**
 * Handles the POST request to create an item in Azure Cosmos DB.
 * @param request - The request object containing the HTTP request details.
 * @returns A Response object with the created item or an error message.
 */
export const POST = async function (request: Request) {
  try {
    const user: any = await verifyAzureB2CToken(request, "WriteUser");
    const data = await request.json();

    const item = {
      userId: user.oid,
      ...data,
    };

    await container.items.create(item);

    return new Response(JSON.stringify(item), { status: 201 });
  } catch (error) {
    return new Response(
      (error as Error).message || "Error during token verification",
      { status: 401 }
    );
  }
}
