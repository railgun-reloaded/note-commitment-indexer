# `@railgun-reloaded/note-commitment-tree`

> Note Commitment Tree Implementation used in RAILGUN

## Install

```sh
npm install --save @railgun-reloaded/note-commitment-tree
```

## Example Usage
```ts

import {NoteCommitmentTree} from '@railgun-reloaded/note-commitment-indexer'

// Create a new commitment tree and initialize with default value 
const tree = new NoteCommitmentTree()

// Insert a leaf at index 0
tree.insert(0, hexToBytes('0x00'))

// Append multiple leaf
tree.append(0, [hexToBytes('0x02'), 
                hexToBytes('0x03'),
                hexToBytes('0x04')])

// Get the root
const root = tree.root()

// Get MerkleProof for given leaf index
const proof = tree.getProof(3)

```

## License

[MIT](LICENSE)