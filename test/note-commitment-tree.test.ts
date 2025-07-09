import { bytesToHex, hexToBytes } from '@railgun-reloaded/cryptography'
import type { MerkleProof } from '@railgun-reloaded/merkle-tree/types.js'
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
  tree.insert(0, testVectorArray)
  assert.is(bytesToHex(tree.root()), '0e3b07998d280047024f4d67facae9799b942ce862a955bf88108b42ac662460', 'Root is valid')
})

test('Should create commitment tree and verify root for large number of commitments', async (assert) => {
  const tree = new NoteCommitmentTree()
  const testVectorArray = TEST_COMMITMENTS_LARGE.map(c => numberStringToUint8Array(c.toString(), 32))
  tree.append(testVectorArray)
  assert.is(bytesToHex(tree.root()), '17bf531e8e541b60c80b12bb1ea3e49e0a775bf5b04e29cf665b90d98e96b14a', 'Root is valid')
})

test('Should generate valid merkle proofs', (assert) => {
  const tree = new NoteCommitmentTree()
  const testVectorArray = TEST_COMMITMENTS_LARGE.map(c => numberStringToUint8Array(c.toString(), 32))
  tree.append(testVectorArray)
  const actual = tree.proof(741)

  const expected : MerkleProof = {
    index: 741,
    root: hexToBytes('17bf531e8e541b60c80b12bb1ea3e49e0a775bf5b04e29cf665b90d98e96b14a'),
    pathElements: [
      '17c43969a81ddea92074e6f2ac1c6c6c30221e4d9a6f3694f7200387ffad71fe',
      '1445751c74d16f3f22dc20c30ef94d52a2945283eb46d520e20923d505727437',
      '2eac9014951d3e477e1c729efe7b8d10bae84cd2d7fd5cf8af49750d53ca2879',
      '060014593f3d835f4ab365eb981da19098e27fa37c6e6e5160fe2ac264176d83',
      '24f86f92bcfba48e1a098b70f9be35b81736bdbb464aed0cf6b6fa4b86030c40',
      '1c752eb0bbe8dbb30b5d99ae2544efac732c4fe365f46842f51982bc0fe39cd9',
      '2fc0d455e5cbafe72850b0ea94319ce938cc016f8b1b7f6438b9f4f27c4d9c21',
      '1e321e5e61cf8bc2a6d59b93f298c0d25b16973ce55c10a9700dfab0b9a9f890',
      '00261b82b4c37768274ad0e67035dfb4280de30b1726a3aa0099ab89b0dcbd55',
      '15425bf54b57bdce9968f9c7731194be667cebed8fab16aef14f7b2d96b3ab98',
      '0ca2b107491c8ca6e5f7e22403ea8529c1e349a1057b8713e09ca9f5b9294d46',
      '18593c75a9e42af27b5e5b56b99c4c6a5d7e7d6e362f00c8e3f69aeebce52313',
      '17aca915b237b04f873518947a1f440f0c1477a6ac79299b3be46858137d4bfb',
      '2726c22ad3d9e23414887e8233ee83cc51603f58c48a9c9e33cb1f306d4365c0',
      '08c5bd0f85cef2f8c3c1412a2b69ee943c6925ecf79798bb2b84e1b76d26871f',
      '27f7c465045e0a4d8bec7c13e41d793734c50006ca08920732ce8c3096261435'
    ].map(hexToBytes)
  }
  assert.alike(actual, expected)
})
