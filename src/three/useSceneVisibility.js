import { useEffect, useState } from 'react'

export function useSceneVisibility(ref) {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window)) return undefined
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '100px' })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return visible
}
