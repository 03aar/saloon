import { getDatabase } from './cosmos'

/**
 * Container definitions for the Bloop database. Partition keys are chosen to
 * match the app's real query patterns (e.g. campaigns are almost always
 * queried "for this brand", so they're partitioned by /brandId).
 */
export const CONTAINER_DEFS = [
  { id: 'users', partitionKey: '/id' },
  { id: 'campaigns', partitionKey: '/brandId' },
  { id: 'creators', partitionKey: '/id' },
  { id: 'threads', partitionKey: '/id' },
  { id: 'messages', partitionKey: '/threadId' },
  { id: 'offers', partitionKey: '/campaignId' },
  { id: 'notifications', partitionKey: '/userId' },
  { id: 'team', partitionKey: '/brandId' },
] as const

export type ContainerName = (typeof CONTAINER_DEFS)[number]['id']

export function getContainer(name: ContainerName) {
  return getDatabase().container(name)
}

export const containers = {
  users: () => getContainer('users'),
  campaigns: () => getContainer('campaigns'),
  creators: () => getContainer('creators'),
  threads: () => getContainer('threads'),
  messages: () => getContainer('messages'),
  offers: () => getContainer('offers'),
  notifications: () => getContainer('notifications'),
  team: () => getContainer('team'),
}
