<script setup lang="ts">
import { defineProps } from 'vue'
import type { FormService } from '@/application/useCases/FormUseCases'

const props = defineProps<{
  formService: FormService
}>()
</script>

<template>
  <div class="form-preview-canvas">
    <div
      v-for="field in props.formService.getFields()"
      :key="field.id"
      class="preview-field-item"
      :style="{
        top: field.position.y + 'px',
        left: field.position.x + 'px',
        width: field.size.width + 'px',
        height: field.size.height + 'px',
      }"
    >
      <!-- Use actual input/select for real typing -->
      <input
        v-if="field.type === 'text'"
        v-model="field.value"
        :placeholder="field.label"
        class="preview-input"
      />
      <input
        v-else-if="field.type === 'number'"
        type="number"
        v-model="field.value"
        class="preview-input"
      />
      <input type="checkbox" v-else-if="field.type === 'checkbox'" v-model="field.value" />
      <select v-else-if="field.type === 'select'" v-model="field.value" class="preview-input">
        <option v-for="opt in field.options" :key="opt">{{ opt }}</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.form-preview-canvas {
  position: relative;
  width: 100%;
  height: 500px;
  border: 1px dashed #aaa;
  margin-top: 20px;
  background: #f7f7f7;
}

.preview-field-item {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #666;
  padding: 2px;
  box-sizing: border-box;
}

.preview-input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  text-align: center;
}
</style>
