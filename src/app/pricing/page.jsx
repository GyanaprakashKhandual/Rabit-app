'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Target, Crown, ArrowRight, Users, Database, BarChart3, Shield, Clock, Cpu } from 'lucide-react';

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: { monthly: 29, annual: 290 },
      description: 'Perfect for small teams getting started with K6 testing',
      features: [
        'Up to 5 K6 test results',
        'Basic CRUD operations',
        'Real-time dashboard',
        'Email support',
        '1 team member',
        'Basic analytics'
      ],
      color: 'from-blue-500 to-cyan-500',
      popular: false
    },
    {
      name: 'Professional',
      icon: Target,
      price: { monthly: 79, annual: 790 },
      description: 'Ideal for growing teams with advanced testing needs',
      features: [
        'Up to 100 K6 test results',
        'Advanced CRUD with filters',
        'Custom dashboards',
        'Priority support',
        'Up to 10 team members',
        'Advanced analytics & insights',
        'API access',
        'Data export features'
      ],
      color: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      name: 'Enterprise',
      icon: Crown,
      price: { monthly: 199, annual: 1990 },
      description: 'For large organizations with enterprise requirements',
      features: [
        'Unlimited K6 test results',
        'Full CRUD with advanced queries',
        'White-label dashboards',
        '24/7 dedicated support',
        'Unlimited team members',
        'Custom integrations',
        'Advanced security features',
        'SLA guarantees',
        'Custom reporting'
      ],
      color: 'from-orange-500 to-red-500',
      popular: false
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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
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
        
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Transform your K6 performance testing with modern CRUD operations and real-time insights. 
          Choose the plan that scales with your team.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center mb-12">
          <span className={`text-lg font-medium ${!isAnnual ? 'text-indigo-600' : 'text-gray-500'}`}>
            Monthly
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAnnual(!isAnnual)}
            className={`mx-4 w-16 h-8 rounded-full p-1 transition-colors duration-300 ${
              isAnnual ? 'bg-indigo-600' : 'bg-gray-300'
            }`}
          >
            <motion.div
              layout
              className="w-6 h-6 bg-white rounded-full shadow-md"
              animate={{ x: isAnnual ? 32 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.button>
          <span className={`text-lg font-medium ${isAnnual ? 'text-indigo-600' : 'text-gray-500'}`}>
            Annual
          </span>
          {isAnnual && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="ml-2 bg-green-100 text-green-800 text-sm font-semibold px-2 py-1 rounded-full"
            >
              Save 17%
            </motion.span>
          )}
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 pb-16"
      >
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isAnnual ? plan.price.annual : plan.price.monthly;
            const savings = isAnnual ? Math.round(((plan.price.monthly * 12) - plan.price.annual) / (plan.price.monthly * 12) * 100) : 0;

            return (
              <motion.div
                key={plan.name}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
                  plan.popular ? 'ring-2 ring-indigo-500 ring-offset-4' : ''
                }`}
              >
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-0 left-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-center py-2 text-sm font-semibold"
                  >
                    Most Popular
                  </motion.div>
                )}

                <div className={`p-8 ${plan.popular ? 'pt-14' : ''}`}>
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-6`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold text-gray-900">${price}</span>
                      <span className="text-gray-600 ml-2">/{isAnnual ? 'year' : 'month'}</span>
                    </div>
                    {isAnnual && savings > 0 && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-600 font-medium mt-1"
                      >
                        Save {savings}% annually
                      </motion.p>
                    )}
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        variants={featureVariants}
                        className="flex items-center"
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center mr-3 flex-shrink-0`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:shadow-xl'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    } group`}
                  >
                    <span className="flex items-center justify-center">
                      Get Started
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gray-50 py-16"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Rabit?
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern K6 result management with powerful CRUD operations and intuitive dashboards
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                description: 'Deep insights into your K6 performance test results with modern visualizations'
              },
              {
                icon: Database,
                title: 'Powerful CRUD',
                description: 'Create, read, update, and delete K6 results with advanced filtering and search'
              },
              {
                icon: Shield,
                title: 'Enterprise Security',
                description: 'Bank-level security with encryption, SSO, and compliance features'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
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
            Ready to Transform Your K6 Testing?
          </h3>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of developers who trust Rabit for their performance testing needs
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-indigo-600 font-semibold px-8 py-4 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Free Trial
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PricingPage;