import { CircleAlert, ImageOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cleanInlineText, imageUrl, publicationLabel } from '../lib/content.js'

const RIGHTS_LABELS = {
  research_candidate: '研究图 · 公开权待核',
  rights_pending: '研究图 · 发布许可待确认',
  generated_reference: '项目示意图',
  licensed: '已授权',
  public_domain: '公版',
}

export default function EvidenceRail({ page, images, sources }) {
  const imageMap = new Map(images.map((image) => [image.id, image]))
  const sourceMap = new Map(sources.map((source) => [source.id, source]))
  const pageImages = page.image_ids.map((id) => imageMap.get(id)).filter(Boolean)

  return (
    <aside className="evidence-rail" aria-label="本页证据与审核状态">
      <div className="preview-notice">
        <CircleAlert size={18} aria-hidden="true" />
        <div>
          <strong>内容预览</strong>
          <span>尚未达到公开发布状态</span>
        </div>
      </div>

      <section>
        <h2>研究图像</h2>
        {pageImages.length ? (
          pageImages.map((image) => (
            <figure key={image.id}>
              {imageUrl(image) ? (
                <img src={imageUrl(image)} alt={cleanInlineText(image.title)} />
              ) : null}
              <figcaption>
                <strong>{cleanInlineText(image.title)}</strong>
                <span>
                  {RIGHTS_LABELS[image.rights_status] ?? publicationLabel(image.rights_status)}
                </span>
                <span>{image.id}</span>
              </figcaption>
            </figure>
          ))
        ) : (
          <div className="missing-visual">
            <ImageOff size={24} aria-hidden="true" />
            <p>本页视觉资料仍在补充，不使用无来源图片占位。</p>
          </div>
        )}
      </section>

      <section className="source-list">
        <h2>本页来源</h2>
        <ol>
          {page.source_ids.map((id) => {
            const source = sourceMap.get(id)
            return (
              <li key={id}>
                <Link to={`/sources#${id}`}>{id}</Link>
                <span>{source?.title ?? '来源待登记'}</span>
              </li>
            )
          })}
        </ol>
      </section>
    </aside>
  )
}
