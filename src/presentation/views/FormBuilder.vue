<script setup lang="ts">
import { ref } from 'vue'
import { FormService } from '@/application/useCases/FormUseCases'
import FormCanvas from '@/presentation/components/FormCanvas.vue'
import FormPreview from '../components/FormPreview.vue'
import FieldPropertiesPanel from '../components/FieldPropertiesPanel.vue'
import type { FormField } from '../../domain/models/FormField'

const newFieldType = ref<'text' | 'number' | 'checkbox' | 'select'>('text')
const service = new FormService()
const selectedField = ref<FormField | null>(null)

const addField = () => {
  const field = service.addField(newFieldType.value)
  selectedField.value = field // automatically select new field
}

const selectField = (field: FormField) => {
  selectedField.value = field
}
</script>

<template>
  <div>
    <select v-model="newFieldType">
      <option value="text">Text</option>
      <option value="number">Number</option>
      <option value="checkbox">Checkbox</option>
      <option value="select">Select</option>
    </select>
    <button @click="addField">Add Field</button>
  </div>

  <FormCanvas :formService="service" @selectField="selectField" />
  <FormPreview :formService="service" />
  <FieldPropertiesPanel :field="selectedField" />
</template>
