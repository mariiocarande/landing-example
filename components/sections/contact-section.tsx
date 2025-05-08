"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone } from "lucide-react"

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Form animation
      gsap.fromTo(
        formRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: formRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        },
      )

      // Info animation
      gsap.fromTo(
        infoRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        },
      )

      // Contact items animation
      const contactItems = gsap.utils.toArray(".contact-item")
      gsap.fromTo(
        contactItems,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top bottom-=50",
            toggleActions: "play none none none",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-gray-50 dark:bg-slate-800" data-lenis-scroll-snap-align="start">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Get In Touch</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to transform your digital experience? Let's discuss how ScrollWave can elevate your next project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form ref={formRef} className="space-y-6 bg-white dark:bg-slate-900 p-8 rounded-xl shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Name
                </label>
                <Input id="name" placeholder="Your name" className="w-full" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email
                </label>
                <Input id="email" type="email" placeholder="Your email" className="w-full" />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <Input id="subject" placeholder="How can we help?" className="w-full" />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <Textarea id="message" placeholder="Your message" className="w-full min-h-[150px]" />
            </div>

            <Button className="w-full bg-emerald-500 hover:bg-emerald-600">Send Message</Button>
          </form>

          <div ref={infoRef} className="space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-md mb-8">
              <h3 className="text-xl font-bold mb-6 dark:text-white">Contact Information</h3>

              <div className="space-y-6">
                <div className="contact-item flex items-start">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-4">
                    <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">Email</h4>
                    <p className="text-gray-600 dark:text-gray-300">hello@scrollwave.studio</p>
                  </div>
                </div>

                <div className="contact-item flex items-start">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-4">
                    <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">Phone</h4>
                    <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="contact-item flex items-start">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-4">
                    <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-medium dark:text-white">Location</h4>
                    <p className="text-gray-600 dark:text-gray-300">88 Digital Avenue, San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Hours</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Monday - Friday</span>
                  <span className="font-medium dark:text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Saturday</span>
                  <span className="font-medium dark:text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Sunday</span>
                  <span className="font-medium dark:text-white">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
