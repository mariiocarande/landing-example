"use client"

import { useRef, useEffect, type MutableRefObject } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import type Lenis from "@studio-freight/lenis"

interface HeroSectionProps {
  lenis: MutableRefObject<Lenis | null>
  companyName?: string
}

export default function HeroSection({ lenis, companyName = "ScrollWave" }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const scrollDownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Initial animation when page loads
      gsap.fromTo(headingRef.current, { y: 100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" })

      gsap.fromTo(
        subheadingRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" },
      )

      gsap.fromTo(
        buttonRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: "power3.out" },
      )

      // Bouncing scroll down button
      gsap.to(scrollDownRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1,
        ease: "power1.inOut",
      })

      // Parallax effect on scroll for background
      gsap.to(sectionRef.current, {
        backgroundPositionY: "30%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features")
    if (featuresSection && lenis.current) {
      lenis.current.scrollTo(featuresSection)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center bg-gradient-to-b from-black to-slate-900 bg-cover bg-center bg-fixed overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(/placeholder.svg?height=1080&width=1920&query=digital+agency+abstract+background+with+geometric+shapes)`,
      }}
    >
      <div className="container px-4 max-w-6xl text-center z-10">
        <h1 ref={headingRef} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
          <span className="text-emerald-400">{companyName}</span> Smooth Scrolling{" "}
          <span className="text-emerald-400">Studio</span>
        </h1>
        <p ref={subheadingRef} className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Experience effortless navigation with our Lenis-powered landing page that delivers a buttery smooth scrolling
          experience
        </p>
        <div ref={buttonRef}>
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-8 py-6 text-lg"
            onClick={scrollToFeatures}
          >
            Discover More
          </Button>
        </div>
      </div>

      <div
        ref={scrollDownRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
        onClick={scrollToFeatures}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="h-6 w-6 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
