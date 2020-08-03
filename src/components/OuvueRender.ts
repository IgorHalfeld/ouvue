import Vue, { CreateElement, VNode, VueConstructor } from 'vue'
import { OuvueInstance } from '../types'

interface Data {
  data: any
  isLoading: boolean
  error: any
}

interface Methods {
  fetch(): void
}

interface Props {
  key: string
  payload: Record<string, any>
}

export default function createOuvueRenderComponent(fetch: OuvueInstance['fetch']): VueConstructor {
  return Vue.extend<Data, Methods, {}, Props>({
    props: {
      key: { type: String, required: true },
      payload: { type: Object, default: () => ({}) }
    },
    data: () => ({
      data: null,
      isLoading: false,
      error: null
    }),
    methods: {
      async fetch(): Promise<void> {
        this.isLoading = true
        const { data, error } = await fetch(this.key, this.payload)

        this.data = data
        this.error = error
        this.isLoading = false
      }
    },
    render(createElement: CreateElement): VNode {
      const slot = this.$scopedSlots.default!({
        data: this.data,
        isLoading: this.isLoading,
        error: this.error
      }) as any

      return createElement('div', slot)
    }
  })
}
