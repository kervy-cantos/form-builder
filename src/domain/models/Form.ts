import { FormField } from './FormField'

export class Form {
  private _fields: FormField[] = []

  addField(field: FormField) {
    this._fields.push(field)
  }

  getFields() {
    return [...this._fields]
  }
}
