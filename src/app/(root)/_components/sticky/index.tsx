'use client'
import Image from 'next/image'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { GET_IMAGE } from '@/constants'
import styles from './index.module.css'

const image1 = GET_IMAGE(3)
const image2 = GET_IMAGE(4)
const image3 = GET_IMAGE(5)
const sizes = '(max-width: 640px) 70vw, 90vw'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export default function Sticky() {
  const containerRef = useRef<HTMLElement>(null!)

  const createParagraphAnimation = (paragraphs: HTMLParagraphElement[]) => {
    paragraphs.forEach((paragraph) => {
      const text = paragraph.textContent!

      paragraph.innerHTML = text
        .split(/(\s+)/)
        .map((part) => {
          if (part.trim() === '') return part
          else
            return part
              .split('')
              .map((char) => `<span class="opacity-0 inline-block ">${char}</span>`)
              .join('')
        })
        .join('')
    })
  }

  const flickerAnimation = (targets: string, toOpacity: number) => {
    gsap.to(targets, {
      opacity: toOpacity,
      duration: 0.5,
      stagger: {
        amount: 0.3,
        from: 'random',
      },
    })
  }

  useGSAP(
    () => {
      // Paragraphs
      const introParagraphs = gsap.utils.toArray('.intro-col p') as unknown as HTMLParagraphElement[]
      createParagraphAnimation(introParagraphs)

      // Global ScrollTrigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `${window.innerHeight * 3}`,
        onEnter: () => flickerAnimation('.intro-col p span', 1),
        onLeave: () => flickerAnimation('.intro-col p span', 0),
        onEnterBack: () => flickerAnimation('.intro-col p span', 1),
        onLeaveBack: () => flickerAnimation('.intro-col p span', 0),
      })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 4}`, // totalStickyHeight
        pin: true,
        pinSpacing: true,
      })

      // Image Animations
      gsap.to('.img1 img', {
        scale: 1.125,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          scrub: true,
        },
      })

      gsap.to('.img2', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'none',

        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          scrub: true,

          onUpdate: (self) => {
            const { progress } = self

            gsap.set('.img2', {
              clipPath: `polygon(
                ${gsap.utils.interpolate(40, 0, progress)}% ${gsap.utils.interpolate(25, 0, progress)}%,
                ${gsap.utils.interpolate(60, 100, progress)}% ${gsap.utils.interpolate(25, 0, progress)}%,
                ${gsap.utils.interpolate(60, 100, progress)}% ${gsap.utils.interpolate(75, 100, progress)}%,
                ${gsap.utils.interpolate(40, 0, progress)}% ${gsap.utils.interpolate(75, 100, progress)}%,
              )`,
            })
          },
        },
      })

      gsap.to('.img2 img', {
        scale: 1.125,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight}`,
          scrub: true,
        },
      })

      gsap.to('.img3', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: `${window.innerHeight * 3}`,
          end: `${window.innerHeight * 4}`,
          scrub: true,

          onUpdate: (self) => {
            const { progress } = self

            gsap.set('.img3', {
              clipPath: `polygon(
                ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(50, 0, progress)}%,
                ${gsap.utils.interpolate(50, 100, progress)}% ${gsap.utils.interpolate(50, 0, progress)}%,
                ${gsap.utils.interpolate(50, 100, progress)}% ${gsap.utils.interpolate(50, 100, progress)}%,
                ${gsap.utils.interpolate(50, 0, progress)}% ${gsap.utils.interpolate(50, 100, progress)}%,
              )`,
            })
          },
        },
      })

      gsap.fromTo(
        '.img2 img',
        {
          scale: 1.125,
        },
        {
          scale: 1.25,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: () => `${window.innerHeight * 3}`,
            end: () => `${window.innerHeight * 4}`,
            scrub: true,
          },
        },
      )

      gsap.to('.img3 img', {
        scale: 2.9,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => `${window.innerHeight * 3}`,
          end: () => `${window.innerHeight * 4}`,
          scrub: true,
        },
      })

      gsap.fromTo(
        '.img3 img',
        {
          scale: 2.9,
        },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: () => `${window.innerHeight * 4}`,
            end: () => `${window.innerHeight * 6}`,
            scrub: true,
          },
        },
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => `${window.innerHeight * 4.5}`,
          end: () => `${window.innerHeight * 5.5}`,
          scrub: true,
          toggleActions: 'play reverse play reverse',
        },
      })

      tl.to('.copy', {
        display: 'block',
        rotateY: 0,
        scale: 1,
        duration: 1,
      })
    },

    { dependencies: [], scope: containerRef.current },
  )

  return (
    <section
      ref={containerRef}
      className="relative [&_picture]:size-full"
      style={{ perspective: '1000px' }}
    >
      <div className="absolute top-1/2 -translate-y-1/2 w-full p-4 flex z-[2]">
        <div className="intro-col flex-1 flex [&>p]:flex-1">
          <p>Enjoy with us</p>
          <p>This new experience</p>
        </div>

        <div className="intro-col flex-1 flex [&>p]:flex-1">
          <p className="text-right">Let&apos;s just scroll</p>
        </div>
      </div>

      <picture className={`${styles.imgContainer} img1`}>
        <Image
          src={image1.url}
          alt={image1.label}
          //
          fill
          priority
          sizes={sizes}
        />
      </picture>

      <picture
        className={`${styles.imgContainer} img2`}
        style={{ clipPath: 'polygon(40% 25%, 60% 25%, 60% 75%, 40% 75%)' }}
      >
        <Image
          src={image2.url}
          alt={image2.label}
          fill
          priority
          sizes={sizes}
        />
      </picture>

      <picture
        className={`${styles.imgContainer} img3`}
        style={{ clipPath: 'polygon(50% 25%, 50% 25%, 50% 75%, 50% 75%)' }}
      >
        <Image
          src={image3.url}
          alt={image3.label}
          fill
          priority
          sizes={sizes}
          className="origin-top-right scale-[3]"
        />
      </picture>

      <div
        className="copy lg:w-1/2 w-full absolute top-1/2 left-1/2 origin-bottom-left hidden"
        style={{ transform: 'translateX(-50%) translateY(-50%) rotateY(-75deg) scale(50%)' }}
      >
        <h1 className="text-center ">A new way to create websites</h1>
      </div>
    </section>
  )
}
