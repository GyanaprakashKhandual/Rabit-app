'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  PlayCircle, 
  BookOpen, 
  Component, 
  FileText, 
  Users, 
  Building, 
  Settings, 
  Shield, 
  Key, 
  Zap, 
  Moon, 
  Sun,
  Search,
  User,
  ChevronRight,
  Database,
  Palette,
  Smartphone,
  Code,
  Layers,
  Globe,
  Terminal
} from 'lucide-react';
import { FaCoffee } from 'react-icons/fa';

const RabitDocumentation = () => {
  const [theme, setTheme] = useState('light'); // 'light', 'dark', 'brown'
  const [searchQuery, setSearchQuery] = useState('');

  const themes = {
    light: {
      bg: 'bg-gray-50',
      sidebar: 'bg-white border-gray-200',
      header: 'bg-white border-gray-200',
      card: 'bg-white border-gray-200',
      text: {
        primary: 'text-gray-900',
        secondary: 'text-gray-600',
        tertiary: 'text-gray-500',
        muted: 'text-gray-400'
      },
      hover: 'hover:bg-gray-100',
      active: 'bg-blue-50 text-blue-700',
      input: 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500',
      button: 'hover:bg-gray-100 text-gray-600'
    },
    dark: {
      bg: 'bg-gray-900',
      sidebar: 'bg-gray-800 border-gray-700',
      header: 'bg-gray-800 border-gray-700',
      card: 'bg-gray-800 border-gray-700',
      text: {
        primary: 'text-white',
        secondary: 'text-gray-300',
        tertiary: 'text-gray-400',
        muted: 'text-gray-500'
      },
      hover: 'hover:bg-gray-700',
      active: 'bg-gray-700 text-white',
      input: 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500',
      button: 'hover:bg-gray-700 text-gray-300'
    },
    brown: {
      bg: 'bg-amber-50',
      sidebar: 'bg-amber-100 border-amber-200',
      header: 'bg-amber-100 border-amber-200',
      card: 'bg-white border-amber-200',
      text: {
        primary: 'text-amber-900',
        secondary: 'text-amber-800',
        tertiary: 'text-amber-700',
        muted: 'text-amber-600'
      },
      hover: 'hover:bg-amber-200',
      active: 'bg-amber-200 text-amber-900',
      input: 'bg-white border-amber-300 text-amber-900 placeholder-amber-600 focus:border-amber-500',
      button: 'hover:bg-amber-200 text-amber-800'
    }
  };

  const currentTheme = themes[theme];

  const sidebarItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: PlayCircle, label: 'Getting started' },
    { icon: BookOpen, label: 'Guides' },
    { icon: Component, label: 'UI Components' },
    { icon: FileText, label: 'API Reference' }
  ];

  const coreConceptsItems = [
    { icon: Zap, label: 'Introduction' },
    { icon: Users, label: 'Users' },
    { icon: Building, label: 'Organizations' },
    { icon: Settings, label: 'Session management' },
    { icon: Shield, label: 'Security at Rabit' },
    { icon: Key, label: 'SDK Reference' }
  ];

  const frameworkItems = [
    { icon: Code, label: 'Next.js' },
    { icon: Layers, label: 'React' },
    { icon: Terminal, label: 'JavaScript' },
    { icon: Database, label: 'Node.js' },
    { icon: Palette, label: 'Remix' }
  ];

  const referenceItems = [
    { label: 'Frontend API' },
    { label: 'Backend API' },
    { label: 'Backend SDK' }
  ];

  const mainFeatures = [
    {
      icon: PlayCircle,
      title: 'Quickstarts & Tutorials',
      description: 'Explore our end-to-end tutorials and getting started guides for different application stacks using Rabit.',
      color: 'from-blue-500 to-purple-600'
    },
    {
      icon: Component,
      title: 'UI Components',
      description: 'Rabit\'s pre-built UI components give you a beautiful, fully-functional user management experience in minutes.',
      color: 'from-green-500 to-teal-600'
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Security is at the top concern of every feature we build. This documentation lists some of the many protections included with Rabit.',
      color: 'from-orange-500 to-red-600'
    },
    {
      icon: Key,
      title: 'API Reference',
      description: 'Dig into our API reference documentation and SDKs. We have everything you need to get started setting up authentication with Rabit.',
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const frameworkGuides = [
    {
      icon: Code,
      name: 'Next.js',
      description: 'Easily add secure, beautiful, and fast authentication to Next.js with Rabit.',
      color: 'bg-black'
    },
    {
      icon: Globe,
      name: 'Gatsby',
      description: 'Learn about installing and initializing Rabit in a new Gatsby application.',
      color: 'bg-purple-600'
    },
    {
      icon: Palette,
      name: 'Remix',
      description: 'Get started installing and initializing Rabit in a new Create React App.',
      color: 'bg-blue-600'
    },
    {
      icon: Layers,
      name: 'React',
      description: 'Get started installing and initializing Rabit in a new Create React App.',
      color: 'bg-cyan-500'
    },
    {
      icon: Database,
      name: 'Redwood',
      description: 'Grow your RedwoodJS application with Rabit user management and authentication.',
      color: 'bg-red-600'
    },
    {
      icon: Smartphone,
      name: 'Expo',
      description: 'Use Rabit with Expo to authenticate users in your React Native application.',
      color: 'bg-gray-900'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className={`min-h-screen flex ${currentTheme.bg}`}>
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`w-64 ${currentTheme.sidebar} border-r flex flex-col sticky top-0 h-screen`}
      >
        {/* Logo */}
        <div className="p-[20px]">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 ${theme === 'brown' ? 'bg-gradient-to-br from-amber-500 to-orange-600' : 'bg-gradient-to-br from-blue-500 to-purple-600'} rounded-lg flex items-center justify-center`}>
              <FaCoffee className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${currentTheme.text.primary}`}>Rabit</span>
            <span className={`text-sm ${currentTheme.text.tertiary}`}>Docs</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  item.active 
                    ? currentTheme.active
                    : `${currentTheme.text.secondary} ${currentTheme.hover}`
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Core Concepts */}
          <div className="px-4 py-2">
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${currentTheme.text.muted} mb-3`}>
              Core concepts
            </h3>
            <div className="space-y-1">
              {coreConceptsItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: (index + 5) * 0.1 }}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${currentTheme.text.secondary} ${currentTheme.hover}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reference */}
          <div className="px-4 py-2">
            <h3 className={`text-xs font-semibold uppercase tracking-wider ${currentTheme.text.muted} mb-3`}>
              Reference
            </h3>
            <div className="space-y-1">
              {referenceItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: (index + 11) * 0.1 }}
                  className={`px-3 py-2 rounded-lg cursor-pointer transition-colors ${currentTheme.text.secondary} ${currentTheme.hover}`}
                >
                  <span className="text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`${currentTheme.header} border-b px-6 py-4 sticky top-0 z-10`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme.text.muted}`} />
                <input
                  type="text"
                  placeholder="Search documentation"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${currentTheme.input} focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                />
                <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs ${currentTheme.text.muted}`}>
                  ⌘K
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Theme Selector */}
              <div className="flex items-center space-x-1 p-1 rounded-lg bg-gray-100">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-2 rounded-md transition-colors ${
                    theme === 'light' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                  title="Light theme"
                >
                  <Sun className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-2 rounded-md transition-colors ${
                    theme === 'dark' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                  title="Dark theme"
                >
                  <Moon className="w-4 h-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setTheme('brown')}
                  className={`p-2 rounded-md transition-colors ${
                    theme === 'brown' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                  title="Brown theme"
                >
                  <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-500 to-orange-600"></div>
                </button>
              </div>
              <button className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentTheme.button}`}>
                <span>Sign in</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className={`text-sm ${currentTheme.text.tertiary} mb-2`}>Get setup</div>
              <h1 className={`text-4xl font-bold ${currentTheme.text.primary} mb-4`}>
                Introducing the new Rabit documentation
              </h1>
              <p className={`text-lg ${currentTheme.text.secondary} max-w-2xl`}>
                Find all the guides and resources you need to develop with Rabit.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
            >
              {mainFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className={`${currentTheme.card} border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold ${currentTheme.text.primary} mb-2`}>
                        {feature.title}
                      </h3>
                      <p className={`${currentTheme.text.secondary} text-sm leading-relaxed`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Framework Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8"
            >
              <h2 className={`text-2xl font-bold ${currentTheme.text.primary} mb-2`}>
                Explore by frontend framework
              </h2>
              <p className={`${currentTheme.text.secondary} mb-8`}>
                Find all the guides and resources you need to develop with Rabit.
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {frameworkGuides.map((framework, index) => (
                  <motion.div
                    key={framework.name}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    className={`${currentTheme.card} border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 ${framework.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <framework.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                          {framework.name}
                        </h3>
                        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm leading-relaxed`}>
                          {framework.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RabitDocumentation;