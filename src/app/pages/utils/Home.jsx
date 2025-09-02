'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaCoffee, FaChartLine, FaUpload, FaSync, FaEdit, FaTrash, FaPlayCircle, FaDownload, FaUsers, FaShieldAlt, FaRocket, FaCog, FaLightbulb } from 'react-icons/fa';

export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const slideUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 font-inter antialiased">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <FaCoffee className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Rabit</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-10">
            {['Features', 'Dashboard', 'Test', 'Pricing', 'Contact'].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="text-gray-700 hover:text-indigo-600 transition-all duration-300 font-medium relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex space-x-4">
            <motion.button
              className="px-6 py-2.5 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
            >
              Sign In
            </motion.button>
            <motion.button
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.02, y: -1 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 p-2"
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
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col space-y-4">
              {['Features', 'Dashboard', 'Test', 'Pricing', 'Contact'].map((item) => (
                <a key={item} href="#" className="text-gray-700 hover:text-indigo-600 transition-colors font-medium">
                  {item}
                </a>
              ))}
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
                <button className="px-6 py-2.5 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-left">
                  Sign In
                </button>
                <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-colors font-medium">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="lg:pr-8"
              variants={slideUp}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-full text-indigo-700 text-sm font-medium mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <FaRocket className="w-4 h-4 mr-2" />
                Performance Testing Made Simple
              </motion.div>

              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                Visualize & Analyze Your{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  K6 Performance Tests
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
                Transform your K6 test results into beautiful, interactive dashboards. Upload, analyze, and compare performance data with enterprise-grade visualization tools designed for modern engineering teams.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center space-x-3 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl text-lg"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaPlayCircle className="group-hover:scale-110 transition-transform duration-300" />
                  <span>Start Testing</span>
                </motion.button>
                <motion.button
                  className="group px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl flex items-center justify-center space-x-3 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 font-semibold text-lg"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaDownload className="group-hover:scale-110 transition-transform duration-300" />
                  <span>View Demo</span>
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Background decorative elements */}
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl opacity-60 blur-3xl"></div>
              <div className="absolute -bottom-4 -right-4 w-64 h-64 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl opacity-60 blur-3xl"></div>

              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-gray-200/50">
                <div className="flex space-x-2 mb-6">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-indigo-50/30 p-6 rounded-2xl mb-6">
                  <div className="h-64 bg-gradient-to-br from-white to-indigo-50 rounded-xl flex items-center justify-center border border-gray-100/50 shadow-inner">
                    <div className="text-center">
                      <motion.div
                        animate={{
                          rotate: [0, 5, -5, 0],
                          scale: [1, 1.05, 0.95, 1]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <FaChartLine className="text-indigo-500 text-5xl mx-auto mb-3" />
                      </motion.div>
                      <p className="text-gray-600 font-medium">Interactive K6 Analytics</p>
                      <p className="text-gray-400 text-sm mt-1">Real-time Performance Insights</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Response Time', color: 'indigo', value: '245ms' },
                    { label: 'Throughput', color: 'emerald', value: '1.2K/s' },
                    { label: 'Error Rate', color: 'purple', value: '0.1%' }
                  ].map((metric, index) => (
                    <motion.div
                      key={index}
                      className={`bg-gradient-to-br from-${metric.color}-50 to-${metric.color}-100/50 p-4 rounded-xl text-center border border-${metric.color}-200/30`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    >
                      <p className={`text-xs text-${metric.color}-700 font-medium mb-1`}>{metric.label}</p>
                      <p className={`text-lg font-bold text-${metric.color}-800`}>{metric.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-full text-indigo-700 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <FaLightbulb className="w-4 h-4 mr-2" />
              Powerful Features
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Everything You Need for{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Performance Excellence
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive tools designed specifically for performance engineers who demand precision, clarity, and actionable insights.
            </p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border border-gray-200/50 hover:border-indigo-300/50 transition-all duration-500 hover:shadow-xl"
                variants={fadeIn}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 to-purple-50/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center text-indigo-600 text-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-indigo-50/30 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-full text-indigo-700 text-sm font-medium mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <FaCog className="w-4 h-4 mr-2" />
              How It Works
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Transform Data into{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Actionable Insights
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Four simple steps to unlock the full potential of your performance testing data
            </p>
          </motion.div>

          <div className="relative">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-20 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
            </div>

            <div className="grid lg:grid-cols-4 gap-12 relative">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                >
                  <motion.div
                    className="relative mb-8"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-xl">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed max-w-xs">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              Ready to Revolutionize Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">
                Performance Testing?
              </span>
            </h2>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              Join thousands of performance engineers worldwide who trust Rabit to visualize, analyze, and optimize their testing workflows with precision and style.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.button
                className="px-8 py-4 bg-white text-indigo-600 rounded-2xl font-bold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started for Free
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-white/30 text-white rounded-2xl font-bold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule a Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Compact Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8 mb-10">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <FaCoffee className="text-white text-sm" />
                </div>
                <span className="text-white font-bold text-xl">Rabit</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md leading-relaxed">
                Advanced performance testing visualization and analysis platform for modern engineering teams.
                Making complex data simple and actionable.
              </p>
              <div className="flex space-x-4">
                {['twitter', 'github', 'linkedin', 'discord'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    <div className="w-4 h-4 bg-gray-500 rounded-sm"></div>
                  </motion.a>
                ))}
              </div>
            </div>

            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className="text-white font-semibold mb-4 text-lg">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Rabit. All rights reserved. Built with ❤️ for performance engineers.</p>
            <div className="flex space-x-8 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 text-sm">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Enhanced data arrays
const features = [
  {
    icon: <FaUpload />,
    title: "Seamless Upload",
    description: "Drag & drop K6 transcripts or paste JSON directly. Our intelligent parser handles multiple formats automatically with zero configuration required."
  },
  {
    icon: <FaChartLine />,
    title: "Advanced Visualization",
    description: "Interactive charts with drill-down capabilities, real-time filtering, and customizable dashboards that reveal hidden performance patterns."
  },
  {
    icon: <FaSync />,
    title: "Smart Comparisons",
    description: "AI-powered test comparison engine that identifies performance regressions, improvements, and anomalies across test runs automatically."
  },
  {
    icon: <FaEdit />,
    title: "Collaborative Editing",
    description: "Team-friendly annotation system with threaded comments, performance targets, and shared insights for better cross-team collaboration."
  },
  {
    icon: <FaTrash />,
    title: "Intelligent Management",
    description: "Auto-organize test runs with smart tagging, archival policies, and cleanup workflows that keep your workspace pristine and efficient."
  },
  {
    icon: <FaShieldAlt />,
    title: "Enterprise Security",
    description: "Bank-grade encryption, SOC 2 compliance, and granular access controls ensure your performance data stays secure and private."
  }
];

const steps = [
  {
    icon: <FaUpload />,
    title: "Upload & Import",
    description: "Seamlessly upload your K6 test results with our intelligent parser that handles any format"
  },
  {
    icon: <FaSync />,
    title: "Auto-Processing",
    description: "Our AI-powered engine automatically extracts, validates, and structures your performance data"
  },
  {
    icon: <FaChartLine />,
    title: "Interactive Analytics",
    description: "Explore beautiful, interactive visualizations with drill-down capabilities and real-time insights"
  },
  {
    icon: <FaUsers />,
    title: "Team Collaboration",
    description: "Share findings, add annotations, and collaborate with your team to drive performance improvements"
  }
];

const footerLinks = [
  {
    title: "Product",
    links: ["Features", "Dashboard", "API Access", "Integrations", "Mobile App"]
  },
  {
    title: "Resources",
    links: ["Documentation", "Tutorials", "Blog", "Community", "Support"]
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact", "Partners", "Press Kit"]
  }
];