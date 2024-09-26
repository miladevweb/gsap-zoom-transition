import { GET_IMAGE } from '@/constants'

export default function Hero() {
  return (
    <section
      style={{ backgroundImage: `url(${GET_IMAGE(1).url})` }}
      className="p-16 flex flex-col items-center justify-between bg-cover bg-center sm:bg-top"
    >
      <h1 className="text-[15vw]">Genesis</h1>

      <p className="w-1/2 text-center">A new beginning for the web with Smooth Scrolling and GSAP</p>
    </section>
  )
}
