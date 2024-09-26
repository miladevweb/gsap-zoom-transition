import { Hero, About, Sticky, Footer } from './_components'

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Sticky />
      <Footer />
    </>
  )
}

export const metadata = {
  title: 'GSAP Transitions | Just Mila',
}
