"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="container px-4 max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <Image src="/company-logo.png" alt="ScrollWave Studio" width={40} height={40} className="mr-2" />
            <span className={`font-bold text-xl ${isScrolled ? "text-slate-900 dark:text-white" : "text-white"}`}>
              ScrollWave
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#home" label="Home" isScrolled={isScrolled} />
            <NavLink href="#features" label="Services" isScrolled={isScrolled} />
            <NavLink href="#portfolio" label="Work" isScrolled={isScrolled} />
            <NavLink href="#about" label="About" isScrolled={isScrolled} />
            <NavLink href="#contact" label="Contact" isScrolled={isScrolled} />
            <Button
              className={`rounded-full px-6 ${
                isScrolled
                  ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                  : "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
              }`}
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${isScrolled ? "text-slate-900 dark:text-white" : "text-white"}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900 z-50 flex flex-col">
          <div className="container px-4 py-5 flex justify-between items-center">
            <div className="flex items-center">
              <Image src="/company-logo.png" alt="ScrollWave Studio" width={40} height={40} className="mr-2" />
              <span className="font-bold text-xl text-white">ScrollWave</span>
            </div>
            <button className="text-white" onClick={toggleMobileMenu} aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
            <MobileNavLink href="#home" label="Home" onClick={toggleMobileMenu} />
            <MobileNavLink href="#features" label="Services" onClick={toggleMobileMenu} />
            <MobileNavLink href="#portfolio" label="Work" onClick={toggleMobileMenu} />
            <MobileNavLink href="#about" label="About" onClick={toggleMobileMenu} />
            <MobileNavLink href="#contact" label="Contact" onClick={toggleMobileMenu} />
            <Button className="rounded-full px-8 py-6 mt-4 bg-emerald-500 hover:bg-emerald-600 text-white text-lg">
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </>
  )
}

function NavLink({ href, label, isScrolled }: { href: string; label: string; isScrolled: boolean }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Get the target element
    const targetId = href.replace("#", "")
    if (!targetId) return // If it's just "#", don't do anything

    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Access the Lenis instance from window
      const lenis = (window as any).lenis
      if (lenis) {
        lenis.scrollTo(targetElement)
      } else {
        // Fallback to regular scrolling if Lenis is not available
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`font-medium hover:text-emerald-500 transition-colors ${
        isScrolled ? "text-slate-700 dark:text-gray-200" : "text-white"
      }`}
    >
      {label}
    </a>
  )
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    // Close the mobile menu
    onClick()

    // Get the target element
    const targetId = href.replace("#", "")
    if (!targetId) return // If it's just "#", don't do anything

    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      // Access the Lenis instance from window
      const lenis = (window as any).lenis
      if (lenis) {
        lenis.scrollTo(targetElement)
      } else {
        // Fallback to regular scrolling if Lenis is not available
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-white text-2xl font-medium hover:text-emerald-500 transition-colors"
    >
      {label}
    </a>
  )
}
