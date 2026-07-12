export const HISTORICAL_OBJECT_IDS = [
  'object-bone-straight-hook',
  'object-early-metal-hook',
  'object-ancient-fishing-wheel',
]

export function timelineImageId(imageText = '') {
  return imageText.match(/IMG-HIS-\d+/)?.[0] ?? null
}
