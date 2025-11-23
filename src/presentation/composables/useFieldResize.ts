import { ref } from 'vue'
import type { FormField } from '@/domain/models/FormField'

export function useFieldResize(
  onResize: (field: FormField, width: number, height: number) => void,
) {
  const resizingField = ref<FormField | null>(null)
  const startMouse = ref({ x: 0, y: 0 })
  const startSize = ref({ width: 0, height: 0 })

  const startResize = (field: FormField, e: MouseEvent) => {
    e.preventDefault()
    resizingField.value = field
    startMouse.value = { x: e.clientX, y: e.clientY }
    startSize.value = { width: field.size.width, height: field.size.height }

    window.addEventListener('mousemove', onResizeMove)
    window.addEventListener('mouseup', stopResize)
  }

  const onResizeMove = (e: MouseEvent) => {
    if (!resizingField.value) return

    const deltaX = e.clientX - startMouse.value.x
    const deltaY = e.clientY - startMouse.value.y

    let newWidth = Math.max(startSize.value.width + deltaX, 30) // min width
    let newHeight = Math.max(startSize.value.height + deltaY, 20) // min height

    onResize(resizingField.value, newWidth, newHeight)
  }

  const stopResize = () => {
    resizingField.value = null
    window.removeEventListener('mousemove', onResizeMove)
    window.removeEventListener('mouseup', stopResize)
  }

  return { startResize, stopResize }
}
