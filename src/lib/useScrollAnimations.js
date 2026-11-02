import { useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from 'motion/react'

const revealTargets = [
  '.reveal',
  '.page-hero > .eyebrow',
  '.page-hero > h1',
  '.page-hero > p',
  '.education-globe-band > div:first-child',
  '.environment-copy',
  '.learning-note > .eyebrow',
  '.learning-note > h2',
  '.learning-note > p',
  '.learning-note > .button',
  '.calculator-form > *',
  '.calculator-result',
  '.methodology > .eyebrow',
  '.methodology > h2',
  '.methodology-footnote',
  '.methodology > .text-link',
  '.quiz-wrap > *',
  '.article-filters',
  '.empty-search',
  '.article-catalog-source',
  '.article-detail-header > *',
  '.article-detail > .article-art',
  '.article-body > p',
  '.article-body > .article-action',
  '.article-body > .article-sources',
  '.related-articles > *',
  '.not-found > *',
].join(', ')

const staggerTargets = [
  '.reveal-stagger',
  '.education-topic-list',
  '.cause-list',
  '.methodology-content',
  '.methodology-sources',
  '.source-links',
  '.article-preview-grid',
  '.article-catalog-grid',
  '.article-body > section',
].join(', ')

export function useScrollAnimations(scopeRef) {
  const reducedMotion = useReducedMotion()

  useLayoutEffect(() => {
    const scope = scopeRef.current
    if (reducedMotion || !scope || typeof window.matchMedia !== 'function') return undefined
    gsap.registerPlugin(ScrollTrigger)

    const context = gsap.context(() => {
      gsap.utils.toArray(revealTargets).forEach((element) => {
        gsap.fromTo(element, { y: 24, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray(staggerTargets).forEach((element) => {
        const children = [...element.children].filter((child) => !child.matches('.cta-orb, .cta-index, .quiz-decoration'))
        if (!children.length) return
        gsap.fromTo(children, { y: 20, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray('.reveal-scale, .environment-visual').forEach((element) => {
        gsap.fromTo(element, { y: 18, scale: 0.96, opacity: 0 }, {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray('.art-line').forEach((element) => {
        gsap.fromTo(element, { scaleX: 0 }, {
          scaleX: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: element, start: 'top 88%', once: true },
        })
      })

      gsap.utils.toArray('.intro-art .sun-disc, .impact-visual .heat-ring').forEach((element) => {
        const trigger = element.closest('.intro-art, .impact-visual')
        gsap.to(element, {
          y: -18,
          ease: 'none',
          scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        })
      })
    }, scope)

    return () => context.revert()
  }, [scopeRef, reducedMotion])
}
