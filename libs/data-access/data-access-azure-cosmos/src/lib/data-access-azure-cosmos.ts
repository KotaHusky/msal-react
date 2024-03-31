import { CosmosClient } from "@azure/cosmos";

const endpoint = process.env["AZURE_COSMOS_ENDPOINT"] || "";
const key = process.env["AZURE_COSMOS_KEY"] || "";
const databaseId = process.env["AZURE_COSMOS_DATABASE_ID"] || "";
const containerId = process.env["AZURE_COSMOS_CONTAINER_ID"] || "";

const client = new CosmosClient({ endpoint: endpoint, key: key });
const database = client.database(databaseId);
const container = database.container(containerId);

export { client, database, container };
