import { ArrowLeft, CircleAlert, ImageOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import MarkdownBody from '../components/MarkdownBody.jsx'
import MuseumHeader from '../components/MuseumHeader.jsx'
import { cleanInlineText, imageUrl, publicationLabel } from '../lib/content.js'

const COLLECTION_LABELS = {
  species: '鱼类藏品',
  tackle: '渔具藏品',
}

export default function CollectionDetail({ item, images, sources }) {
  const imageMap = new Map(images.map((image) => [image.id, image]))
  const sourceMap = new Map(sources.map((source) => [source.id, source]))
  const image = imageMap.get(item.image_ids[0])

  return (
    <div className="collection-detail-page">
      <MuseumHeader />
      <main className="collection-detail">
        <Link className="back-link" to={`/collection/${item.collection_type}`}>
          <ArrowLeft aria-hidden="true" /> 返回{item.collection_type === 'species' ? '鱼类' : ''}馆藏
        </Link>
        <header>
          <div>
            <span>{COLLECTION_LABELS[item.collection_type] ?? '馆藏对象'}</span>
            <h1>{item.title}</h1>
            {item.metadata.scientific_name ? <p>{item.metadata.scientific_name}</p> : null}
          </div>
          <div className="status-line">
            <CircleAlert size={18} /> 内容预览 · 尚未发布
          </div>
        </header>
        <div className="collection-detail-layout">
          <aside className="collection-object-view">
            {image ? (
              <figure>
                <img src={imageUrl(image)} alt={cleanInlineText(image.title)} />
                <figcaption>
                  {cleanInlineText(image.title)}
                  <span>{publicationLabel(image.rights_status)}</span>
                </figcaption>
              </figure>
            ) : (
              <div className="missing-object-image">
                <ImageOff size={32} />
                <p>对象图片待补，不使用商品图或无来源图片。</p>
              </div>
            )}
            <section className="detail-sources">
              <h2>来源</h2>
              {item.source_ids.map((id) => (
                <Link key={id} to={`/sources#${id}`}>
                  <strong>{id}</strong>
                  <span>{sourceMap.get(id)?.title}</span>
                </Link>
              ))}
            </section>
          </aside>
          <article>
            <MarkdownBody markdown={item.body_markdown} sourceFile={item.source_file} />
          </article>
        </div>
      </main>
    </div>
  )
}
