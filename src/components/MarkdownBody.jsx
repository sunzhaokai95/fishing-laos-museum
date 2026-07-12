import { marked } from 'marked'
import { useMemo } from 'react'
import { rewriteAssetPaths, rewriteEditorialTerms } from '../lib/content.js'

marked.setOptions({ gfm: true, breaks: false })

export default function MarkdownBody({ markdown, sourceFile }) {
  const html = useMemo(
    () => marked.parse(rewriteEditorialTerms(rewriteAssetPaths(markdown, sourceFile))),
    [markdown, sourceFile],
  )
  return <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
}
