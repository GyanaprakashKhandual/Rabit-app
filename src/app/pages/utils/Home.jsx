'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { 
  Code2, 
  Database, 
  Brain, 
  FileText, 
  Zap, 
  Eye, 
  ArrowRight, 
  Play,
  CheckCircle,
  Sparkles,
  Terminal,
  Activity,
  User,
  UserPlus,
  CreditCard,
  Mail,
  Twitter,
  Github,
  Linkedin,
  Moon,
  Sun
} from 'lucide-react'

import { FaCoffee } from 'react-icons/fa'

export default function RabitHomepage() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      background: [
        'linear-gradient(135deg, #1e3a8a, #1e40af)',
        'linear-gradient(135deg, #1e40af, #2563eb)',
        'linear-gradient(135deg, #2563eb, #3b82f6)',
        'linear-gradient(135deg, #3b82f6, #1e40af)',
        'linear-gradient(135deg, #1e40af, #1e3a8a)'
      ],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    })
  }, [controls])

  const workflowSteps = [
    {
      icon: Code2,
      title: "Write K6 Tests",
      description: "Code your performance tests in VS Code",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: Eye,
      title: "Extension Monitors",
      description: "Our VS Code extension watches your tests",
      color: "from-blue-700 to-blue-800"
    },
    {
      icon: Database,
      title: "Data Collection",
      description: "Results automatically sent to your database",
      color: "from-blue-800 to-blue-900"
    },
    {
      icon: Brain,
      title: "AI Processing",
      description: "OpenAI API analyzes and refines your data",
      color: "from-indigo-600 to-indigo-700"
    },
    {
      icon: FileText,
      title: "Smart Reports",
      description: "Beautiful reports generated instantly",
      color: "from-indigo-700 to-blue-600"
    }
  ]

  const handleGetStarted = async () => {
    setIsAnimating(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsAnimating(false)
  }

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className={`min-h-screen overflow-hidden transition-colors duration-300 ${
      isDark 
        ? 'bg-slate-900 text-slate-100' 
        : 'bg-white text-slate-800'
    }`}>
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 opacity-5"
        animate={controls}
      />

      {/* Header */}
      <motion.header 
        className={`relative z-10 p-6 flex justify-between items-center backdrop-blur-sm border-b transition-colors duration-300 ${
          isDark 
            ? 'bg-slate-900/95 border-slate-700' 
            : 'bg-white/95 border-slate-200'
        }`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center justify-center">
            <FaCoffee className="w-10 h-10 text-blue-900 dark:text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
            Rabit
          </span>
        </motion.div>
        
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex space-x-8">
            {['Features', 'Pricing', 'Docs', 'Support'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className={`font-medium transition-colors duration-300 ${
                  isDark 
                    ? 'text-slate-300 hover:text-blue-400' 
                    : 'text-slate-600 hover:text-blue-600'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-3">
            <motion.button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                isDark 
                  ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </motion.button>
            
            <motion.button
              className={`border px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                isDark 
                  ? 'bg-transparent border-slate-600 text-slate-300 hover:bg-slate-800' 
                  : 'bg-transparent border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <User className="w-4 h-4" />
              Login
            </motion.button>
            
            <motion.button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserPlus className="w-4 h-4" />
              Sign Up
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-20">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Generate
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent">
              Test Reports
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-800 to-indigo-600 bg-clip-text text-transparent">
              Automatically
            </span>
          </motion.h1>

          <motion.p 
            className={`text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Transform your K6 performance tests into beautiful, AI-powered reports. 
            Just code in VS Code, and let Rabit do the magic with OpenAI integration.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 group"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgb(59 130 246 / 0.5)" }}
              whileTap={{ scale: 0.95 }}
              disabled={isAnimating}
            >
              {isAnimating ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Setting up your workspace...
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" />
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
            
            <motion.button
              className="bg-indigo-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-indigo-700 transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <CreditCard className="w-6 h-6" />
              Subscribe Premium
            </motion.button>
          </motion.div>
        </div>

        {/* Workflow Section */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            How Rabit Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {workflowSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
              >
                <div className={`backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 group ${
                  isDark 
                    ? 'bg-slate-800/80 border-slate-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20' 
                    : 'bg-white/80 border-slate-200 hover:border-blue-300 hover:shadow-lg'
                }`}>
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className={`text-xl font-semibold mb-3 text-center transition-colors ${
                    isDark 
                      ? 'text-slate-100 group-hover:text-blue-400' 
                      : 'text-slate-800 group-hover:text-blue-600'
                  }`}>
                    {step.title}
                  </h3>
                  
                  <p className={`text-center text-sm leading-relaxed transition-colors ${
                    isDark 
                      ? 'text-slate-300 group-hover:text-slate-200' 
                      : 'text-slate-600 group-hover:text-slate-700'
                  }`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Features Grid */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
            Why Choose Rabit?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Generate comprehensive test reports in seconds, not hours",
                gradient: "from-blue-600 to-blue-700"
              },
              {
                icon: Brain,
                title: "AI-Powered",
                description: "OpenAI integration provides intelligent insights and analysis",
                gradient: "from-indigo-600 to-blue-600"
              },
              {
                icon: Terminal,
                title: "VS Code Native",
                description: "Seamless integration with your existing development workflow",
                gradient: "from-blue-700 to-indigo-700"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className={`backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 group ${
                  isDark 
                    ? 'bg-slate-800/60 border-slate-700 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20' 
                    : 'bg-white/60 border-slate-200 hover:border-blue-300 hover:shadow-xl'
                }`}
                whileHover={{ y: -10, boxShadow: isDark ? "0 20px 40px rgb(59 130 246 / 0.2)" : "0 20px 40px rgb(148 163 184 / 0.1)" }}
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className={`text-2xl font-semibold mb-4 transition-colors ${
                  isDark 
                    ? 'text-slate-100 group-hover:text-blue-400' 
                    : 'text-slate-800 group-hover:text-blue-600'
                }`}>
                  {feature.title}
                </h3>
                
                <p className={`leading-relaxed transition-colors ${
                  isDark 
                    ? 'text-slate-300 group-hover:text-slate-200' 
                    : 'text-slate-600 group-hover:text-slate-700'
                }`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          className="text-center py-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-12 max-w-4xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Testing?
            </h2>
            
            <p className={`text-xl mb-8 max-w-2xl mx-auto transition-colors duration-300 ${
              isDark ? 'text-blue-200' : 'text-blue-100'
            }`}>
              Join thousands of developers who have revolutionized their testing workflow with Rabit
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                className={`px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center gap-3 ${
                  isDark 
                    ? 'bg-slate-800 text-blue-400 hover:bg-slate-700' 
                    : 'bg-white text-blue-600 hover:bg-blue-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CheckCircle className="w-5 h-5" />
                Start Free Trial
              </motion.button>
              
              <motion.button
                className="border-2 border-white text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Documentation
              </motion.button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer 
        className={`relative z-10 mt-20 transition-colors duration-300 ${
          isDark ? 'bg-slate-800 text-slate-100' : 'bg-slate-900 text-white'
        }`}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
      >
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">
                  Rabit
                </span>
              </div>
              <p className={`mb-6 max-w-md transition-colors duration-300 ${
                isDark ? 'text-slate-400' : 'text-slate-300'
              }`}>
                Revolutionizing software testing with AI-powered automated report generation. 
                Transform your K6 tests into beautiful, insightful reports effortlessly.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Twitter, href: "#", color: "hover:text-blue-400" },
                  { icon: Github, href: "#", color: "hover:text-white" },
                  { icon: Linkedin, href: "#", color: "hover:text-blue-400" },
                  { icon: Mail, href: "#", color: "hover:text-blue-400" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`transition-colors duration-300 ${
                      isDark ? 'text-slate-500' : 'text-slate-400'
                    } ${social.color}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isDark ? 'text-slate-100' : 'text-white'
              }`}>Product</h3>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Documentation', 'API Reference', 'Integrations'].map((item) => (
                  <li key={item}>
                    <a href="#" className={`transition-colors duration-300 ${
                      isDark 
                        ? 'text-slate-400 hover:text-blue-400' 
                        : 'text-slate-300 hover:text-blue-400'
                    }`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isDark ? 'text-slate-100' : 'text-white'
              }`}>Support</h3>
              <ul className="space-y-2">
                {['Help Center', 'Community', 'Contact Us', 'Bug Reports', 'Feature Requests'].map((item) => (
                  <li key={item}>
                    <a href="#" className={`transition-colors duration-300 ${
                      isDark 
                        ? 'text-slate-400 hover:text-blue-400' 
                        : 'text-slate-300 hover:text-blue-400'
                    }`}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className={`border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center transition-colors duration-300 ${
            isDark ? 'border-slate-700' : 'border-slate-800'
          }`}>
            <p className={`text-sm transition-colors duration-300 ${
              isDark ? 'text-slate-500' : 'text-slate-400'
            }`}>
              © 2025 Rabit. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                <a key={item} href="#" className={`text-sm transition-colors duration-300 ${
                  isDark 
                    ? 'text-slate-500 hover:text-blue-400' 
                    : 'text-slate-400 hover:text-blue-400'
                }`}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}