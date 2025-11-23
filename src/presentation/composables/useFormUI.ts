import { reactive } from 'vue'
import type { Form } from '@/domain/models/Form'

export function useFormUI(form: Form) {
  const uiFields = reactive(
    form.getFields().map((f) =>
      reactive({
        domain: f,
        id: f.id,
        label: f.label,
        position: f.position,
        size: f.size,
        type: f.type,
      }),
    ),
  )

  return { uiFields }
}
