import { reactive, onBeforeMount } from 'vue'
import { OuvueInstance, OuvueResult, Props } from '../types'

export default function createUseOuvue(fn: OuvueInstance['fetch']): (props: Props) => OuvueResult {
  function useOuvue(props: Props): OuvueResult {
    const state = reactive<OuvueResult>({
      isLoading: false,
      data: null,
      error: null
    })

    onBeforeMount(() => {
      fetch()
    })

    async function fetch(): Promise<void> {
      state.isLoading = true
      const { data, error } = await fn(props.action, props.payload, props.options)

      state.data = data
      state.error = error
      state.isLoading = false
    }

    return state
  }

  return useOuvue
}
