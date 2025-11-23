export type FieldType = 'text' | 'number' | 'checkbox' | 'select'

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export class FormField {
  size: { width: number; height: number }

  constructor(
    public id: string,
    public type: FieldType,
    public label: string,
    public required: boolean,
    public options: string[] | undefined = undefined,
    public position: Position = { x: 50, y: 50 },
  ) {
    this.size = { width: 120, height: 40 } // default
    if (type === 'select' && !options) this.options = ['Option 1']
  }

  move(x: number, y: number) {
    this.position = { x, y }
  }

  updateLabel(newLabel: string) {
    this.label = newLabel
  }

  resize(width: number, height: number) {
    this.size.width = width
    this.size.height = height
  }
}
