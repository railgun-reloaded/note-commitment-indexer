import { bytesToHex } from '@noble/hashes/utils'
import { solo, test } from 'brittle'

import { COMMITMENT_TREE_ZERO_ELEMENT, NoteCommitmentTree } from '../src/note-commitment-tree'

import { numberStringToUint8Array } from './helper'
import { TEST_COMMITMENTS } from './test-vectors'

test('Should be a valid Railgun Commitment Tree Zero Element', (assert) => {
  assert.alike(COMMITMENT_TREE_ZERO_ELEMENT, new Uint8Array([
    4, 136, 248, 155, 37, 188, 112,
    17, 234, 246, 165, 237, 206, 113,
    174, 175, 185, 254, 112, 111, 170,
    60, 10, 92, 217, 203, 232, 104,
    174, 59, 159, 252]))
})
/*
test('Should create commitment tree and verify root [ETHEREUM]', async (assert) => {
  assert.timeout(100_000)
  const tree = new NoteCommitmentTree()

  const commitments = await getAllCommitments('ethereumSepolia')
  fs.writeFileSync('test.json', JSON.stringify(commitments))
  const commitmentMap = new Map<number, string[]>()
  commitments.forEach((c) => {
    if (commitmentMap.get(c.treeNumber)) {
      commitmentMap.get(c.treeNumber)!.push(c.hash)
    } else {
      commitmentMap.set(c.treeNumber, [c.hash])
    }
  })

  for (const [key, val] of commitmentMap) {
    const tree = new NoteCommitmentTree()
    let commitmentBytesArray = val.map(v => numberStringToUint8Array(v, 32))
    if (commitmentBytesArray.length > 65535) commitmentBytesArray = commitmentBytesArray.slice(0, 65535)
    tree.append(commitmentBytesArray)

    const root = tree.root()
    console.log(key, bytesToHex(root))
  }
  assert.execution(tree)
})
*/
test('Should verify the Merkle Root for given sets of commitment', async (assert) => {
  const tree = new NoteCommitmentTree()
  const testVectorArray = TEST_COMMITMENTS.map(c => numberStringToUint8Array(c.toString(), 32))
  tree.append(testVectorArray)

  const root = `0x${bytesToHex(tree.root())}`

  // Can verify online from sepolia proxy contract, but hardcoded for now
  assert.is(root, '0x0e3b07998d280047024f4d67facae9799b942ce862a955bf88108b42ac662460', 'Root is valid')
})
