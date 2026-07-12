export default function OptionalImage({ src, alt, ...props }) {
  if (!src) return null
  return <img src={src} alt={alt || ''} {...props} />
}
