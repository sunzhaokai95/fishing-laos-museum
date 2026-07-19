export const MUSEUM_ROUTE = [
  { id: 'home', stage: '首页', title: '钓鱼佬博物馆', url: '/' },
  { id: 'prologue', stage: '序厅', title: '水面之下', url: '/visit/prologue' },
  { id: 'history', stage: '01', title: '从生存到垂钓', url: '/visit/history' },
  { id: 'fish', stage: '02', title: '鱼各有其水', url: '/visit/fish' },
  { id: 'tackle', stage: '03', title: '手中的水下仪器', url: '/visit/tackle' },
  { id: 'techniques', stage: '04', title: '读懂看不见的鱼', url: '/visit/techniques' },
  { id: 'anglers', stage: '05', title: '谁坐在水边', url: '/visit/anglers' },
  { id: 'culture', stage: '06', title: '鱼不只活在水里', url: '/visit/culture' },
  { id: 'ethics', stage: '07', title: '钓获之后', url: '/visit/ethics' },
  { id: 'epilogue', stage: '尾厅', title: '回到水边', url: '/visit/epilogue' },
]

export function routeContext(pathname) {
  const normalizedPathname = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
  const index = Math.max(0, MUSEUM_ROUTE.findIndex((item) => item.url === normalizedPathname))
  return {
    index,
    current: MUSEUM_ROUTE[index],
    previous: MUSEUM_ROUTE[index - 1] || null,
    next: MUSEUM_ROUTE[index + 1] || null,
  }
}
