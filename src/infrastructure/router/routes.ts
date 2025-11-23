import type { RouteRecordRaw } from 'vue-router'
import FormBuilder from '@/presentation/views/FormBuilder.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Builder',
    component: FormBuilder,
  },
  // future routes can be added here
  // {
  //   path: '/preview',
  //   name: 'Preview',
  //   component: PreviewForm,
  // },
]
