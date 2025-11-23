import { createClient } from '@supabase/supabase-js'
import type { Form } from '@/domain/models/Form'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export class FormRepository {
  async saveForm(key: string, form: Form) {
    const { data, error } = await supabase.from('forms').upsert({ key, form: form.getFields() })

    if (error) throw new Error(error.message)
    return data
  }

  async getForm(key: string) {
    const { data, error } = await supabase.from('forms').select('*').eq('key', key).single()

    if (error) throw new Error('Form not found')
    return data.form
  }
}
