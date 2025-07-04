/* eslint camelcase: ["error", {allow: [""]}] */
import { Field } from '@noble/curves/abstract/modular'
import { keccak_256 } from '@noble/hashes/sha3'
import { SparseMerkleTree } from '@railgun-reloaded/merkle-tree/sparse-merkle-tree.js'

import { poseidonT3 } from './hash'

const SNARK_PRIME = 21888242871839275222246405745257275088548364400416034343698204186575808495617n

// Maximum depth of Note Commitment Tree
const COMMITMENT_TREE_DEPTH = 16

// Length of each Element
const COMMITMENT_TREE_ELEMENT_LENGTH = 32

// Zero Element of Railgun Note Commitment Tree
const COMMITMENT_TREE_ZERO_ELEMENT = Field(SNARK_PRIME).toBytes(Field(SNARK_PRIME).fromBytes((keccak_256('Railgun'))) % SNARK_PRIME)

/**
 * Note Commitment Tree Class for managing note
 */
class NoteCommitmentTree {
  /**
   * MerkleTree representation of note commitment
   */
  #merkleTree: SparseMerkleTree

  /**
   * Initialize Empty Merkle tree
   */
  constructor () {
    this.#merkleTree = SparseMerkleTree.create({
      depth: COMMITMENT_TREE_DEPTH,
      hashFn: poseidonT3,
      zeroElement: COMMITMENT_TREE_ZERO_ELEMENT
    })
  }

  /**
   * Create Note Commitment Tree from existing buffer
   * @param buffer - Input note commitment buffer
   * @param length - Size of buffer
   */
  public from (buffer: Readonly<Uint8Array>, length: number) {
    this.#merkleTree = SparseMerkleTree.from({
      buf: buffer,
      length
    }, {
      hashFn: poseidonT3,
      bytesPerElement: COMMITMENT_TREE_ELEMENT_LENGTH
    })
  }

  /**
   * Get Note Commitment Merkle Tree
   * @returns - Note Commitment Tree Instance
   */
  public get merkleTree () {
    return this.#merkleTree
  }
}

export { NoteCommitmentTree, COMMITMENT_TREE_ZERO_ELEMENT }
