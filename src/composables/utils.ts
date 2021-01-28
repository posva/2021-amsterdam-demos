import { Ref, ref, unref } from 'vue'

const LOWER_A_CODE = 'a'.charCodeAt(0)
const LOWER_Z_CODE = 'z'.charCodeAt(0)

export type MaybeRef<T> = Ref<T> | T

export function createComplexObject(nesting = 3): Record<string, any> {
  const ret = {} as Record<string, any>

  console.time('createComplexObject')

  for (let i = LOWER_A_CODE; i < LOWER_Z_CODE; i++) {
    ret[String.fromCharCode(i)] = _createNestedObject(nesting - 1)
  }

  console.timeEnd('createComplexObject')

  return ret
}

function _createNestedObject(remainingNesting: number) {
  if (remainingNesting < 1) return null
  const ret = ref({} as Record<string, any>)

  for (let i = LOWER_A_CODE; i < LOWER_Z_CODE; i++) {
    ret.value[String.fromCharCode(i)] = _createNestedObject(
      remainingNesting - 1
    )
  }

  return ret
}

export const delay = (t: number) => new Promise((r) => setTimeout(r, t))
export const raf = () => new Promise((r) => requestAnimationFrame(r))

export function setComplexObject(data: Record<string, any>) {
  for (let i = LOWER_A_CODE; i < LOWER_Z_CODE; i++) {
    deepSet(unref(data), String.fromCharCode(i))
  }
}

export function getComplexObject(data: Record<string, any>) {
  let total = 0
  for (let i = LOWER_A_CODE; i < LOWER_Z_CODE; i++) {
    const key = String.fromCharCode(i)
    const value = unref(data)[key] || 0
    total +=
      typeof value === 'number' ? value : getComplexObject(unref(data)[key])
  }

  return total
}

export function deepSet(data: Record<string, any>, key = 'a') {
  if (
    typeof data === 'object' &&
    key in data &&
    typeof unref(data[key]) === 'object' &&
    unref(data[key])
  ) {
    deepSet(unref(data[key]), key)
  } else {
    unref(data)[key] = Math.random()
  }
}

export function deepGet(data: Record<string, any>, key = 'a') {
  return data && typeof data === 'object' && key in data
    ? deepGet(unref(data[key]), key)
    : data
}
