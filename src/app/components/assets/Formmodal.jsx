'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose, IoCodeSlash, IoClipboardOutline, IoLinkOutline } from 'react-icons/io5'
import { FaWifi } from 'react-icons/fa'

const Modal = ({ isOpen, onClose }) => {
  const [networkType, setNetworkType] = useState('HTTP/1.1')
  const [apiName, setApiName] = useState('')
  const [apiLink, setApiLink] = useState('')
  const [k6TestData, setK6TestData] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const networkOptions = [
    'HTTP/1.1',
    'HTTP/2',
    'HTTP/3',
    'WebSocket',
    'gRPC',
    'GraphQL'
  ]

  // Custom Arrow Component
  const ArrowDropdown = ({ isOpen }) => (
     <motion.svg
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.2 }}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-gray-800"
  >
    <path d="M7 10l5 5 5-5H7z" />
  </motion.svg>
  )
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission
    console.log({
      networkType,
      apiName,
      apiLink,
      k6TestData
    })
    onClose()
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
            className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add API Test Configuration
              </h2>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              >
                <IoClose size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              {/* API Name Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  <IoCodeSlash className="inline mr-2" />
                  API Name
                </label>
                <input
                  type="text"
                  value={apiName}
                  onChange={(e) => setApiName(e.target.value)}
                  placeholder="Enter API name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
                  required
                />
              </div>

              {/* API Link Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  <IoLinkOutline className="inline mr-2" />
                  API Link
                </label>
                <input
                  type="url"
                  value={apiLink}
                  onChange={(e) => setApiLink(e.target.value)}
                  placeholder="https://api.example.com/endpoint"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
                  required
                />
              </div>

              {/* Network Type Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  <FaWifi className="inline mr-2" />
                  Network Type
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="block truncate">{networkType}</span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <ArrowDropdown isOpen={isDropdownOpen} />
                    </span>
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.15 }}
                        className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-600"
                      >
                        <ul className="py-1 max-h-60 overflow-auto">
                          {networkOptions.map((option) => (
                            <li key={option}>
                              <button
                                type="button"
                                onClick={() => {
                                  setNetworkType(option)
                                  setIsDropdownOpen(false)
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                {option}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* K6 Test Data Input */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  <IoClipboardOutline className="inline mr-2" />
                  K6 Test Result Data
                </label>
                <textarea
                  value={k6TestData}
                  onChange={(e) => setK6TestData(e.target.value)}
                  placeholder="Paste your K6 test results here..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 resize-none transition-colors"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-900 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none transition-olors"
                >
                  Save Configuration
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}



export default Modal