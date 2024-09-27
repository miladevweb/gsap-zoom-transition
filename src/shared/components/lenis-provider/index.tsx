'use client'
import { ReactNode, useEffect } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'

export default function LenisProvider({ children }: { children: ReactNode }) {
  const lenis = useLenis()

  useEffect(() => {
    if (lenis) lenis.scrollTo(0)
  }, [lenis])

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        smoothWheel: true,
        wheelMultiplier: 1.2,
        touchMultiplier: 0.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  )
}
