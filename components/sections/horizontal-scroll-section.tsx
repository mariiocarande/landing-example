"use client"

import { useRef, useEffect, type MutableRefObject } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import type Lenis from "@studio-freight/lenis"

interface HorizontalScrollSectionProps {
  lenis: MutableRefObject<Lenis | null>
}

const projects = [
  {
    title: "Nebula Fashion",
    category: "E-commerce Redesign",
    image: "/portfolio-fashion-website.png",
    description: "Complete redesign of a luxury fashion brand's online store with custom animations and checkout flow.",
  },
  {
    title: "EcoTech Solutions",
    category: "Corporate Website",
    image: "/portfolio-corporate-website.png",
    description:
      "Modern corporate website for a sustainable technology company featuring interactive data visualizations.",
  },
  {
    title: "Pulse Fitness App",
    category: "Mobile Application",
    image: "/portfolio-fitness-app.png",
    description: "Fitness tracking application with custom workout plans and progress visualization.",
  },
  {
    title: "Artisan Cafe",
    category: "Branding & Website",
    image: "/portfolio-cafe-website.png",
    description: "Complete brand identity and website design for an upscale urban cafe chain.",
  },
  {
    title: "Immerse VR Experience",
    category: "Interactive Design",
    image: "/portfolio-vr-experience.png",
    description: "Virtual reality product showcase for a tech company's latest innovations.",
  },
]

export default function HorizontalScrollSection({ lenis }: HorizontalScrollSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Calculate the horizontal scroll width
      const items = horizontalRef.current?.querySelectorAll(".scroll-item")
      if (!items || !horizontalRef.current) return

      const totalWidth = Array.from(items).reduce((acc, item) => {
        return acc + (item as HTMLElement).offsetWidth
      }, 0)

      horizontalRef.current.style.width = `${totalWidth}px`

      // Create the horizontal scroll effect
      gsap.to(horizontalRef.current, {
        x: () => -(totalWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1,
          invalidateOnRefresh: true,
          markers: false,
        },
      })

      // Items fade in as they enter the viewport
      items.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0.3, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: item,
              containerAnimation: ScrollTrigger.getById("horizontal-scroll"),
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [lenis])

  return (
    <section ref={sectionRef} className="bg-slate-100 dark:bg-slate-800 relative">
      <div ref={triggerRef} className="h-screen w-full overflow-hidden">
        <div className="absolute top-0 left-0 py-10 px-4 z-10">
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white">Horizontal Scrolling Gallery</h2>
          <p className="text-gray-600 dark:text-gray-300">Showcase your work with smooth horizontal navigation</p>
        </div>

        <div ref={horizontalRef} className="absolute top-0 left-0 h-full flex items-center pl-[20vw] pt-24 pb-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="scroll-item h-[60vh] w-[65vw] min-w-[500px] p-10 mr-10 flex flex-col justify-end rounded-xl overflow-hidden relative"
            >
              <div className="absolute inset-0">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>

              <div className="relative z-10 text-white">
                <span className="text-emerald-400 text-sm mb-2 inline-block">{project.category}</span>
                <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                <p className="mb-6">{project.description}</p>
                <button className="px-6 py-2 rounded-full border border-white hover:bg-white hover:text-black transition-colors duration-300">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
