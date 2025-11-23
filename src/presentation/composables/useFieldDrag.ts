import { ref } from 'vue'
import type { FormField } from '@/domain/models/FormField'

export function useFieldDrag(onMove: (field: FormField, x: number, y: number) => void) {
  const draggingField = ref<FormField | null>(null)
  const offset = ref({ x: 0, y: 0 })
  const canvasRect = ref<DOMRect | null>(null)

  const startDrag = (field: FormField, e: MouseEvent, canvasEl: HTMLElement) => {
    e.preventDefault()
    draggingField.value = field
    offset.value = {
      x: e.clientX - field.position.x,
      y: e.clientY - field.position.y,
    }
    canvasRect.value = canvasEl.getBoundingClientRect()
    window.addEventListener('mousemove', onDrag)
    window.addEventListener('mouseup', stopDrag)
  }

  const onDrag = (e: MouseEvent) => {
    if (!draggingField.value || !canvasRect.value) return

    let x = e.clientX - offset.value.x
    let y = e.clientY - offset.value.y

    // Clamp within canvas
    x = Math.max(0, Math.min(x, canvasRect.value.width - draggingField.value.size.width))
    y = Math.max(0, Math.min(y, canvasRect.value.height - draggingField.value.size.height))

    draggingField.value.position = { x, y }
    onMove(draggingField.value, x, y)
  }

  const stopDrag = () => {
    draggingField.value = null
    window.removeEventListener('mousemove', onDrag)
    window.removeEventListener('mouseup', stopDrag)
  }

  return { startDrag, stopDrag }
}
