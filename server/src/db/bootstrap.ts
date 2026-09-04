import { getCosmosClient } from './cosmos'
import { CONTAINER_DEFS } from './containers'
import { env } from '../config/env'

/**
 * Idempotently creates the database and all containers this service needs.
 * Safe to run repeatedly (createIfNotExists is a no-op if they already
 * exist) — this is what makes a fresh Cosmos account self-provisioning on
 * first run of `npm run seed` or `npm run dev`.
 */
export async function bootstrapDatabase(): Promise<void> {
  const client = getCosmosClient()

  const { database } = await client.databases.createIfNotExists({ id: env.cosmos.database })

  for (const def of CONTAINER_DEFS) {
    await database.containers.createIfNotExists({
      id: def.id,
      partitionKey: { paths: [def.partitionKey] },
    })
  }
}

if (require.main === module) {
  bootstrapDatabase()
    .then(() => {
      console.log(`Cosmos DB "${env.cosmos.database}" and containers are ready.`)
      process.exit(0)
    })
    .catch((err) => {
      console.error('Failed to bootstrap Cosmos DB:', err)
      process.exit(1)
    })
}
