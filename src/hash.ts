import { bytesToHex, hexToBytes } from '@noble/hashes/utils'
import { poseidon2 } from 'poseidon-lite'

/**
 * Poseidon hash of input
 * @param out - 32 byte segment to write hash to
 * @param left - 32 byte left element
 * @param right - 32 byte right element
 * @returns 32 bytes hash output
 */
function poseidonT3 (out: Uint8Array, left: Readonly<Uint8Array>, right: Readonly<Uint8Array>) {
  const hash = poseidon2([`0x${bytesToHex(left)}`, `0x${bytesToHex(right)}`])
  out.set(hexToBytes(hash.toString(16).padStart(64, '0')))
  return out
}

export { poseidonT3 }
