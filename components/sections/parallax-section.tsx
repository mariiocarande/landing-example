"use client"

import { useRef, useEffect, type MutableRefObject } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import type Lenis from "@studio-freight/lenis"

interface ParallaxSectionProps {
  lenis: MutableRefObject<Lenis | null>
}

export default function ParallaxSection({ lenis }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const layersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Parallax title animation
      gsap.fromTo(
        titleRef.current,
        { y: 0 },
        {
          y: -100,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      )

      // Parallax layers animation
      const layers = gsap.utils.toArray(".parallax-layer")
      layers.forEach((layer, index) => {
        const depth = index * 0.2 // Different depths for each layer

        gsap.fromTo(
          layer,
          { y: 0 },
          {
            y: -100 * (index + 1), // Each layer moves at different speeds
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [lenis])

  return (
    <section
      ref={sectionRef}
      className="relative h-[150vh] flex items-center justify-center overflow-hidden bg-black"
      data-lenis-scroll-snap-align="start"
    >
      {/* Parallax Background Layers */}
      <div ref={layersRef} className="absolute inset-0 w-full h-full">
        <div className="parallax-layer absolute inset-0 w-full h-full opacity-20">
          <Image src="/abstract-lines-pattern.png" alt="Parallax Layer 1" fill className="object-cover" />
        </div>

        <div className="parallax-layer absolute inset-0 w-full h-full opacity-30">
          <Image src="/particles-network-background.png" alt="Parallax Layer 2" fill className="object-cover" />
        </div>

        <div className="parallax-layer absolute inset-0 w-full h-full opacity-40">
          <Image src="/digital-waves-background.png" alt="Parallax Layer 3" fill className="object-cover" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="container px-4 relative z-10 text-center">
        <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
          <span className="block">Award-Winning</span>
          <span className="text-emerald-400">Digital Experiences</span>
        </h2>

        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
          Our team of experts has created immersive websites for leading brands across industries
        </p>

        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg">
            <p className="text-4xl font-bold text-emerald-400">50+</p>
            <p className="text-white">Projects Completed</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg">
            <p className="text-4xl font-bold text-emerald-400">12</p>
            <p className="text-white">Design Awards</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-lg">
            <p className="text-4xl font-bold text-emerald-400">98%</p>
            <p className="text-white">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  )
}
