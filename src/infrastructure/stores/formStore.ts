import { defineStore } from 'pinia'
import type { FormField } from '@/domain/models/FormField'
import { ref } from 'vue'

export const useFormStore = defineStore('form', () => {
  const fields = ref<FormField[]>([])

  const setFields = (newFields: FormField[]) => (fields.value = newFields)
  const addField = (field: FormField) => fields.value.push(field)
  const removeField = (id: string) => {
    fields.value = fields.value.filter((f) => f.id !== id)
  }

  return { fields, setFields, addField, removeField }
})
