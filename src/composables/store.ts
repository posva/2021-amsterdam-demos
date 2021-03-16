import {
  computed,
  reactive,
  Ref,
  watchEffect,
  Plugin,
  InjectionKey,
  inject,
} from 'vue'

interface Store {
  state: { counter: number }
  double: Ref<number>
}

export let store: undefined | Store
export function useBrokenStore() {
  if (!store) {
    const state = reactive({ counter: 0 })
    const double = computed(() => state.counter * 2)
    watchEffect(() => {
      console.log(`Count is ${state.counter}`)
    })

    store = { state, double }
  }

  return store
}

export const StateSymbol: InjectionKey<Store['state']> = Symbol()
export const storePlugin: Plugin = (app) => {
  app.provide(StateSymbol, reactive({ counter: 0 }))
}

export function useStore() {
  const state = inject(StateSymbol)!
  const double = computed(() => state.counter * 2)
  watchEffect(() => {
    console.log(`Count is ${state.counter}`)
  })

  return { state, double }
}

const state = reactive({ counter: 0 })
export function useGlobalStore() {
  const double = computed(() => state.counter * 2)
  watchEffect(() => {
    console.log(`Count is ${state.counter}`)
  })

  return { state, double }
}
