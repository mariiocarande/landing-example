"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { User, Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Marketing Director at TechVision",
    company: "TechVision Inc.",
    quote:
      "ScrollWave transformed our digital presence with their innovative scrolling effects. Our engagement metrics have increased by 45% since the redesign, and users are spending significantly more time exploring our content.",
  },
  {
    name: "Mark Williams",
    title: "Lead Developer",
    company: "Innovate Solutions",
    quote:
      "As a developer, I appreciate the clean code and performance optimization that ScrollWave delivered. Their implementation of Lenis scrolling is the smoothest I've seen, and it integrates perfectly with our existing systems.",
  },
  {
    name: "Jessica Chen",
    title: "Creative Director",
    company: "Artisan Brands",
    quote:
      "The immersive scrolling experience ScrollWave created for our product showcase has completely transformed how our customers interact with our brand. The attention to detail and creative animations exceeded our expectations.",
  },
  {
    name: "David Miller",
    title: "E-commerce Manager",
    company: "Urban Outfitters",
    quote:
      "Our conversion rates have increased by 28% since implementing ScrollWave's custom shopping experience. The smooth transitions and intuitive navigation have significantly reduced cart abandonment and improved overall user satisfaction.",
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        },
      )

      // Testimonial cards staggered animation
      const cards = gsap.utils.toArray(".testimonial-card")
      gsap.fromTo(
        cards,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-grid",
            start: "top bottom-=50",
            toggleActions: "play none none none",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-white dark:bg-slate-900" data-lenis-scroll-snap-align="start">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover how Lenis has transformed scroll experiences for developers and designers
          </p>
        </div>

        <div className="testimonials-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card bg-gray-50 dark:bg-slate-800 p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-bold dark:text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</p>
                  <p className="text-xs text-emerald-500">{testimonial.company}</p>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4">"{testimonial.quote}"</p>

              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
