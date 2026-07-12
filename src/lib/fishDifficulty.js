const labels = ['入门', '基础', '进阶', '高', '专业']
const includesAny = (text, terms) => terms.some((term) => text.includes(term))
const firstNumber = (value) => Number(String(value || '').replaceAll(',', '').match(/\d+(?:\.\d+)?/)?.[0] || 0)

export function fishDifficulty(fish) {
  const text = [fish.summary, fish.fields?.栖息环境, fish.fields?.水层, fish.fields?.食性, ...(fish.practical_tips || [])].filter(Boolean).join(' ')
  let access = includesAny(text, ['远洋', '远海', '深海', '大陆坡', '海山']) ? 5 : includesAny(text, ['近海', '离岸', '船钓', '船只', '出海']) ? 4 : includesAny(text, ['溪流', '高原', '冷水', '河口', '潮间带']) ? 3 : 2
  let habitat = includesAny(text, ['珊瑚礁', '岩礁', '暗礁', '石缝', '海底沟壑']) ? 5 : includesAny(text, ['乱石', '倒木', '水草', '桥墩', '洞穴', '障碍']) ? 4 : includesAny(text, ['湍急', '急流', '强流', '深水', '底层']) ? 3 : 2
  const baitCount = (fish.bait_options || []).filter((item) => !includesAny(item, ['实战技巧', '推荐钓点', '相似鱼种'])).length
  let feeding = baitCount >= 8 ? 1 : baitCount >= 4 ? 2 : baitCount ? 3 : 4
  if (includesAny(text, ['警惕', '谨慎', '轻口', '试探', '专食'])) feeding = Math.min(5, feeding + 1)
  const gear = includesAny(text, ['电动轮', '探鱼器', '声呐', '重铅', '深海钓', '拖钓']) ? 5 : includesAny(text, ['铁板', '路亚', '飞蝇', '筏钓', '矶钓', '重型']) ? 4 : includesAny(text, ['耐磨', '粗线', '大钩', '多竿']) ? 3 : 2
  const length = firstNumber(fish.fields?.体长)
  const weight = firstNumber(fish.fields?.体重)
  let force = weight >= 50 || length >= 200 ? 5 : weight >= 10 || length >= 100 ? 4 : weight >= 3 || length >= 60 ? 3 : 2
  if (includesAny(text, ['鲨', '巨型', '攻击性', '高速', '狂暴'])) force = Math.min(5, force + 1)
  const level = Math.max(1, Math.min(5, Math.round((access + habitat + feeding + gear + force) / 5)))
  return { level, label: labels[level - 1] }
}
