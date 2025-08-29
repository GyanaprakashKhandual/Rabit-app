'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCoffee, FaChartLine, FaUpload, FaSync, FaEdit, FaTrash, FaPlayCircle, FaDownload, FaUsers, FaShieldAlt } from 'react-icons/fa';

export default function Homepage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const constraintsRef = useRef(null);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-sky-50 to-lavender-50 font-sans">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaCoffee className="text-indigo-600 text-2xl" />
            <span className="text-xl font-bold text-gray-800">Rabit</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['Features', 'Dashboard', 'Test', 'Pricing', 'Contact'].map((item) => (
              <motion.a 
                key={item}
                href="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <motion.button 
              className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Sign In
            </motion.button>
            <motion.button 
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white p-4 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex flex-col space-y-4">
              {['Features', 'Dashboard', 'Test', 'Pricing', 'Contact'].map((item) => (
                <a key={item} href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                  {item}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100 flex flex-col space-y-3">
                <button className="px-4 py-2 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
                  Sign In
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              className="md:w-1/2 mb-10 md:mb-0"
              variants={fadeIn}
              initial="initial"
              animate="animate"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Visualize & Analyze Your <span className="text-indigo-600">K6 Performance Tests</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Rabit helps performance engineers parse, visualize, and compare test results with an intuitive dashboard. 
                Upload your K6 transcripts and get actionable insights in seconds.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.button 
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-colors"
                  whileHover={{ y: -3 }}
                >
                  <FaPlayCircle />
                  <span>Start Testing</span>
                </motion.button>
                <motion.button 
                  className="px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg flex items-center justify-center space-x-2 hover:bg-indigo-50 transition-colors"
                  whileHover={{ y: -3 }}
                >
                  <FaDownload />
                  <span>View Demo</span>
                </motion.button>
              </div>
            </motion.div>
            <motion.div 
              className="md:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div className="flex space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="h-48 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <FaChartLine className="text-indigo-400 text-4xl mx-auto mb-2" />
                      <p className="text-gray-500">Interactive K6 Data Visualization</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-indigo-50 p-2 rounded text-center">
                    <p className="text-xs text-indigo-800">Response Time</p>
                  </div>
                  <div className="bg-green-50 p-2 rounded text-center">
                    <p className="text-xs text-green-800">Throughput</p>
                  </div>
                  <div className="bg-purple-50 p-2 rounded text-center">
                    <p className="text-xs text-purple-800">Error Rate</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Powerful Features for Performance Engineers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Rabit provides everything you need to analyze, compare, and optimize your performance tests.
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors"
                variants={fadeIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-indigo-600 text-2xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gradient-to-r from-white to-sky-50 px-4">
        <div className="container mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How Rabit Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to transform your K6 test data into actionable insights
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-indigo-200"></div>
            
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold mb-4 relative">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Performance Testing?</h2>
            <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
              Join thousands of performance engineers who use Rabit to visualize, analyze, and optimize their tests.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button 
                className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Get Started for Free
              </motion.button>
              <motion.button 
                className="px-6 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Schedule a Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <FaCoffee className="text-indigo-400 text-2xl" />
                <span className="text-white font-bold text-xl">Rabit</span>
              </div>
              <p className="text-sm mb-4">
                Advanced performance testing visualization and analysis for modern engineering teams.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'github', 'linkedin', 'facebook'].map((social) => (
                  <a key={social} href="#" className="hover:text-indigo-400 transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                  </a>
                ))}
              </div>
            </div>
            
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className="text-white font-medium mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-sm hover:text-indigo-400 transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div>
              <h4 className="text-white font-medium mb-4">Subscribe to our newsletter</h4>
              <p className="text-sm mb-4">The latest news, articles, and resources sent to your inbox weekly.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                />
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© {new Date().getFullYear()} Rabit. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm hover:text-indigo-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm hover:text-indigo-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-sm hover:text-indigo-400 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Data arrays
const features = [
  {
    icon: <FaUpload />,
    title: "Upload K6 Transcripts",
    description: "Simply paste your K6 test transcript or upload the file. Our automatic parser does the rest."
  },
  {
    icon: <FaChartLine />,
    title: "Data Visualization",
    description: "Interactive charts and graphs to visualize response times, throughput, error rates and more."
  },
  {
    icon: <FaSync />,
    title: "Compare Tests",
    description: "Easily compare current test results with historical data to track performance trends."
  },
  {
    icon: <FaEdit />,
    title: "Edit & Annotate",
    description: "Add notes, edit parameters, and annotate specific test points for better collaboration."
  },
  {
    icon: <FaTrash />,
    title: "Manage Tests",
    description: "Organize, archive, or delete test runs to keep your workspace clean and efficient."
  },
  {
    icon: <FaShieldAlt />,
    title: "Secure Data Storage",
    description: "Your test data is securely stored with encryption and regular backups for peace of mind."
  }
];

const steps = [
  {
    icon: <FaUpload />,
    title: "Upload Data",
    description: "Paste your K6 transcript or upload the file directly to Rabit"
  },
  {
    icon: <FaSync />,
    title: "Automatic Parsing",
    description: "Our system automatically parses and structures your test data"
  },
  {
    icon: <FaChartLine />,
    title: "Visualize",
    description: "Explore interactive visualizations of your performance metrics"
  },
  {
    icon: <FaUsers />,
    title: "Collaborate",
    description: "Share insights with your team and make data-driven decisions"
  }
];

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Dashboard", "Test Comparison", "API", "Integrations"]
  },
  {
    title: "Resources",
    links: ["Documentation", "Guides", "Blog", "Community", "Webinars"]
  },
  {
    title: "Company",
    links: ["About Us", "Careers", "Contact", "Partners", "Press"]
  }
];