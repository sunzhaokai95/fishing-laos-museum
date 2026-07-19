export default function CollectionStage({
  label,
  eyebrow,
  caption,
  controls,
  children,
  className = '',
  style,
  testId,
  activeIndex,
}) {
  return (
    <div
      className={`collection-stage ${className}`}
      style={style}
      data-testid={testId}
      data-active-index={activeIndex}
    >
      <div className="collection-stage-grain" aria-hidden="true" />
      <div className="collection-stage-ghost" aria-hidden="true">{label}</div>
      {eyebrow ? <div className="collection-stage-eyebrow">{eyebrow}</div> : null}
      <div className="collection-stage-objects">{children}</div>
      {caption ? <div className="collection-stage-caption" aria-live="polite">{caption}</div> : null}
      {controls ? <div className="collection-stage-controls">{controls}</div> : null}
    </div>
  )
}
