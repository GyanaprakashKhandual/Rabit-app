'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, BarChart3, Zap, Shield, Users, Clock, 
  Search, Filter, Download, Upload, Edit3, Trash2,
  Eye, GitBranch, Bell, Settings, Code, Play,
  TrendingUp, PieChart, Activity, Target, Cpu,
  Lock, UserCheck, Workflow, ArrowRight, CheckCircle
} from 'lucide-react';

const FeaturesPage = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const heroFeatures = [
    {
      icon: Database,
      title: 'Advanced CRUD Operations',
      description: 'Complete control over your K6 test results with intuitive create, read, update, and delete functionality.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Visualize performance metrics with interactive charts and real-time monitoring dashboards.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed with instant search, filtering, and data processing capabilities.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const mainFeatures = [
    {
      category: 'Data Management',
      icon: Database,
      features: [
        {
          icon: Upload,
          title: 'Bulk Import K6 Results',
          description: 'Import thousands of K6 test results instantly with our advanced parsing engine that supports multiple formats and validates data integrity.',
          benefits: ['JSON, CSV, XML support', 'Real-time validation', 'Error handling', 'Progress tracking']
        },
        {
          icon: Search,
          title: 'Intelligent Search',
          description: 'Find any test result instantly with our powerful search engine that indexes all metadata, timestamps, and performance metrics.',
          benefits: ['Full-text search', 'Metadata filtering', 'Date range queries', 'Performance metric search']
        },
        {
          icon: Filter,
          title: 'Advanced Filtering',
          description: 'Create complex filters to segment your test data by performance thresholds, test types, environments, and custom tags.',
          benefits: ['Multi-level filtering', 'Saved filter presets', 'Custom field filters', 'Boolean logic support']
        },
        {
          icon: Edit3,
          title: 'Inline Editing',
          description: 'Edit test results directly in the interface with real-time validation and automatic backup of changes.',
          benefits: ['Real-time validation', 'Undo/redo support', 'Batch editing', 'Change tracking']
        }
      ]
    },
    {
      category: 'Analytics & Visualization',
      icon: BarChart3,
      features: [
        {
          icon: TrendingUp,
          title: 'Performance Trends',
          description: 'Track performance trends over time with interactive charts that highlight regressions and improvements automatically.',
          benefits: ['Trend analysis', 'Anomaly detection', 'Baseline comparisons', 'Regression alerts']
        },
        {
          icon: PieChart,
          title: 'Custom Dashboards',
          description: 'Build personalized dashboards with drag-and-drop widgets to monitor the metrics that matter most to your team.',
          benefits: ['Drag-and-drop builder', '20+ widget types', 'Real-time updates', 'Sharing capabilities']
        },
        {
          icon: Activity,
          title: 'Real-time Monitoring',
          description: 'Monitor live test executions with real-time streaming data and instant alerts for performance threshold breaches.',
          benefits: ['Live data streaming', 'Instant alerts', 'Performance thresholds', 'Mobile notifications']
        },
        {
          icon: Target,
          title: 'SLA Tracking',
          description: 'Define and track SLA compliance with automated reporting and alerting when performance targets are not met.',
          benefits: ['Custom SLA definitions', 'Automated reporting', 'Compliance tracking', 'Alert escalation']
        }
      ]
    },
    {
      category: 'Collaboration & Security',
      icon: Users,
      features: [
        {
          icon: UserCheck,
          title: 'Team Management',
          description: 'Organize your team with role-based access control, project assignments, and collaborative workspaces.',
          benefits: ['Role-based access', 'Team workspaces', 'Activity tracking', 'Permission management']
        },
        {
          icon: Bell,
          title: 'Smart Notifications',
          description: 'Stay informed with intelligent notifications that adapt to your workflow and alert preferences.',
          benefits: ['Smart filtering', 'Multi-channel delivery', 'Escalation rules', 'Custom triggers']
        },
        {
          icon: Lock,
          title: 'Enterprise Security',
          description: 'Bank-level security with encryption, audit trails, and compliance features for enterprise environments.',
          benefits: ['End-to-end encryption', 'Audit logging', 'SOC2 compliance', 'SSO integration']
        },
        {
          icon: Workflow,
          title: 'API Integration',
          description: 'Seamlessly integrate with your existing CI/CD pipeline using our comprehensive REST API and webhooks.',
          benefits: ['REST API', 'Webhook support', 'CI/CD integration', 'SDK libraries']
        }
      ]
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 px-4"
      >
        <div className="flex items-center justify-center mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.5 }}
            className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-3"
          >
            <Database className="w-6 h-6 text-white" />
          </motion.div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Rabit
          </h1>
        </div>
        
        <h2 className="text-5xl font-bold text-gray-900 mb-6">
          Powerful Features for Modern
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> K6 Testing</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
          Transform your performance testing workflow with advanced CRUD operations, real-time analytics, 
          and intelligent insights that help you deliver faster, more reliable applications.
        </p>
      </motion.div>

      {/* Hero Features */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 mb-20"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {heroFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-lg">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Main Features */}
      {mainFeatures.map((category, categoryIndex) => {
        const CategoryIcon = category.icon;
        return (
          <motion.div
            key={categoryIndex}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
            viewport={{ once: true }}
            className={`py-20 ${categoryIndex % 2 === 1 ? 'bg-gray-50' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-4">
              {/* Category Header */}
              <div className="text-center mb-16">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <CategoryIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-4xl font-bold text-gray-900">{category.category}</h3>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid lg:grid-cols-2 gap-12">
                {category.features.map((feature, featureIndex) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: featureIndex % 2 === 0 ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: featureIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="group"
                    >
                      <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                        <div className="flex items-start mb-6">
                          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                            <FeatureIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h4>
                            <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {feature.benefits.map((benefit, benefitIndex) => (
                            <motion.div
                              key={benefitIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.4, delay: benefitIndex * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-center"
                            >
                              <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{benefit}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Interactive Demo Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-6">
              See Rabit in Action
            </h3>
            <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
              Experience the power of modern K6 result management with our interactive features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: 'Live Demo',
                description: 'Try our interactive demo with real K6 data',
                action: 'Launch Demo'
              },
              {
                icon: Play,
                title: 'Video Tutorial',
                description: 'Watch how to get started in under 5 minutes',
                action: 'Watch Video'
              },
              {
                icon: Download,
                title: 'Free Trial',
                description: 'Start your 14-day free trial with full features',
                action: 'Start Trial'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-20 h-20 bg-white bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
                  <p className="text-indigo-100 mb-6">{item.description}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-colors duration-300 group"
                  >
                    <span className="flex items-center">
                      {item.action}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10M+', label: 'K6 Results Processed' },
              { number: '500+', label: 'Teams Using Rabit' },
              { number: '99.9%', label: 'Uptime Guarantee' },
              { number: '<100ms', label: 'Average Response Time' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-indigo-600 to-purple-700 py-16"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h3 className="text-4xl font-bold text-white mb-4">
            Ready to Revolutionize Your K6 Testing?
          </h3>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of developers who have transformed their performance testing with Rabit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Free Trial
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300"
            >
              Schedule Demo
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FeaturesPage;