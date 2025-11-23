<script setup lang="ts">
import { ref } from 'vue'
import { FormService } from '@/application/useCases/FormUseCases'
import FormCanvas from '@/presentation/components/FormCanvas.vue'

const newFieldType = ref<'text' | 'number' | 'checkbox' | 'select'>('text')
const service = new FormService()

const addField = () => {
  service.addField(newFieldType.value)
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

  <FormCanvas :formService="service" />
</template>
