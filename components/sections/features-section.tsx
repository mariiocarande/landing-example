"use client"

import type React from "react"

import { useRef, useEffect, type MutableRefObject } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Zap, Infinity, Layers, Gauge, Sparkles } from "lucide-react"
import type Lenis from "@studio-freight/lenis"

interface FeaturesSectionProps {
  lenis: MutableRefObject<Lenis | null>
}

export default function FeaturesSection({ lenis }: FeaturesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Register lenis as ScrollTrigger's scroll function
      if (lenis.current) {
        ScrollTrigger.scrollerProxy(document.body, {
          scrollTop(value) {
            if (arguments.length) {
              lenis.current?.scrollTo(value || 0)
            }
            return lenis.current?.scroll || 0
          },
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            }
          },
        })
      }

      // Feature cards staggered animation
      const featureCards = gsap.utils.toArray(".feature-card")
      featureCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            y: 100,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
            delay: i * 0.1,
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [lenis])

  return (
    <section
      id="features"
      ref={sectionRef}
      className="py-24 bg-white dark:bg-slate-900"
      data-lenis-scroll-snap-align="start"
    >
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            Why Choose <span className="text-emerald-500">ScrollWave</span>?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We create immersive digital experiences with cutting-edge scrolling animations that captivate your audience
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Gauge className="h-8 w-8 text-emerald-500" />}
            title="Butter-Smooth Scrolling"
            description="Experience responsive, physics-based scrolling that feels natural and intuitive across all devices."
          />

          <FeatureCard
            icon={<Zap className="h-8 w-8 text-emerald-500" />}
            title="High Performance"
            description="Optimized for maximum efficiency, ensuring silky-smooth animations without impacting page load times."
          />

          <FeatureCard
            icon={<Infinity className="h-8 w-8 text-emerald-500" />}
            title="Infinite Scrolling"
            description="Create endless scrolling experiences with built-in support for infinite content loading."
          />

          <FeatureCard
            icon={<Layers className="h-8 w-8 text-emerald-500" />}
            title="Parallax Effects"
            description="Easily implement stunning parallax effects that react naturally to scroll position."
          />

          <FeatureCard
            icon={<Sparkles className="h-8 w-8 text-emerald-500" />}
            title="Custom Animations"
            description="Trigger complex animations based on scroll progress with native GSAP integration."
          />

          <div className="feature-card group relative overflow-hidden rounded-xl p-6 bg-emerald-500 text-white shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold mb-3">Ready to Get Started?</h3>
                <p className="mb-6">Integrate Lenis into your project today and elevate your scrolling experience.</p>
              </div>
              <div className="inline-flex items-center group-hover:translate-x-2 transition-transform duration-300">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="feature-card group relative overflow-hidden rounded-xl p-6 bg-gray-50 dark:bg-slate-800 shadow-md hover:shadow-xl transition duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}
