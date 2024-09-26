import Image from 'next/image'
import { GET_IMAGE } from '@/constants'

export default function About() {
  const { label, url } = GET_IMAGE(2)

  return (
    <section className="py-16 lg:px-48 px-4 flex justify-center items-center lg:gap-40 bg-amber-500">
      <picture className="flex-1 h-3/4 border-2 border-black">
        <Image
          src={url}
          alt={label}
          fill
          priority
          sizes="(max-width: 640px) 70vw, 90vw"
        />
      </picture>

      <div className="flex-1">
        <h1 className="text-center text-[10vw] sm:text-[8vw] text-[#263130]">Have fun with Smooth Scrolling by Lenis</h1>
      </div>
    </section>
  )
}
