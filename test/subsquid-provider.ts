import { SubsquidClient } from '@railgun-reloaded/subsquid-client'

/**
 * Create a graphql query to get blockData from the subsquid
 * @param offset - Offset/Cursor to the data
 * @param limit - The number of entries to return
 * @returns EvmBlockData query
 */
const getCommitmentQuery = (offset: number, limit = 10_000) => {
  const offsetQuery = offset > 0 ? ` after: "${offset}", ` : ''
  return `
  query MyQuery {
  commitmentsConnection(orderBy: blockTimestamp_ASC, ${offsetQuery} first: ${limit} ) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        blockNumber
        treeNumber
        treePosition
        hash
        transactionHash
      }
    }
  }
}
`
}

type Commitment = {
  treePosition: number
  treeNumber: number
  hash: string
  blockumber: number
  transactioHash: string
}

/**
 * Auto paginate a GraphQL query
 * @param network - NetworkName
 * @returns - The results of the query
 */
const getAllCommitments = async (network: string) : Promise<Commitment[]> => {
  const client = new SubsquidClient({ network })
  const results = new Array<Commitment>()
  let hasNextPage = true
  let offset = 0
  while (hasNextPage) {
    const query = getCommitmentQuery(offset)
    const data = await client.request({ query })
    // @ts-ignore
    const { pageInfo, edges } = data.commitmentsConnection
    hasNextPage = pageInfo.hasNextPage
    offset = pageInfo.endCursor

    // @ts-ignore
    const entries = edges.map(e => e.node) as Commitment[]
    results.push(...entries)
  }
  return results
}

export { getAllCommitments }
export type { Commitment }
