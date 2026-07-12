import { ArrowDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import MuseumHeader from '../components/MuseumHeader.jsx'
import { HALLS } from '../data/halls.js'
import { cleanInlineText, firstHeading, imageUrl, introParagraphs } from '../lib/content.js'

const FEATURED_SPECIES = [
  'species-crucian-carp',
  'species-common-carp',
  'species-grass-carp',
]

export default function HomePage({ page, collections, images }) {
  const galleries = HALLS.slice(1, 8)
  const imageMap = new Map(images.map((image) => [image.id, image]))
  const collectionMap = new Map(collections.map((item) => [item.id, item]))
  const featured = FEATURED_SPECIES.map((id) => collectionMap.get(id)).filter(Boolean)
  const paragraphs = introParagraphs(page.body_markdown, 2)

  return (
    <div className="home-page">
      <section className="home-hero">
        <MuseumHeader overlay />
        <div className="hero-content">
          <h1>{firstHeading(page.body_markdown) || '水面之上，水面之下'}</h1>
          <div className="hero-copy">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Link className="primary-entry" to="/visit/prologue">
            进入博物馆 <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <a className="scroll-cue" href="#route-overview" aria-label="查看展览概览">
          <span>向下探索</span>
          <ArrowDown size={18} aria-hidden="true" />
        </a>
      </section>

      <section className="route-overview" id="route-overview">
        <div className="section-heading">
          <h2>一根线牵起万千故事</h2>
          <p>沿唯一参观路线，从钓的历史走到水边责任。每一厅都由真实材料、图像和仍然存在的问题构成。</p>
        </div>
        <ol className="gallery-list">
          {galleries.map((gallery, index) => (
            <li key={gallery.id}>
              <Link to={gallery.url}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{gallery.title}</strong>
                <p>{gallery.summary}</p>
                <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="featured-collection">
        <div className="section-heading compact">
          <h2>开放馆藏</h2>
          <Link to="/visit/fish">查看806种鱼类标本</Link>
        </div>
        <div className="featured-grid">
          {featured.map((item) => {
            const image = imageMap.get(item.image_ids[0])
            return (
              <Link className="collection-card" to="/visit/fish" key={item.id}>
                <div className="collection-image">
                  {image ? (
                    <img src={imageUrl(image)} alt={cleanInlineText(image.title)} />
                  ) : null}
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.metadata.scientific_name}</p>
                </div>
                <ArrowRight aria-hidden="true" />
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
