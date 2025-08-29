
'use client';
import React from 'react';
import '../../styles/components.css'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, MoreVertical, ChevronRight } from 'lucide-react'

export const Dropdown = ({ 
  options = [],
  placeholder = "Select an option",
  value = null,
  onChange = () => {},
  disabled = false,
  variant = "default", // "default", "primary", "danger"
  size = "md", // "sm", "md", "lg"
  searchable = false,
  multiple = false,
  className = "",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedValues, setSelectedValues] = useState(multiple ? (Array.isArray(value) ? value : []) : value)
  const dropdownRef = useRef(null)
  const searchInputRef = useRef(null)

  // Filter options based on search term
  const filteredOptions = options.filter(option => 
    option.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.value?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
        setSearchTerm('')
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen, searchable])

  const handleSelect = (option) => {
    if (multiple) {
      const newSelectedValues = selectedValues.includes(option.value)
        ? selectedValues.filter(v => v !== option.value)
        : [...selectedValues, option.value]
      
      setSelectedValues(newSelectedValues)
      onChange(newSelectedValues)
    } else {
      setSelectedValues(option.value)
      onChange(option.value)
      setIsOpen(false)
      setSearchTerm('')
    }
  }

  const getDisplayText = () => {
    if (multiple) {
      if (selectedValues.length === 0) return placeholder
      if (selectedValues.length === 1) {
        const selected = options.find(opt => opt.value === selectedValues[0])
        return selected ? selected.label : selectedValues[0]
      }
      return `${selectedValues.length} selected`
    } else {
      const selected = options.find(opt => opt.value === selectedValues)
      return selected ? selected.label : placeholder
    }
  }

  const isSelected = (option) => {
    if (multiple) {
      return selectedValues.includes(option.value)
    }
    return selectedValues === option.value
  }

  // Variant styles with variables
  const variantStyles = {
    default: "border-[var(--color-border)] hover:border-[var(--color-divider)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]",
    primary: "border-[var(--color-primary-light)] hover:border-[var(--color-primary)] focus:border-[var(--color-primary-dark)] focus:ring-[var(--color-primary-dark)]",
    danger: "border-[var(--color-danger-light)] hover:border-[var(--color-danger)] focus:border-[var(--color-danger-dark)] focus:ring-[var(--color-danger-dark)]"
  }

  // Size styles
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-4 py-3 text-base"
  }

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`} {...props}>
      <motion.button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full inline-flex items-center justify-between rounded-md border shadow-sm
          ${sizeStyles[size]}
          ${variantStyles[variant]}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        style={{ backgroundColor: "var(--color-background)", color: "var(--color-text-primary)" }}
        whileTap={!disabled ? { scale: 0.98 } : {}}
      >
        <span 
          className="truncate"
          style={{ color: selectedValues && selectedValues.length > 0 ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}
        >
          {getDisplayText()}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-2"
        >
          <svg className="h-4 w-4" style={{ color: "var(--color-text-disabled)" }} viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 mt-2 w-full rounded-sm shadow-sm"
            style={{ minWidth: '200px', backgroundColor: "var(--color-surface)" }}
          >
            <div className="py-1 max-h-60 overflow-auto">
              {searchable && (
                <div className="px-3 py-2 border-b" style={{ borderColor: "var(--color-divider)" }}>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-2 py-1 text-sm rounded focus:outline-none"
                    style={{
                      border: "1px solid var(--color-border)",
                      color: "var(--color-text-primary)",
                      backgroundColor: "var(--color-background)"
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
              
              {filteredOptions.length === 0 ? (
                <div className="px-4 py-3 text-sm text-center" style={{ color: "var(--color-text-secondary)" }}>
                  {searchTerm ? 'No results found' : 'No options available'}
                </div>
              ) : (
                filteredOptions.map((option, index) => (
                  <motion.button
                    key={option.value || index}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between focus:outline-none transition-colors`}
                    style={{
                      backgroundColor: isSelected(option) ? "var(--color-selected)" : "transparent",
                      color: isSelected(option) ? "var(--color-primary-dark)" : "var(--color-text-primary)",
                      opacity: option.disabled ? 0.5 : 1,
                      cursor: option.disabled ? "not-allowed" : "pointer"
                    }}
                    disabled={option.disabled}
                    whileTap={!option.disabled ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center">
                      {option.icon && (
                        <span className="mr-3" style={{ color: "var(--color-text-disabled)" }}>
                          {option.icon}
                        </span>
                      )}
                      <div>
                        <div className="font-medium">{option.label}</div>
                        {option.description && (
                          <div className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                            {option.description}
                          </div>
                        )}
                      </div>
                    </div>
                    {isSelected(option) && (
                      <Check className="h-4 w-4" style={{ color: "var(--color-primary)" }} />
                    )}
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}




export const ThreeDotsDropdown = ({ 
  options = [], 
  position = 'bottom-right',
  className = '',
  iconSize = 16,
  dropdownWidth = 'w-48'
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'top-full left-0 mt-1'
      case 'bottom-right':
        return 'top-full right-0 mt-1'
      case 'top-left':
        return 'bottom-full left-0 mb-1'
      case 'top-right':
        return 'bottom-full right-0 mb-1'
      default:
        return 'top-full right-0 mt-1'
    }
  }

  const handleOptionClick = (option) => {
    if (option.onClick) {
      option.onClick()
    }
    setIsOpen(false)
  }

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Three dots button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        aria-label="More options"
      >
        <MoreVertical size={iconSize} className="text-gray-600 dark:text-gray-400" />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute z-50 ${getPositionClasses()} ${dropdownWidth}`}
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 overflow-hidden">
              {options.map((option, index) => (
                <motion.button
                  key={option.id || index}
                  onClick={() => handleOptionClick(option)}
                  disabled={option.disabled}
                  className={`
                    w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-150
                    ${option.disabled 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-700 dark:text-gray-300 cursor-pointer'
                    }
                    ${option.destructive 
                      ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20' 
                      : ''
                    }
                  `}
                  whileHover={!option.disabled ? { x: 2 } : {}}
                  whileTap={!option.disabled ? { scale: 0.98 } : {}}
                >
                  {/* Icon */}
                  {option.icon && (
                    <span className="flex-shrink-0">
                      {React.cloneElement(option.icon, { size: 16 })}
                    </span>
                  )}
                  
                  {/* Label and description */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {option.label}
                    </div>
                    {option.description && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {option.description}
                      </div>
                    )}
                  </div>

                  {/* Arrow for submenu or external link indicator */}
                  {option.hasSubmenu && (
                    <ChevronRight size={14} className="text-gray-400" />
                  )}
                  
                  {/* Badge or shortcut */}
                  {option.badge && (
                    <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-400">
                      {option.badge}
                    </span>
                  )}
                </motion.button>
              ))}
              
              {options.length === 0 && (
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  No options available
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

