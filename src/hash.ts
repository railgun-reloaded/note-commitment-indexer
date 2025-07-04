import { poseidonHex } from '@railgun-community/poseidon-hash-wasm'

/**
 * Convert a Uint8Array to a 32 byte hex string
 * @param array - Uint8Array representation of hex string
 * @returns - 0x Prefixed Hex String
 */
function uint8ArrayToHexString (array: Uint8Array) : string {
  // Create empty hex string
  let hexString = ''

  // Loop through each byte of array
  array.forEach((byte) => {
    // Convert integer representation to base 16
    let hexByte = byte.toString(16)

    // Ensure 2 chars
    hexByte = hexByte.length === 1 ? '0' + hexByte : hexByte

    // Append to hexString
    hexString += hexByte
  })

  // Prefix with 0x
  return `0x${hexString}`
}

/**
 * Poseidon hash of input
 * @param out - 32 byte segment to write hash to
 * @param left - 32 byte left element
 * @param right - 32 byte right element
 * @returns 32 bytes hash output
 */
function poseidonT3 (out: Uint8Array, left: Readonly<Uint8Array>, right: Readonly<Uint8Array>) {
  // @TODO Buffer is not available in web, replace this later
  out = Uint8Array.from(Buffer.from(poseidonHex([
    uint8ArrayToHexString(left),
    uint8ArrayToHexString(right)]), 'hex'))

  return out
}

export { poseidonT3 }
