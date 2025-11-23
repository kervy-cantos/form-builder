import { ref } from 'vue'
import type { FormField } from '@/domain/models/FormField'

export function useFieldResize(
  onResize: (field: FormField, width: number, height: number) => void,
) {
  const resizingField = ref<FormField | null>(null)
  const startPos = ref({ x: 0, y: 0 })
  const startSize = ref({ width: 0, height: 0 })

  const startResize = (field: FormField, e: MouseEvent) => {
    e.preventDefault()
    resizingField.value = field
    startPos.value = { x: e.clientX, y: e.clientY }
    startSize.value = { width: field.size.width, height: field.size.height }
    window.addEventListener('mousemove', onResizeMove)
    window.addEventListener('mouseup', stopResize)
  }

  const onResizeMove = (e: MouseEvent) => {
    if (!resizingField.value) return
    const deltaX = e.clientX - startPos.value.x
    const deltaY = e.clientY - startPos.value.y
    onResize(resizingField.value, startSize.value.width + deltaX, startSize.value.height + deltaY)
  }

  const stopResize = () => {
    resizingField.value = null
    window.removeEventListener('mousemove', onResizeMove)
    window.removeEventListener('mouseup', stopResize)
  }

  return { startResize, stopResize }
}
