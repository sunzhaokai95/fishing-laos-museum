export const PEOPLE_GROUPS = [
  {
    id: 'livelihood',
    label: '以水为生',
    description: '捕鱼、垂钓、养殖、修船和售鱼可能共同构成生计。这里讨论劳动条件，而不把辛苦生活审美化。',
    recordIds: ['person-fishing-worker-seat'],
  },
  {
    id: 'power',
    label: '权力与选择',
    description: '有人借垂钓等待进入政治，有人用垂钓表达拒绝。历史人物与后世传说需要分层观看。',
    recordIds: ['person-jiang-shang', 'person-yan-ziling'],
  },
  {
    id: 'literature',
    label: '文学中的钓者',
    description: '诗与绘画中的人物不一定是真实人物传记，但他们塑造了人们理解孤独、家庭和水边生活的方式。',
    recordIds: ['person-cold-river-angler', 'person-child-making-hook'],
  },
  {
    id: 'women-family',
    label: '女性与家庭',
    description: '女性和儿童并非水边的陪衬。现有图像、诗文与当代经验需要分别整理，不能合成一种共同人生。',
    recordIds: ['person-women-anglers-seat'],
  },
  {
    id: 'competition-industry',
    label: '竞技与行业',
    description: '运动员、教练、裁判、饵料研究者、钓具经营者与内容传播者共同构成现代垂钓行业。',
    recordIds: ['person-modern-competition-seat'],
    includeBaike: true,
  },
  {
    id: 'community',
    label: '当代社群',
    description: '“钓鱼佬”是一种不断变化的网络自称，受到平台、地域、钓法、年龄和性别影响。',
    recordIds: ['person-fishing-lao-community-seat'],
  },
]

export const PEOPLE_OVERRIDES = {
  'person-fishing-worker-seat': { title: '以钓与捕鱼为生的人', kind: '劳动身份' },
  'person-women-anglers-seat': { title: '女性钓者', kind: '历史与当代身份' },
  'person-modern-competition-seat': { title: '竞技钓者', kind: '现代职业身份' },
  'person-fishing-lao-community-seat': { title: '“钓鱼佬”社群', kind: '当代社群身份' },
}
