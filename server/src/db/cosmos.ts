import { CosmosClient } from '@azure/cosmos'
import { env } from '../config/env'

let client: CosmosClient | null = null

/**
 * Returns a singleton CosmosClient built from env vars. Throws a clear error
 * if credentials are missing so failures happen at the point of use rather
 * than silently. There is no live Cosmos DB in this dev environment — this
 * client is only exercised once real COSMOS_ENDPOINT / COSMOS_KEY are set.
 */
export function getCosmosClient(): CosmosClient {
  if (client) return client

  if (!env.cosmos.endpoint || !env.cosmos.key) {
    throw new Error(
      'Cosmos DB is not configured. Set COSMOS_ENDPOINT and COSMOS_KEY in your .env file ' +
        '(see .env.example) before starting the server or running the seed script.'
    )
  }

  client = new CosmosClient({
    endpoint: env.cosmos.endpoint,
    key: env.cosmos.key,
  })
  return client
}

export function getDatabase() {
  return getCosmosClient().database(env.cosmos.database)
}
