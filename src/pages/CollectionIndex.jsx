import { ArrowRight, ImageOff } from 'lucide-react'
import { Link, NavLink, useParams } from 'react-router-dom'
import MuseumHeader from '../components/MuseumHeader.jsx'
import { imageUrl } from '../lib/content.js'

const TYPES = [
  ['species', '鱼类'],
  ['objects', '器物'],
  ['techniques', '技法'],
  ['people', '人物'],
  ['works', '作品'],
  ['folklore', '行话与玄学'],
]

export default function CollectionIndex({ collections, images }) {
  const { type = 'species' } = useParams()
  const imageMap = new Map(images.map((image) => [image.id, image]))
  const items = collections.filter((item) => item.collection_type === type)
  const label = TYPES.find(([value]) => value === type)?.[1] ?? type

  return (
    <div className="collection-page">
      <MuseumHeader />
      <header className="collection-header">
        <div>
          <h1>开放馆藏</h1>
          <p>所有条目保留完整正文、来源、图片权利和审核状态。</p>
        </div>
        <strong>{items.length} 件{label}馆藏</strong>
      </header>
      <nav className="collection-tabs" aria-label="馆藏分类">
        {TYPES.map(([value, text]) => (
          <NavLink key={value} to={`/collection/${value}`}>
            {text}
          </NavLink>
        ))}
      </nav>
      <main className="collection-grid">
        {items.map((item) => {
          const image = imageMap.get(item.image_ids[0])
          return (
            <Link to={item.url} className="collection-card" key={item.id}>
              <div className="collection-image">
                {image ? (
                  <img src={imageUrl(image)} alt={image.title} loading="lazy" />
                ) : (
                  <ImageOff aria-label="图片待补" />
                )}
              </div>
              <div>
                <h2>{item.title}</h2>
                <p>{item.metadata.scientific_name || item.metadata.object_type || item.metadata.category}</p>
              </div>
              <ArrowRight aria-hidden="true" />
            </Link>
          )
        })}
      </main>
    </div>
  )
}

