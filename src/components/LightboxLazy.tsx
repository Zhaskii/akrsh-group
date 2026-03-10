'use client'

import React, { useEffect, useState } from 'react'

type Slide = { src: string; alt?: string; download?: string }

type LightboxLazyProps = {
  open: boolean
  index: number
  onClose: () => void
  slides: Slide[]
  zoom?: { maxZoomPixelRatio?: number }
  slideshow?: { autoplay?: boolean; delay?: number }
  pluginSet?: 'minimal' | 'full'
}

export default function LightboxLazy({
  open,
  index,
  onClose,
  slides,
  zoom = { maxZoomPixelRatio: 3 },
  slideshow = { autoplay: false, delay: 3000 },
  pluginSet = 'full',
}: LightboxLazyProps) {
  const [ready, setReady] = useState(false)
  const [Lightbox, setLightbox] = useState<React.ComponentType<any> | null>(null)
  const [plugins, setPlugins] = useState<any[]>([])

  useEffect(() => {
    if (!open) return
    if (ready && Lightbox) return

    const load = async () => {
      const [lbMod, zoomMod, downloadMod, thumbMod] = await Promise.all([
        import('yet-another-react-lightbox'),
        import('yet-another-react-lightbox/plugins/zoom'),
        import('yet-another-react-lightbox/plugins/download'),
        import('yet-another-react-lightbox/plugins/thumbnails'),
        // @ts-expect-error - CSS import has no type declarations
        import('yet-another-react-lightbox/styles.css'),
        // @ts-expect-error - CSS import has no type declarations
        import('yet-another-react-lightbox/plugins/thumbnails.css'),
      ])

      const basePlugins = [zoomMod.default, downloadMod.default, thumbMod.default]

      if (pluginSet === 'full') {
        const [slideshowMod, fullscreenMod] = await Promise.all([
          import('yet-another-react-lightbox/plugins/slideshow'),
          import('yet-another-react-lightbox/plugins/fullscreen'),
        ])
        setPlugins([...basePlugins, slideshowMod.default, fullscreenMod.default])
      } else {
        setPlugins(basePlugins)
      }

      setLightbox(() => lbMod.default)
      setReady(true)
    }

    load()
  }, [open, pluginSet, ready, Lightbox])

  if (!open) return null
  if (!ready || !Lightbox) {
    return (
      <div
        className="fixed inset-0 bg-black/80 flex items-center justify-center"
        style={{ zIndex: 9999 }}
        onClick={onClose}
        role="dialog"
        aria-label="Loading gallery"
      >
        <div className="w-12 h-12 rounded-full border-4 border-white/30 border-t-white animate-spin" />
      </div>
    )
  }

  return (
    <Lightbox
      index={index}
      open={open}
      close={onClose}
      slides={slides}
      plugins={plugins}
      zoom={zoom}
      slideshow={pluginSet === 'full' ? slideshow : undefined}
    />
  )
}
