export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">ScrollWave Studio</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              We create immersive digital experiences with cutting-edge scrolling animations and interactive designs
              that captivate your audience and elevate your brand.
            </p>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} ScrollWave Studio. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/darkroomengineering/lenis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Examples
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
