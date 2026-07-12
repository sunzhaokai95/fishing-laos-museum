export const LAW_HISTORY = [
  { period: '唐代', title: '渔捕时禁进入官署管理', text: '河渠、水域和季节性的渔捕限制进入官署职责，垂钓并非天然不受管理。' },
  { period: '武周', title: '水域的政治与祭祀身份', text: '洛水被赋予新的政治意义后出现禁渔钓，规则同时维护资源、秩序与象征权力。' },
  { period: '清初', title: '买河禁钓与放生池', text: '地方士绅、寺院、税赋和放生实践共同改变水域使用权，善意、财力与公共使用之间产生张力。' },
  { period: '近现代', title: '许可、协会与保护制度', text: '休闲垂钓进入许可证、场地许可、闭季、尺寸和数量管理，不同国家形成不同层级。' },
  { period: '2026', title: '中国国家法律与地方规则并存', text: '修订后的渔业法提供国家边界，实际垂钓仍需定位到具体水域、日期、物种和地方办法。' },
]

export const JURISDICTIONS = [
  { place: '中国', manager: '国家法律、地方政府与具体水域管理者', questions: ['是否处于禁渔区或禁渔期', '是否涉及保护物种', '当地对竿、钩、饵和留取怎样规定'], sourceUrl: 'https://www.npc.gov.cn/npc/c2/c30834/202512/t20251227_450727.html' },
  { place: '英国（英格兰与威尔士）', manager: '国家钓竿许可、区域附例与水域所有者许可', questions: ['是否需要 rod licence', '当地闭季和鱼种规则是什么', '是否取得水域所有者许可'], sourceUrl: 'https://www.gov.uk/fishing-licences' },
  { place: '美国', manager: '州级许可和物种规则为主，叠加联邦或保护区规则', questions: ['所在州要求什么许可证', '尺寸与袋限是多少', '保护区是否有更严格的钩具和开放时间'], sourceUrl: 'https://www.fws.gov/services/purchase-fishing-license' },
  { place: '日本', manager: '都道府县调整规则、内水面渔业权与当地游渔规则', questions: ['当地允许哪些渔具渔法', '是否需要游渔券或承认证', '禁渔期、区域和体长限制是什么'], sourceUrl: 'https://www.jfa.maff.go.jp/j/enoki/yugyo/rule.html' },
  { place: '澳大利亚', manager: '州和领地管理为主，叠加海洋公园分区', questions: ['所在州是否要求许可', '尺寸、数量和持有限制是什么', '当前海洋公园分区是否允许垂钓'], sourceUrl: 'https://australianmarineparks.gov.au/access-use/other-approvals/recreational-fishing/' },
]

export const ETHICS_SECTIONS = [
  { id: 'locate-rule', title: '先定位规则', question: '你在哪里、何时、钓什么、用什么方法？', text: '“允许钓鱼”从来不是一个脱离地点的答案。先确定司法辖区、具体水域、日期、目标物种和钩具，再查许可证、闭季、保护区、尺寸与数量。比赛规则、钓场规则和国家法律不能互相替代。' },
  { id: 'decide-catch', title: '决定带走还是放回', question: '合法留取、必须放流和不宜继续作钓是三种不同判断。', text: '辨认物种与尺寸只是第一步。若连续钓到幼鱼、非目标鱼或不适合放流的深水鱼，应考虑改变钓层、钩型、地点或停止，而不是把每条鱼放回就视为零影响。' },
  { id: 'care-for-fish', title: '鱼离水后的处置', question: '怎样减少遛鱼、摘钩、拍照和放流造成的损伤？', text: '使用匹配目标鱼的钓具，避免把鱼遛到完全衰竭；尽可能在水中摘钩，湿手接触并水平支撑鱼体，缩短空气暴露。深水鱼可能出现压力伤，需要按物种和当地指南使用回深工具。' },
  { id: 'tackle-afterlife', title: '钓具的余生', question: '断线、鱼钩、铅坠和包装在离开手以后去了哪里？', text: '短线头会缠绕鸟类和水生动物，遗失钩具仍可能造成穿刺，部分铅制品会带来毒性风险。每次换线和剪结都应即时收纳；回收挂底器物不能以涉水、攀岩或潜水冒险为代价。' },
  { id: 'watch-water', title: '把观察变成公共记录', question: '钓者看到的变化，怎样不只停留在个人鱼获？', text: '持续记录日期、水域尺度、物种、尺寸方法、水温、鱼获与放流，可以帮助识别长期变化。无法确认的鱼应标记待鉴定，敏感物种和繁殖地不公开精确坐标；观察记录不能替代正式监测，但可以成为线索。' },
]

export const ETHICS_INTERNAL_SOURCES = [
  'https://www.fisheries.noaa.gov/national/resources-fishing/catch-and-release-fishing-best-practices',
  'https://www.gov.uk/freshwater-rod-fishing-rules/tackle-you-can-use',
  'https://pir.sa.gov.au/fishing-and-aquaculture/recreational-fishing/responsible-fishing-skills/handling-your-catch',
  'https://www.qld.gov.au/recreation/activities/boating-fishing/rec-fishing/app/my-fishing',
]
