export const ANGLER_QUESTIONS = [
  { question: '到达陌生水域后，你通常先做什么？', options: [{ text: '沿岸观察水流、结构和活动痕迹', type: 'observer' }, { text: '整理参数，测深并逐项建立基准', type: 'analyst' }, { text: '先抛几竿，用移动迅速排除空水', type: 'searcher' }, { text: '找一个安全安静的位置，慢慢等待', type: 'keeper' }] },
  { question: '长时间没有信号时，你更可能怎样调整？', options: [{ text: '回看风、水色和鱼星，重新判断位置', type: 'observer' }, { text: '每次只改变一个变量并做好记录', type: 'analyst' }, { text: '更换方向、水层或钓位继续搜索', type: 'searcher' }, { text: '维持稳定节奏，不让焦躁接管动作', type: 'keeper' }] },
  { question: '一次跑鱼以后，你最先检查什么？', options: [{ text: '鱼当时如何移动，障碍在哪里', type: 'observer' }, { text: '钩尖、线结、泄力和受力过程', type: 'analyst' }, { text: '下一次怎样更快改变鱼头方向', type: 'searcher' }, { text: '先停下来，避免连续动作继续出错', type: 'keeper' }] },
  { question: '收竿时，什么最能代表这次水边经历？', options: [{ text: '我比来时更懂这片水域', type: 'observer' }, { text: '我留下了一组可比较的记录', type: 'analyst' }, { text: '我验证了几个新的位置和动作', type: 'searcher' }, { text: '水边恢复原样，我也平静下来', type: 'keeper' }] },
]

export const ANGLER_RESULTS = {
  observer: { title: '读水者', text: '你习惯先看环境，再决定工具。你的优势是把鱼放回水流、结构和季节中理解；需要警惕的是，把一次观察过早写成固定规律。' },
  analyst: { title: '校准者', text: '你依靠测量、记录和逐项改变来减少误判。你的优势是可复盘；需要警惕的是，参数不会替你判断现场，也不能消除水域的不确定。' },
  searcher: { title: '搜索者', text: '你通过移动、变换水层和改变动作主动寻找鱼。你的优势是行动明确；需要警惕的是，频繁变化会让有效线索来不及显现。' },
  keeper: { title: '守候者', text: '你善于维持节奏，接受等待并照看身边环境。你的优势是稳定；需要警惕的是，耐心不等于固守，条件变化时仍需重新判断。' },
}

export const WATER_FORTUNES = [
  { title: '缓流签', line: '先看水往哪里去，再决定线落在哪里。', note: '今天的签语提醒你：减少无根据的频繁调整。' },
  { title: '回湾签', line: '看似停住的地方，也在交换水与食物。', note: '今天的签语提醒你：观察边界，不只盯着中心。' },
  { title: '风纹签', line: '水面的纹路不是答案，是问题开始出现的地方。', note: '今天的签语提醒你：把风、流和漂相分开判断。' },
  { title: '空竿签', line: '没有钓获，也可能留下关于水域的有效记录。', note: '今天的签语提醒你：区分没有鱼、没有找到鱼和鱼没有摄食。' },
]
