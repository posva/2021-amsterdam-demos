const LOWER_A_CODE = 'a'.charCodeAt(0)
const LOWER_Z_CODE = 'z'.charCodeAt(0)

export function createComplexObject(nesting = 3): Record<string, any> {
  if (nesting < 1) return null
  const ret: Record<string, any> = {}

  for (let i = LOWER_A_CODE; i < LOWER_Z_CODE; i++) {
    ret[String.fromCharCode(i)] = createComplexObject(nesting - 1)
  }

  return ret
}

export const delay = (t: number) => new Promise((r) => setTimeout(r, t))
export const raf = () => new Promise((r) => requestAnimationFrame(r))

export function setComplexObject(data: Record<string, any>) {
  for (let i = LOWER_A_CODE; i < LOWER_Z_CODE; i++) {
    deepSet(data, String.fromCharCode(i))
  }
}

export function getComplexObject(data: Record<string, any>) {
  let total = 0
  for (let i = LOWER_A_CODE; i < LOWER_Z_CODE; i++) {
    const key = String.fromCharCode(i)
    const value = data[key] || 0
    total += typeof value === 'number' ? value : getComplexObject(data[key])
  }

  return total
}

export function deepSet(data: Record<string, any>, key = 'a') {
  if (
    typeof data === 'object' &&
    key in data &&
    typeof data[key] === 'object' &&
    data[key]
  ) {
    deepSet(data[key], key)
  } else {
    data[key] = Math.random()
  }
}

export function deepGet(data: Record<string, any>, key = 'a') {
  return data && typeof data === 'object' && key in data
    ? deepGet(data[key], key)
    : data
}
