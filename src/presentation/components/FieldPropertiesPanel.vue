<script setup lang="ts">
import { defineProps, reactive, watch } from 'vue'
import type { FormField } from '@/domain/models/FormField'

const props = defineProps<{
  field: FormField | null
}>()

const fieldProps = reactive({
  label: '',
  type: 'text' as string,
  required: false,
  options: [] as string[],
  value: '' as string | number | boolean,
})

watch(
  () => props.field,
  (newField) => {
    if (newField) {
      fieldProps.label = newField.label
      fieldProps.type = newField.type
      fieldProps.required = newField.required
      fieldProps.options = newField.options ? [...newField.options] : []
      fieldProps.value = newField.value
    }
  },
  { immediate: true },
)

watch(
  fieldProps,
  (newProps) => {
    if (props.field) {
      props.field.label = newProps.label
      props.field.type = newProps.type as any
      props.field.required = newProps.required
      props.field.options = [...newProps.options]
      props.field.value = newProps.value
    }
  },
  { deep: true },
)
</script>

<template>
  <div v-if="field" class="field-properties-panel">
    <h3>Field Properties</h3>
    <label>
      Label:
      <input v-model="fieldProps.label" />
    </label>
    <label>
      Type:
      <select v-model="fieldProps.type">
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="checkbox">Checkbox</option>
        <option value="select">Select</option>
      </select>
    </label>
    <label>
      Required:
      <input type="checkbox" v-model="fieldProps.required" />
    </label>
    <div v-if="fieldProps.type === 'select'">
      Options:
      <div v-for="(opt, i) in fieldProps.options" :key="i">
        <input v-model="fieldProps.options[i]" />
        <button @click="fieldProps.options.splice(i, 1)">Delete</button>
      </div>
      <button @click="fieldProps.options.push('New Option')">Add Option</button>
    </div>
    <label>
      Default Value:
      <input
        v-if="fieldProps.type === 'text' || fieldProps.type === 'number'"
        v-model="fieldProps.value"
      />
      <input
        v-else-if="fieldProps.type === 'checkbox'"
        type="checkbox"
        v-model="fieldProps.value"
      />
      <select v-else-if="fieldProps.type === 'select'" v-model="fieldProps.value">
        <option v-for="opt in fieldProps.options" :key="opt">{{ opt }}</option>
      </select>
    </label>
  </div>
</template>

<style scoped>
.field-properties-panel {
  padding: 12px;
  border: 1px solid #ccc;
  width: 250px;
  background: #f5f5f5;
}
.field-properties-panel label {
  display: block;
  margin-bottom: 8px;
}
.field-properties-panel input,
.field-properties-panel select {
  width: 100%;
  margin-top: 2px;
}
</style>
