"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

const clients = [
  { name: "Paratech", logo: "/client-1.jpg" },
  { name: "Olmonin", logo: "/client-2.jpg" },
  { name: "Renovatech", logo: "/client-3.jpg" },
  { name: "Ilutions", logo: "/client-4.jpg" },
  { name: "Yold", logo: "/client-5.jpg" },
  { name: "Eticma", logo: "/client-6.jpg" },
]

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const clientsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Fade in animation for the section
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        },
      )

      // Staggered animation for client logos
      gsap.fromTo(
        ".client-logo",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: clientsRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 bg-slate-50 dark:bg-slate-900/50" data-lenis-scroll-snap-align="start">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">Trusted by Industry Leaders</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We've partnered with forward-thinking companies to create exceptional digital experiences
          </p>
        </div>

        <div
          ref={clientsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center"
        >
          {clients.map((client, index) => (
            <div key={index} className="client-logo w-32 h-32 relative flex items-center justify-center">
              <Image
                src={client.logo || "/placeholder.svg"}
                alt={client.name}
                width={100}
                height={100}
                className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
