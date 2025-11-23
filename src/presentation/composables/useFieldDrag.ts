import type { FormField } from '@/domain/models/FormField'
import { ref } from 'vue'

export function useFieldDrag(updateField: (field: FormField, x: number, y: number) => void) {
  const draggingField = ref<FormField | null>(null)
  const offset = ref({ x: 0, y: 0 })

  const startDrag = (field: FormField, e: MouseEvent) => {
    draggingField.value = field
    offset.value = {
      x: e.clientX - (field.position?.x || 0),
      y: e.clientY - (field.position?.y || 0),
    }
    window.addEventListener('mousemove', onDrag)
    window.addEventListener('mouseup', stopDrag)
  }

  const onDrag = (e: MouseEvent) => {
    if (!draggingField.value) return
    const x = e.clientX - offset.value.x
    const y = e.clientY - offset.value.y
    updateField(draggingField.value, x, y) // call service/update function
  }

  const stopDrag = () => {
    draggingField.value = null
    window.removeEventListener('mousemove', onDrag)
    window.removeEventListener('mouseup', stopDrag)
  }

  return { draggingField, startDrag, onDrag, stopDrag }
}
