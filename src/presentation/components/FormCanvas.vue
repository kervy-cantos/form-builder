<script setup lang="ts">
import { defineProps, reactive, ref } from 'vue'
import { useFieldDrag } from '@/presentation/composables/useFieldDrag'
import type { FormService } from '@/application/useCases/FormUseCases'
import { useFieldResize } from '../composables/useFieldResize'
import { useFormUI } from '../composables/useFormUI'
import type { FormField } from '../../domain/models/FormField'

const props = defineProps<{
  formService: FormService
}>()
const emit = defineEmits<{ (e: 'selectField', field: FormField): void }>()

const selectField = (field: FormField) => {
  emit('selectField', field)
}

const { uiFields } = useFormUI(props.formService.getForm())
const { startDrag } = useFieldDrag((field, x, y) => {
  props.formService.moveField(field.id, x, y)
})
const { startResize } = useFieldResize((field, width, height) => {
  props.formService.resizeField(field.id, width, height)
})
</script>

<template>
  <div class="form-canvas">
    <div
      v-for="field in props.formService.fields"
      :key="field.id"
      class="field-item"
      :style="{
        top: field.position.y + 'px',
        left: field.position.x + 'px',
        width: field.size.width + 'px',
        height: field.size.height + 'px',
      }"
      @mousedown="(e) => startDrag(field, e, $el)"
      @click.stop="selectField(field)"
    >
      <div class="field-preview" :class="field.type">
        <span v-if="field.type === 'select'">Option 1</span>
        <input v-else-if="field.type === 'checkbox'" type="checkbox" disabled />
      </div>

      <div class="resize-handle bottom-right" @mousedown.stop="startResize(field, $event)"></div>
    </div>
  </div>
</template>

<style scoped lang="css">
.form-canvas {
  position: relative;
  width: 100%;
  height: 500px;
  border: 1px solid #ccc;
}

.field-item {
  position: absolute;
  border: 1px solid #333;
  background: #f9f9f9;
  cursor:
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><circle cx="8" cy="8" r="6" fill="black"/></svg>')
      8 8,
    grab;

  display: flex;
  flex-direction: column;
  --cursor-color: #000;
}
.field-item:active {
  cursor:
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><circle cx="8" cy="8" r="6" fill="black"/></svg>')
      8 8,
    grabbing;
}

.dark .field-item {
  cursor:
    url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"><circle cx="8" cy="8" r="6" fill="white"/></svg>')
      8 8,
    grab;
}
.field-label {
  font-size: 12px;
  margin-bottom: 2px;
}

.field-preview {
  flex: 1;
  border: 1px solid #aaa;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 4px;
  font-size: 14px;
}

.field-preview.checkbox {
  width: 20px;
  height: 20px;
  border-radius: 3px;
  background: #eee;
}

.field-preview.select {
  color: #888;
  font-style: italic;
}

.resize-handle {
  position: absolute;
  width: 10px;
  height: 10px;

  z-index: 10;
}

/* corners */
.top-left {
  top: -5px;
  left: -5px;
  cursor: nwse-resize;
}
.top-right {
  top: -5px;
  right: -5px;
  cursor: nesw-resize;
}
.bottom-left {
  bottom: -5px;
  left: -5px;
  cursor: nesw-resize;
}
.bottom-right {
  bottom: -5px;
  right: -5px;
  cursor: nwse-resize;
}

/* sides */
.top {
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ns-resize;
}
.bottom {
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  cursor: ns-resize;
}
.left {
  left: -5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: ew-resize;
}
.right {
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: ew-resize;
}
</style>
