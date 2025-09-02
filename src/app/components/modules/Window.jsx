'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Filter, Check, AlertCircle } from 'lucide-react'

const FilterSidebar = ({ isOpen, onClose }) => {
  const [filters, setFilters] = useState({
    status: '',
    requestedOutcome: '',
    avgTime: 50,
    minTime: 10,
    maxTime: 90,
    medTime: 60
  })

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleApply = () => {
    console.log('Applied filters:', filters)
    // Here you would typically call a function to apply the filters
    onClose()
  }

  const handleClear = () => {
    setFilters({
      status: '',
      requestedOutcome: '',
      avgTime: 50,
      minTime: 10,
      maxTime: 90,
      medTime: 60
    })
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30,
              mass: 0.8
            }}
            className="fixed top-0 right-0 min-h-[calc(100vh-65px)] max-h-[calc(100vh-65px)] w-96 bg-[radial-gradient(circle_at_center,theme(colors.blue.50),theme(colors.sky.50),white)] z-50 flex flex-col mt-[65px]"
          
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Status Filter */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Check Status
                </label>
                <div className="space-y-2">
                  {['Pass', 'Fail'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={option}
                        checked={filters.status === option}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        {option === 'Pass' ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-sm text-gray-700">{option}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Requested Outcome Filter */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Requested Outcome
                </label>
                <div className="space-y-2">
                  {['Pass', 'Failed'].map((option) => (
                    <label key={option} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="requestedOutcome"
                        value={option}
                        checked={filters.requestedOutcome === option}
                        onChange={(e) => handleFilterChange('requestedOutcome', e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        {option === 'Pass' ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-sm text-gray-700">{option}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Time Sliders */}
              <div className="space-y-6">
                <h3 className="text-sm font-medium text-gray-700">Time Settings</h3>
                
                {/* Average Time */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-gray-600">Average Time</label>
                    <span className="text-sm font-medium text-blue-600">{filters.avgTime}s</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.avgTime}
                    onChange={(e) => handleFilterChange('avgTime', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>

                {/* Minimum Time */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-gray-600">Minimum Time</label>
                    <span className="text-sm font-medium text-green-600">{filters.minTime}s</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.minTime}
                    onChange={(e) => handleFilterChange('minTime', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                  />
                </div>

                {/* Maximum Time */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-gray-600">Maximum Time</label>
                    <span className="text-sm font-medium text-red-600">{filters.maxTime}s</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.maxTime}
                    onChange={(e) => handleFilterChange('maxTime', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-red"
                  />
                </div>

                {/* Medium Time */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm text-gray-600">Medium Time</label>
                    <span className="text-sm font-medium text-purple-600">{filters.medTime}s</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.medTime}
                    onChange={(e) => handleFilterChange('medTime', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-purple"
                  />
                </div>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="border-t border-gray-200 p-6">
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleApply}
                  className="flex-1 bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Apply Filters
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClear}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCancel}
                  className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </div>

            {/* Custom Styles for Sliders */}
            <style jsx>{`
              .slider::-webkit-slider-thumb {
                appearance: none;
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: #3b82f6;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              }
              
              .slider::-moz-range-thumb {
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: #3b82f6;
                cursor: pointer;
                border: none;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              }

              .slider-green::-webkit-slider-thumb {
                background: #10b981;
              }
              
              .slider-green::-moz-range-thumb {
                background: #10b981;
              }

              .slider-red::-webkit-slider-thumb {
                background: #ef4444;
              }
              
              .slider-red::-moz-range-thumb {
                background: #ef4444;
              }

              .slider-purple::-webkit-slider-thumb {
                background: #8b5cf6;
              }
              
              .slider-purple::-moz-range-thumb {
                background: #8b5cf6;
              }
            `}</style>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default FilterSidebar;