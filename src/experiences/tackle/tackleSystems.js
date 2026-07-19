import { Boxes, CircleDot, Gauge, Link2, PackageOpen, Waves } from 'lucide-react'

export const TACKLE_SYSTEMS = [
  { id: '竿', label: '竿', icon: Gauge, test: /竿|杆/ },
  { id: '轮', label: '轮', icon: CircleDot, test: /轮|钓车/ },
  { id: '线', label: '线与结', icon: Link2, test: /线|转环|子线/ },
  { id: '钩', label: '钩', icon: PackageOpen, test: /钩|脱钩|取钩/ },
  { id: '漂坠', label: '漂与坠', icon: Waves, test: /漂|坠|铃/ },
  { id: '饵', label: '饵', icon: Boxes, test: /饵|诱|香虎|九一八|速攻|蓝鲫|水溶袋|天元邓刚浮钓鲢鳙|易包搞定/ },
  { id: '辅助', label: '辅助', icon: Boxes, test: /.*/ },
]

export function tackleSystemFor(title) {
  return TACKLE_SYSTEMS.find((system) => system.id !== '辅助' && system.test.test(title))?.id || '辅助'
}
