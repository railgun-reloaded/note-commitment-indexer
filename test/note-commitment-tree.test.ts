import { bytesToHex } from '@noble/hashes/utils'
import { test } from 'brittle'

import { COMMITMENT_TREE_ZERO_ELEMENT, NoteCommitmentTree } from '../src/note-commitment-tree'

import { numberStringToUint8Array } from './helper'
import { TEST_COMMITMENTS, TEST_COMMITMENTS_LARGE } from './test-vectors'

test('Should be a valid Railgun Commitment Tree Zero Element', (assert) => {
  assert.alike(COMMITMENT_TREE_ZERO_ELEMENT, new Uint8Array([
    4, 136, 248, 155, 37, 188, 112,
    17, 234, 246, 165, 237, 206, 113,
    174, 175, 185, 254, 112, 111, 170,
    60, 10, 92, 217, 203, 232, 104,
    174, 59, 159, 252]))
})

test('Should create commitment tree and verify root', async (assert) => {
  const tree = new NoteCommitmentTree()
  const testVectorArray = TEST_COMMITMENTS.map(c => numberStringToUint8Array(c.toString(), 32))
  // tree.append(testVectorArray)
  tree.insert(0, testVectorArray)

  const root = `0x${bytesToHex(tree.root())}`
  assert.is(root, '0x0e3b07998d280047024f4d67facae9799b942ce862a955bf88108b42ac662460', 'Root is valid')
})

test('Should create commitment tree and verify root for large number of commitments', async (assert) => {
  const tree = new NoteCommitmentTree()
  const testVectorArray = TEST_COMMITMENTS_LARGE.map(c => numberStringToUint8Array(c.toString(), 32))

  tree.append(testVectorArray)

  const root = `0x${bytesToHex(tree.root())}`
  assert.is(root, '0x17bf531e8e541b60c80b12bb1ea3e49e0a775bf5b04e29cf665b90d98e96b14a', 'Root is valid')
})
