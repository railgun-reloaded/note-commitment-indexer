import { test } from 'brittle'

import { COMMITMENT_TREE_ZERO_ELEMENT } from '../src/note-commitment-tree'

test('Should be a valid Railgun Commitment Tree Zero Element', (assert) => {
  assert.alike(COMMITMENT_TREE_ZERO_ELEMENT, new Uint8Array([
    4, 136, 248, 155, 37, 188, 112,
    17, 234, 246, 165, 237, 206, 113,
    174, 175, 185, 254, 112, 111, 170,
    60, 10, 92, 217, 203, 232, 104,
    174, 59, 159, 252]))
})
