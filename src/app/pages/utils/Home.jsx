'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion'
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
  Menu,
  X,
  Shield,
  Clock,
  Layers,
  Rocket,
  Star,
  Globe,
  Users,
  TrendingUp
} from 'lucide-react'

export default function RabitHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const pages = [
    { 'text': 'Features', 'path': '/feature'},
    { 'text': 'Documentation', 'path': '/documentation'},
    { 'text': 'Pricing', 'path': '/pricing'},
  ]
  const features = [
    {
      icon: Zap,
      title: "Lightning Speed",
      description: "Generate reports in milliseconds with our optimized AI engine",
      color: "from-amber-400 to-orange-500",
      bgGradient: "from-amber-50 to-orange-50"
    },
    {
      icon: Brain,
      title: "Smart Analysis", 
      description: "AI-powered insights that understand your testing patterns",
      color: "from-purple-400 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      icon: Shield,
      title: "Enterprise Ready",
      description: "Security-first approach with SOC2 compliance built-in",
      color: "from-emerald-400 to-teal-500",
      bgGradient: "from-emerald-50 to-teal-50"
    }
  ]

  const workflow = [
    { step: "01", title: "Install Extension", description: "Add Rabit to VS Code in one click" },
    { step: "02", title: "Write K6 Tests", description: "Code your tests as usual" },
    { step: "03", title: "Auto Detection", description: "Rabit watches and processes" },
    { step: "04", title: "AI Analysis", description: "Intelligent report generation" },
    { step: "05", title: "Beautiful Reports", description: "Share insights instantly" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: backgroundY }}
          className="absolute -top-1/2 -right-1/2 w-full h-full"
        >
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-300/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-pink-200/30 to-orange-300/30 rounded-full blur-3xl"></div>
        </motion.div>
      </div>

      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                Rabit
              </span>
            </motion.div>

            <div className="hidden lg:flex items-center space-x-8">
              {pages.map((pages) => (
                <motion.a
                  key={pages.text}
                  onClick={() => router.push(pages.path)}
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors relative group"
                  whileHover={{ y: -2 }}
                >
                  {pages.text}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                onClick={() => router.push('/register')}
              >
                <User className="w-4 h-4" />
                Sign In
              </motion.button>
              
              <motion.button
                className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-slate-600"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`lg:hidden bg-white border-t border-slate-200 ${isMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? 'auto' : 0 }}
        >
          <div className="px-6 py-4 space-y-3">
            {['Features', 'Pricing', 'Docs', 'Blog'].map((item) => (
              <a key={item} href="#" className="block text-slate-600 hover:text-slate-900 font-medium">
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium border border-violet-200">
                <Sparkles className="w-4 h-4" />
                Now with GPT-4 Integration
              </span>
            </motion.div>

            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 tracking-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
                Testing Reports
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Reimagined
              </span>
            </motion.h1>

            <motion.p 
              className="text-xl md:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Transform K6 performance tests into stunning, AI-powered reports. 
              Zero configuration, maximum insight.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.button
                className="group bg-gradient-to-r from-violet-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-5 h-5" />
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                className="group border-2 border-slate-300 text-slate-700 hover:border-slate-400 hover:text-slate-900 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 flex items-center gap-3"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <Eye className="w-5 h-5" />
                Watch Demo
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {[
                { number: "50K+", label: "Developers" },
                { number: "1M+", label: "Reports Generated" },
                { number: "99.9%", label: "Uptime" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                Why Developers
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Choose Rabit
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Experience the next generation of testing infrastructure
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-3xl border-2 transition-all duration-500 cursor-pointer ${
                    activeFeature === index 
                      ? 'border-violet-300 bg-gradient-to-r from-violet-50 to-purple-50 shadow-lg' 
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onClick={() => setActiveFeature(index)}
                  whileHover={{ scale: 1.02, y: -4 }}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl p-8 shadow-2xl">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="ml-auto text-sm text-slate-500">report.html</span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gradient-to-r from-violet-200 to-purple-200 rounded"></div>
                    <div className="h-4 bg-gradient-to-r from-blue-200 to-cyan-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gradient-to-r from-emerald-200 to-teal-200 rounded w-1/2"></div>
                  </div>
                  <div className="mt-6 p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-violet-600" />
                      <span className="font-semibold text-slate-900">Performance Insights</span>
                    </div>
                    <div className="text-sm text-slate-600">AI-generated analysis complete</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get up and running in under 5 minutes
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection Lines */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-300 to-purple-300 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {workflow.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-purple-500/25 mx-auto mb-4 relative z-10">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-violet-600 via-purple-600 to-violet-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Ready to Transform
              <br />
              Your Testing?
            </h2>
            
            <p className="text-xl text-purple-100 mb-12 max-w-2xl mx-auto">
              Join thousands of developers who've revolutionized their testing workflow
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.button
                className="bg-white text-violet-600 px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <CheckCircle className="w-5 h-5" />
                Start Free Trial
              </motion.button>
              
              <motion.button
                className="border-2 border-white/30 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                Contact Sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">Rabit</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                The future of software testing is here. Generate beautiful, 
                AI-powered reports from your K6 tests effortlessly.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Globe, label: "Website" },
                  { icon: Users, label: "Community" },
                  { icon: Star, label: "GitHub" }
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Product</h3>
              <ul className="space-y-3">
                {pages.map((page) => (
                  <li key={page.text}>
                    <a
                      onClick={() => router.push(page.path)}
                      className="text-slate-400 hover:text-white transition-colors cursor-pointer">
                      {page.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-3">
                {['About', 'Blog', 'Careers', 'Contact', 'Privacy'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 Rabit. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Terms', 'Privacy', 'Cookies'].map((item) => (
                <a key={item} href="#" className="text-slate-400 hover:text-white text-sm transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}