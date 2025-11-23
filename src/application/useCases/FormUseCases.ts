import { reactive } from 'vue'
import { Form } from '@/domain/models/Form'
import { FormField, type FieldType } from '@/domain/models/FormField'

export class FormService {
  private form: Form
  public fields = reactive<FormField[]>([])

  constructor(form?: Form) {
    this.form = form || new Form()

    this.fields.push(...this.form.getFields())
  }
  getForm() {
    return this.form
  }

  addField(type: FieldType) {
    const field = new FormField(
      crypto.randomUUID(),
      type,
      `New ${type} Field`,
      false,
      type === 'select' ? ['Option 1'] : undefined,
    )
    this.fields.push(field)
    return field
  }

  getFields() {
    return this.fields
  }

  moveField(fieldId: string, x: number, y: number) {
    const field = this.fields.find((f) => f.id === fieldId)
    if (field) field.move(x, y)
  }

  resizeField(fieldId: string, width: number, height: number, x?: number, y?: number) {
    const field = this.fields.find((f) => f.id === fieldId)
    if (!field) return

    field.resize(width, height)

    if (x !== undefined) field.position.x = x
    if (y !== undefined) field.position.y = y
  }
}
