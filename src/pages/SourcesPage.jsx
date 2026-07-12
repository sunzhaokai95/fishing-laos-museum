import MuseumHeader from '../components/MuseumHeader.jsx'

export default function SourcesPage({ sources }) {
  return (
    <div className="sources-page">
      <MuseumHeader />
      <main>
        <header>
          <h1>研究与来源</h1>
          <p>来源等级说明材料性质和使用边界，不把聚合资料伪装成权威结论。</p>
        </header>
        <div className="source-register">
          {sources.map((source) => (
            <article key={source.id} id={source.id}>
              <div>
                <strong>{source.id}</strong>
                <span>{source.level}</span>
              </div>
              <h2>{source.title}</h2>
              {source.url ? (
                <a href={source.url} target="_blank" rel="noreferrer">
                  查看原始来源
                </a>
              ) : (
                <span>本地研究资料</span>
              )}
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}

