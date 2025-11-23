<script setup lang="ts">
import { defineProps, reactive } from 'vue'
import { useFieldDrag } from '@/presentation/composables/useFieldDrag'
import type { FormService } from '@/application/useCases/FormUseCases'
import { useFieldResize } from '../composables/useFieldResize'

const props = defineProps<{
  formService: FormService
}>()

const { startDrag } = useFieldDrag((field, x, y) => {
  props.formService.moveField(field.id, x, y)
})
const { startResize } = useFieldResize((field, width, height) => {
  props.formService.resizeField(field.id, width, height)
})

const reactiveFields = reactive(props.formService.getFields())
</script>

<template>
  <div class="form-canvas">
    <div
      v-for="field in reactiveFields"
      :key="field.id"
      class="field-item"
      :style="{
        top: field.position.y + 'px',
        left: field.position.x + 'px',
        width: field.size.width + 'px',
        height: field.size.height + 'px',
      }"
      @mousedown="startDrag(field, $event)"
    >
      {{ field.label }}

      <div class="resize-handle" @mousedown.stop="startResize(field, $event)"></div>
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
  padding: 4px 8px;
  border: 1px solid #333;
  background: #f3f3f3;
  cursor: grab;
}

.resize-handle {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  background: #333;
  cursor: se-resize;
}
</style>
