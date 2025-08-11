"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiPlus,
  FiMessageSquare,
  FiFilter,
  FiX,
  FiSearch,
  FiUser,
  FiGithub,
} from "react-icons/fi";
import { FiGrid, FiList, FiCode, FiBarChart2 } from "react-icons/fi";
import {
  FaBug,
  FaCodeBranch,
  FaEllipsisV,
  FaProjectDiagram,
} from "react-icons/fa";

import Modal from "./Formmodal";
import ProfileModal from "../modules/Profile";
import ProjectSidebar from "../modules/Project";


export default function GitHubNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isViewDropdownOpen, setIsViewDropdownOpen] = useState(false);
  const [isConnectDropdownOpen, setIsConnectDropdownOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [selectedView, setSelectedView] = useState("Table view");
  const [selectedConnect, setSelectedConnect] = useState("Connect Options");
  const [isConnectedToGitHub, setIsConnectedToGitHub] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("Add Bug");
  const [isAddDropdownOpen, setIsAddDropdownOpen] = useState(false);
  const [isProfileSidebarOpen, setIsProfileSidebarOpen] = useState(false);
  const [isProjectSidebarOpen, setIsProjectSidebarOpen] = useState(false);
  const [isBugSidebarOpen, setIsBugSidebarOpen] = useState(false);
  const [isImportDropdownOpen, setIsImportDropdownOpen] = useState(false);
  const [selectedImport, setSelectedImport] = useState("Import Options");
  const [isMessageSidebarOpen, setIsMessageSidebarOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Dropdown options

  const importOptions = [
    { name: "Import from Excel", icon: <FiPlus className="mr-2" /> },
    { name: "Import from Links", icon: <FiPlus className="mr-2" /> },
    { name: "Import from Word", icon: <FiPlus className="mr-2" /> },
  ];
  const addOptions = [
    { name: "Add Manually", icon: <FiPlus className="mr-2" /> },
  ];

  const viewOptions = [
    { name: "Table view", icon: <FiList className="mr-2" /> },
    { name: "Card view", icon: <FiGrid className="mr-2" /> },
    { name: "JSON View", icon: <FiCode className="mr-2" /> },
    { name: "Chart View", icon: <FiBarChart2 className="mr-2" /> },
  ];

  const connectOptions = [
    { name: "Connect with VS Code", icon: <FaCodeBranch className="mr-2" /> },
    { name: "Connect with GitHub", icon: <FiGithub className="mr-2" /> },
    { name: "Connect with GitLab", icon: <FiGithub className="mr-2" /> },
  ];

  const ConnectionStatusIndicator = () => (
    <div className="flex items-center">
      <div
        className={`w-2 h-2 rounded-full mr-2 ${isConnectedToGitHub ? "bg-green-500" : "bg-red-500"
          }`}
      ></div>
      <span
        className={`text-xs ${isConnectedToGitHub ? "text-green-600" : "text-red-600"
          }`}
      >
        {isConnectedToGitHub ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
  // Custom Arrow Component
    const ArrowDropdown = ({ isOpen }) => (
  <motion.svg
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.2 }}
      width="18"
      height="18"
      padding="2"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-gray-800"
    >
      <path d="M7 10l5 5 5-5H7z" />
    </motion.svg>
    )

  return (
    <nav className="bg-gray-50 border-b border-gray-200">
      <div className="px-1">
        <div className="flex items-center justify-between h-12">
          {/* Left side - Hamburger menu and project name */}
          <div className="flex items-center">
            <ProjectSidebar isOpen={isProjectSidebarOpen} onClose={() => setIsProjectSidebarOpen(false)}/>
            <button
              onClick={() => setIsProjectSidebarOpen(true)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <FiMenu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0 flex items-center ml-4">
              <span className="text-lg font-semibold text-gray-900">
                Project Name
              </span>
            </div>
          </div>

          {/* Center - Search bar (hidden on mobile) */}
          <div className="hidden md:flex flex-1 mx-4">
            <div className="relative w-auto min-w-[300px]">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-1 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </div>

          {/* Right side - Actions and status */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Add Manually button and Modal */}
            <Modal isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
            <div className="relative">
              <button
                className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
                onClick={() => setIsOpenModal(true)}
              >
                Add Manually
              </button>

              <AnimatePresence>
                {isAddDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-200 z-50"
                  >
                    <div className="py-1">
                      {addOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={() => {
                            setSelectedType(option.name);
                            setIsAddDropdownOpen(false);
                          }}
                          className={`flex items-center px-4 py-2 text-sm w-full text-left ${selectedType === option.name
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          {option.icon}
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* View dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsViewDropdownOpen(!isViewDropdownOpen)}
                className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
              >
                {selectedView}
                <ArrowDropdown/>
                
              </button>

              <AnimatePresence>
                {isViewDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-200 z-50"
                  >
                    <div className="py-1">
                      {viewOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={() => {
                            setSelectedView(option.name);
                            setIsViewDropdownOpen(false);
                          }}
                          className={`flex items-center px-4 py-2 text-sm w-full text-left ${selectedView === option.name
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          {option.icon}
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Import dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsImportDropdownOpen(!isImportDropdownOpen)}
                className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
              >
                {selectedImport}
                <ArrowDropdown/>
              </button>

              <AnimatePresence>
                {isImportDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-200 z-50"
                  >
                    <div className="py-1">
                      {importOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={() => {
                            setSelectedImport(option.name);
                            setIsImportDropdownOpen(false);
                          }}
                          className={`flex items-center px-4 py-2 text-sm w-full text-left ${selectedImport === option.name
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          {option.icon}
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Connect dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsConnectDropdownOpen(!isConnectDropdownOpen)}
                className="flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300"
              >
                {selectedConnect}
                <ArrowDropdown/>
              </button>

              <AnimatePresence>
                {isConnectDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-gray-200 z-50"
                  >
                    <div className="py-1">
                      {connectOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={() => {
                            setSelectedConnect(option.name);
                            setIsConnectDropdownOpen(false);
                            if (option.name === "Connect with GitHub") {
                              setIsConnectedToGitHub(true);
                            }
                          }}
                          className={`flex items-center px-4 py-2 text-sm w-full text-left ${selectedConnect === option.name
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          {option.icon}
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filter button */}
            <div className="relative group">
              <button
                onClick={() => setIsFilterSidebarOpen(true)}
                className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <FiFilter className="h-5 w-5" />
              </button>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs rounded px-2 py-1 z-10">
                Filter
              </span>
            </div>

            {/* Action icons */}
            <div className="relative group">
              <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <FiMessageSquare className="h-5 w-5" />
              </button>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs rounded px-2 py-1 z-10">
                Message
              </span>
            </div>
            <div className="relative group">
              <button
                onClick={() => setIsBugSidebarOpen(!isBugSidebarOpen)}
                className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <FaBug className="h-5 w-5" />
              </button>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs rounded px-2 py-1 z-10">
                Bugs
              </span>
            </div>

            {/* Profile button */}
            <div className="relative group">
              <ProfileModal isOpen={isProfileSidebarOpen} onClose={() => setIsProfileSidebarOpen(false)}/>
              <button
                onClick={() => setIsProfileSidebarOpen(!isProfileSidebarOpen)}
                className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <FiUser className="h-5 w-5" />
              </button>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs rounded px-2 py-1 z-10">
                Profile
              </span>
            </div>

            {/* Projects sidebar toggle */}
            <div className="relative group">
              <button
                onClick={() => setIsProjectSidebarOpen(!isProjectSidebarOpen)}
                className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <FaProjectDiagram className="h-5 w-5" />
              </button>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs rounded px-2 py-1 z-10">
                Projects
              </span>
            </div>
            {/* More Options */}
            <div className="relative group">
              <button
                onClick={() => setIsProfileSidebarOpen(!isProfileSidebarOpen)}
                className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <FaEllipsisV className="h-5 w-5" />
              </button>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-black text-white text-xs rounded px-2 py-1 z-10">
                More Option
              </span>
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <FiMenu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-50">
              {/* Search bar - mobile */}
              <div className="relative mt-1 mb-3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>

              {/* Add bug button - mobile */}
              <button className="w-full flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium text-white mb-2">
                <FaBug className="mr-1" />
                Add Bug
              </button>

              {/* Connection status - mobile */}
              <div className="mb-3 px-2">
                <ConnectionStatusIndicator />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter sidebar */}
      <AnimatePresence>
        {isFilterSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.04, 0.62, 0.23, 0.98]
              }}
              className="fixed inset-0 "
              onClick={() => setIsFilterSidebarOpen(false)}
            ></motion.div>

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8
              }}
              className="fixed inset-y-0 right-0 max-w-xs w-full bg-gray-50 z-50 overflow-y-auto rounded-tl-3xl rounded-bl-3xl"
              style={{ marginTop: '3.10rem' }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between border-b border-gray-300 pb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Filters
                  </h2>
                  <button
                    onClick={() => setIsFilterSidebarOpen(false)}
                    className="p-2 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-white transition-all duration-200 hover:shadow-md"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-4 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1,
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98]
                    }}
                  >
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Status
                    </h3>
                    <div className="space-y-2">
                      {["Open", "In Progress", "Resolved", "Closed"].map(
                        (status, index) => (
                          <motion.label
                            key={status}
                            className="flex items-center p-2 rounded-lg hover:bg-white transition-all duration-200 cursor-pointer"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: 0.15 + index * 0.05,
                              duration: 0.3
                            }}
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-all duration-200"
                            />
                            <span className="ml-2 text-sm text-gray-700">
                              {status}
                            </span>
                          </motion.label>
                        )
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.2,
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98]
                    }}
                  >
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Priority
                    </h3>
                    <div className="space-y-2">
                      {["Low", "Medium", "High", "Critical"].map((priority, index) => (
                        <motion.label
                          key={priority}
                          className="flex items-center p-2 rounded-lg hover:bg-white transition-all duration-200 cursor-pointer"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.25 + index * 0.05,
                            duration: 0.3
                          }}
                        >
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 transition-all duration-200"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            {priority}
                          </span>
                        </motion.label>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3,
                      duration: 0.4,
                      ease: [0.04, 0.62, 0.23, 0.98]
                    }}
                  >
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Advanced Filters
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Assignee
                        </label>
                        <select className="block w-full bg-white border border-gray-300 rounded-xl py-2 px-3 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-sm">
                          <option>Any assignee</option>
                          <option>Unassigned</option>
                          <option>Assigned to me</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">
                          Date Range
                        </label>
                        <select className="block w-full bg-white border border-gray-300 rounded-xl py-2 px-3 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:shadow-sm">
                          <option>Any time</option>
                          <option>Last 24 hours</option>
                          <option>Last 7 days</option>
                          <option>Last 30 days</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  className="mt-6 flex space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4,
                    duration: 0.4,
                    ease: [0.04, 0.62, 0.23, 0.98]
                  }}
                >
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95">
                    Apply Filters
                  </button>
                  <button className="px-4 py-2 bg-white hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-700 border border-gray-300 transition-all duration-200 hover:shadow-md transform hover:scale-105 active:scale-95">
                    Reset
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}