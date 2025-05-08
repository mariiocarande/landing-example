"use client"

import { useEffect, useRef } from "react"
import Lenis from "@studio-freight/lenis"
import { useWindowSize } from "@/hooks/use-window-size"
import HeroSection from "@/components/sections/hero-section"
import FeaturesSection from "@/components/sections/features-section"
import ParallaxSection from "@/components/sections/parallax-section"
import HorizontalScrollSection from "@/components/sections/horizontal-scroll-section"
import TestimonialsSection from "@/components/sections/testimonials-section"
import ContactSection from "@/components/sections/contact-section"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ClientsSection from "@/components/sections/clients-section"

export default function LandingPage() {
  const lenisRef = useRef<Lenis | null>(null)
  const { width } = useWindowSize()

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    // Create Lenis instance with options
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    // Make Lenis globally available for the navbar
    ;(window as any).lenis = lenisRef.current

    // This function will be called on each animation frame
    function raf(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }

    // Start the animation loop
    requestAnimationFrame(raf)

    return () => {
      // Cleanup when component unmounts
      ;(window as any).lenis = null
      lenisRef.current?.destroy()
    }
  }, [])

  // Update Lenis when window size changes
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.resize()
    }
  }, [width])

  return (
    <div data-lenis-scroll className="relative">
      <Navbar />
      <div id="home">
        <HeroSection lenis={lenisRef} companyName="ScrollWave" />
      </div>
      <div id="features">
        <FeaturesSection lenis={lenisRef} />
      </div>
      <ClientsSection />
      <div id="about">
        <ParallaxSection lenis={lenisRef} />
      </div>
      <div id="portfolio">
        <HorizontalScrollSection lenis={lenisRef} />
      </div>
      <TestimonialsSection />
      <div id="contact">
        <ContactSection />
      </div>
      <Footer />
    </div>
  )
}
