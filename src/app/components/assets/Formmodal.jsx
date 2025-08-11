'use client'

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { IoClose, IoCodeSlash, IoClipboardOutline, IoLinkOutline, IoEyeOutline, IoDownloadOutline } from 'react-icons/io5'
import { FaWifi } from 'react-icons/fa'

const Modal = ({ isOpen, onClose }) => {
  const [networkType, setNetworkType] = useState('HTTP/1.1')
  const [apiName, setApiName] = useState('')
  const [apiLink, setApiLink] = useState('')
  const [k6TestData, setK6TestData] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showParsedData, setShowParsedData] = useState(false)

  const networkOptions = [
    'HTTP/1.1',
    'HTTP/2',
    'HTTP/3',
    'WebSocket',
    'gRPC',
    'GraphQL'
  ]

  // K6 Data Parser Function
  const parseK6Data = (rawData) => {
    if (!rawData.trim()) return null

    try {
      const lines = rawData.split('\n').filter(line => line.trim())
      const result = {
        summary: {
          checks: {
            passed: 0,
            total: 0,
            percentage: 0
          },
          data: {
            received: {
              total: 0,
              rate: 0
            },
            sent: {
              total: 0,
              rate: 0
            }
          },
          http_requests: {
            total: 0,
            rate: 0,
            failed: 0,
            failed_percentage: 0
          },
          iterations: {
            total: 0,
            rate: 0
          }
        },
        metrics: {},
        vus: {
          min: 0,
          max: 0,
          max_total: 0
        },
        timestamp: new Date().toISOString()
      }

      const parseValue = (str) => {
        // Handle percentages
        if (str.includes('%')) {
          return parseFloat(str.replace('%', ''))
        }
        
        // Handle data sizes (MB, kB, etc.)
        if (str.includes('MB')) {
          return Math.round(parseFloat(str.replace('MB', '').trim()) * 1024 * 1024)
        }
        if (str.includes('kB')) {
          return Math.round(parseFloat(str.replace('kB', '').trim()) * 1024)
        }
        if (str.includes('B') && !str.includes('kB') && !str.includes('MB')) {
          return parseFloat(str.replace('B', '').trim())
        }
        
        // Handle time units
        if (str.includes('ms')) {
          return parseFloat(str.replace('ms', '').trim())
        }
        if (str.includes('µs')) {
          return parseFloat(str.replace('µs', '').trim()) / 1000 // Convert to ms
        }
        if (str.includes('s') && !str.includes('ms') && !str.includes('µs')) {
          return parseFloat(str.replace('s', '').trim()) * 1000 // Convert to ms
        }
        
        // Handle rates
        if (str.includes('/s')) {
          return parseFloat(str.replace('/s', '').trim())
        }
        
        // Handle fractions like "975 out of 975"
        if (str.includes(' out of ')) {
          const [passed, total] = str.split(' out of ').map(s => parseInt(s.trim()))
          return { passed, total }
        }
        
        return parseFloat(str.trim()) || 0
      }

      const parseMetricLine = (line) => {
        const parts = line.split(':')
        if (parts.length < 2) return null
        
        const metricName = parts[0].replace(/\./g, '_').trim()
        const values = parts[1].trim()
        
        // Parse different metric formats
        const metricPattern = /avg=([\d.]+\w*)\s+min=([\d.]+\w*)\s+med=([\d.]+\w*)\s+max=([\d.]+\w*)\s+p\(90\)=([\d.]+\w*)\s+p\(95\)=([\d.]+\w*)/
        const match = values.match(metricPattern)
        
        if (match) {
          return {
            name: metricName,
            values: {
              avg: parseValue(match[1]),
              min: parseValue(match[2]),
              med: parseValue(match[3]),
              max: parseValue(match[4]),
              p90: parseValue(match[5]),
              p95: parseValue(match[6])
            }
          }
        }
        
        return { name: metricName, rawValue: values }
      }

      lines.forEach(line => {
        const trimmedLine = line.trim()
        
        if (trimmedLine.includes('checks')) {
          const match = trimmedLine.match(/checks.*?:\s*(.+)/)
          if (match) {
            const checksData = parseValue(match[1])
            if (typeof checksData === 'object' && checksData.passed !== undefined) {
              result.summary.checks.passed = checksData.passed
              result.summary.checks.total = checksData.total
              result.summary.checks.percentage = (checksData.passed / checksData.total) * 100
            }
          }
        }
        
        else if (trimmedLine.includes('data_received')) {
          const match = trimmedLine.match(/data_received.*?:\s*(.+?)\s+(.+)/)
          if (match) {
            result.summary.data.received.total = parseValue(match[1])
            result.summary.data.received.rate = parseValue(match[2])
          }
        }
        
        else if (trimmedLine.includes('data_sent')) {
          const match = trimmedLine.match(/data_sent.*?:\s*(.+?)\s+(.+)/)
          if (match) {
            result.summary.data.sent.total = parseValue(match[1])
            result.summary.data.sent.rate = parseValue(match[2])
          }
        }
        
        else if (trimmedLine.includes('http_reqs')) {
          const match = trimmedLine.match(/http_reqs.*?:\s*(\d+)\s+([\d.]+)\/s/)
          if (match) {
            result.summary.http_requests.total = parseInt(match[1])
            result.summary.http_requests.rate = parseFloat(match[2])
          }
        }
        
        else if (trimmedLine.includes('http_req_failed')) {
          const match = trimmedLine.match(/http_req_failed.*?:\s*([\d.]+)%\s*(\d+)\s*out\s*of\s*(\d+)/)
          if (match) {
            result.summary.http_requests.failed = parseInt(match[2])
            result.summary.http_requests.failed_percentage = parseFloat(match[1])
          }
        }
        
        else if (trimmedLine.includes('iterations') && !trimmedLine.includes('iteration_duration')) {
          const match = trimmedLine.match(/iterations.*?:\s*(\d+)\s+([\d.]+)/)
          if (match) {
            result.summary.iterations.total = parseInt(match[1])
            result.summary.iterations.rate = parseFloat(match[2])
          }
        }
        
        else if (trimmedLine.includes('vus') && !trimmedLine.includes('vus_max')) {
          const match = trimmedLine.match(/vus.*?:\s*(\d+)\s*min=(\d+)\s*max=(\d+)/)
          if (match) {
            result.vus.min = parseInt(match[2])
            result.vus.max = parseInt(match[3])
          }
        }
        
        else if (trimmedLine.includes('vus_max')) {
          const match = trimmedLine.match(/vus_max.*?:\s*(\d+)\s*min=(\d+)\s*max=(\d+)/)
          if (match) {
            result.vus.max_total = parseInt(match[3])
          }
        }
        
        // Parse metric lines
        else if (trimmedLine.includes('http_req_') || trimmedLine.includes('iteration_duration')) {
          const metric = parseMetricLine(trimmedLine)
          if (metric && metric.values) {
            result.metrics[metric.name] = metric.values
          }
        }
      })
      
      return result
    } catch (error) {
      console.error('Error parsing K6 data:', error)
      return null
    }
  }

  // Memoized parsed data
  const parsedData = useMemo(() => {
    return parseK6Data(k6TestData)
  }, [k6TestData])

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
    
    const formData = {
      networkType,
      apiName,
      apiLink,
      k6TestData,
      parsedData
    }
    
    console.log('Form Data:', formData)
    onClose()
  }

  const downloadParsedData = () => {
    if (parsedData) {
      const dataStr = JSON.stringify(parsedData, null, 2)
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
      
      const exportFileDefaultName = `k6-test-results-${apiName || 'unnamed'}.json`
      
      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()
    }
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
            className="relative w-full max-w-7xl bg-white rounded-lg shadow-2xl border border-gray-200 dark:bg-gray-900 dark:border-gray-700 max-h-[90vh] overflow-hidden"
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

            <div className="flex h-full max-h-[calc(90vh-80px)]">
              {/* Left Side - Form */}
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 transition-colors"
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
                        className="w-full px-3 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
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
                      rows={12}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 resize-none transition-colors text-sm font-mono"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-900 border border-transparent rounded-md hover:bg-blue-800 focus:outline-none transition-colors"
                    >
                      Save Configuration
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side - Parsed Data Preview */}
              {k6TestData && (
                <div className="flex-1 border-l border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                        <IoEyeOutline className="mr-2" />
                        Parsed Data Preview
                      </h3>
                      {parsedData && (
                        <button
                          onClick={downloadParsedData}
                          className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors flex items-center"
                        >
                          <IoDownloadOutline className="mr-1" />
                          Download JSON
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="p-4 h-full overflow-y-auto">
                    {parsedData ? (
                      <pre className="text-xs bg-white dark:bg-gray-900 p-3 rounded border text-gray-800 dark:text-gray-200 overflow-x-auto">
                        {JSON.stringify(parsedData, null, 2)}
                      </pre>
                    ) : (
                      <div className="text-gray-500 dark:text-gray-400 text-center py-8">
                        <IoClipboardOutline size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Parsed data will appear here once you paste K6 test results</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}



export default Modal;