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
  action: string
  payload: Record<string, any>
  options: Record<string, any>
}

export default function createOuvueRenderComponent(fn: OuvueInstance['fetch']): VueConstructor {
  return Vue.extend<Data, Methods, {}, Props>({
    name: 'OuvueRender',
    props: {
      action: { type: String, required: true },
      payload: { type: Object, default: () => ({}) },
      options: { type: Object, default: () => ({}) }
    },
    data: () => ({
      data: null,
      isLoading: false,
      error: null
    }),
    created() {
      this.fetch()
    },
    methods: {
      async fetch(): Promise<void> {
        this.isLoading = true
        const { data, error } = await fn(this.action, this.payload, this.options)

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
