export const HALLS = [
  { id: 'prologue', stage: '序厅', url: '/visit/prologue', title: '水面之下', summary: '从一片看似平静的水面开始。' },
  { id: 'history', stage: '01', url: '/visit/history', title: '从生存到垂钓', summary: '沿中国钓鱼史的时间河流，看工具、身份和意义如何变化。' },
  { id: 'fish', stage: '02', url: '/visit/fish', title: '鱼各有其水', summary: '806种鱼进入不同水层、食物关系和生活环境。' },
  { id: 'tackle', stage: '03', url: '/visit/tackle', title: '手中的水下仪器', summary: '钩、线、竿、轮、漂、坠与饵共同组成感知系统。' },
  { id: 'techniques', stage: '04', url: '/visit/techniques', title: '读懂看不见的鱼', summary: '饵技、竿技、漂技和鱼技，是动作与判断的组合。' },
  { id: 'anglers', stage: '05', url: '/visit/anglers', title: '谁坐在水边', summary: '同一根竿背后，是不同身份、处境与生活。' },
  { id: 'culture', stage: '06', url: '/visit/culture', title: '鱼不只活在水里', summary: '鱼进入诗画、隐喻、行话、吉祥想象与民间信念。' },
  { id: 'ethics', stage: '07', url: '/visit/ethics', title: '钓获之后', summary: '规则、鱼的处境与水域环境，从鱼离水的那一刻同时开始。' },
  { id: 'epilogue', stage: '尾厅', url: '/visit/epilogue', title: '回到水边', summary: '带着新的观察方式，重新看一片水。' },
]

export function hallById(id) {
  return HALLS.find((hall) => hall.id === id)
}

export function hallByUrl(url) {
  return HALLS.find((hall) => hall.url === url)
}

export function adjacentHalls(id) {
  const index = HALLS.findIndex((hall) => hall.id === id)
  return { previous: HALLS[index - 1], next: HALLS[index + 1] }
}
