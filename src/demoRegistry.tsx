import { RefreshCcw, type LucideIcon } from 'lucide-react'
import type { ComponentType } from 'react'
import { ReturnExchangeManagement } from './pages'

export interface AdminDemoRoute {
  path: string
  title: string
  description: string
  group: string
  icon: LucideIcon
  component: ComponentType
}

export const demoRoutes: AdminDemoRoute[] = [
  {
    path: '/',
    title: '退换货管理',
    description: '统一管理 DTC 退货、换货、退款、补发和售后审核流程。',
    group: 'After Sales',
    icon: RefreshCcw,
    component: ReturnExchangeManagement,
  },
]

export const legacyRouteRedirects = [
  '/orders',
  '/products',
  '/customers',
  '/marketing',
  '/after-sales',
  '/operations',
  '/settings',
  '/return-exchange',
]
