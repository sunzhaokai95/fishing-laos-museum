import EvidenceRail from '../components/EvidenceRail.jsx'
import MarkdownBody from '../components/MarkdownBody.jsx'
import MuseumHeader from '../components/MuseumHeader.jsx'
import RoutePager from '../components/RoutePager.jsx'
import RouteProgress from '../components/RouteProgress.jsx'
import { galleryKicker, galleryStage } from '../lib/content.js'

export default function RoutePage({ page, routes, images, sources }) {
  const previous = routes.find((route) => route.url === page.previous_url)
  const next = routes.find((route) => route.url === page.next_url)
  const stage = galleryStage(page)

  return (
    <div className="route-page">
      <MuseumHeader />
      <RouteProgress currentStage={stage} />
      <header className="gallery-banner">
        <div className="banner-copy">
          <span>{galleryKicker(page)}</span>
          <h1>{page.title}</h1>
          <p>{page.summary}</p>
        </div>
      </header>
      <main className="reading-layout">
        <article>
          <MarkdownBody markdown={page.body_markdown} sourceFile={page.source_file} />
        </article>
        <EvidenceRail page={page} images={images} sources={sources} />
      </main>
      <RoutePager previous={previous} next={next} />
    </div>
  )
}
