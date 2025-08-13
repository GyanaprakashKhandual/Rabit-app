'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Folder, X, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ProjectSidebar({ isOpen, onClose }) {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Helper function to get token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token');
  };

  // Load projects from API and selected project from localStorage on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const token = getAuthToken();
        if (!token) {
          throw new Error('Authentication token not found');
        }

        const response = await fetch('http://localhost:5000/v1/project', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch projects');
        
        const data = await response.json();
        setProjects(data);
        
        // Load selected project from localStorage
        const savedProjectId = localStorage.getItem('selectedProjectId');
        if (savedProjectId) {
          setSelectedProjectId(savedProjectId);
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to load projects',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchProjects();
    }
  }, [isOpen]);

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new project
  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    try {
      setIsLoading(true);
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch('http://localhost:5000/v1/project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          projectName: newProjectName.trim(),
          projectDesc: newProjectDesc.trim() || 'No description' 
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create project');
      }

      const newProject = await response.json();
      setProjects([...projects, newProject]);
      setNewProjectName('');
      setNewProjectDesc('');
      setShowAddForm(false);

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Project created successfully!',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to create project',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete project
  const handleDeleteProject = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (!result.isConfirmed) return;

    try {
      setIsLoading(true);
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`http://localhost:5000/v1/project/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete project');
      }

      setProjects(projects.filter(project => project._id !== id));
      
      // If the deleted project was selected, clear the selection
      if (selectedProjectId === id) {
        setSelectedProjectId(null);
        localStorage.removeItem('selectedProjectId');
      }

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Project has been deleted.',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to delete project',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Update project name
  const handleUpdateProject = async (id) => {
    const projectToUpdate = projects.find(p => p._id === id);
    if (!projectToUpdate) return;

    const { value: newName } = await Swal.fire({
      title: 'Update Project Name',
      input: 'text',
      inputValue: projectToUpdate.projectName,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Project name cannot be empty!';
        }
      }
    });

    if (!newName || newName === projectToUpdate.projectName) return;

    try {
      setIsLoading(true);
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`http://localhost:5000/v1/project/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ projectName: newName })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update project');
      }

      const updatedProject = await response.json();
      setProjects(projects.map(project => 
        project._id === id ? updatedProject : project
      ));

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Project name has been updated.',
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to update project',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Select project and save to localStorage
  const handleSelectProject = (id) => {
    setSelectedProjectId(id);
    localStorage.setItem('selectedProjectId', id);
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Enhanced Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0"
            onClick={onClose}
          />

          {/* Enhanced Sidebar */}
          <motion.div
            initial={{ x: -400, opacity: 0, scale: 0.95 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -400, opacity: 0, scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              mass: 1,
              duration: 0.5
            }}
            className="fixed left-0 top-0 mt-13 h-full w-80 bg-gradient-to-br from-white via-gray-50 to-blue-50 z-50 flex flex-col border-r border-gray-200/50 backdrop-blur-sm"
          >
            {/* Enhanced Header */}
            <motion.div 
              className="flex items-center justify-between p-6 border-b border-gray-200/80 bg-white/70 backdrop-blur-sm"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
                Projects
              </h2>
              <motion.button
                onClick={onClose}
                className="p-2 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-300 group"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={20} className="text-gray-500 group-hover:text-red-500 transition-colors duration-300" />
              </motion.button>
            </motion.div>

            {/* Enhanced Search Bar */}
            <motion.div 
              className="p-4 border-b border-gray-200/50 bg-white/50"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative group">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white transition-all duration-300 placeholder-gray-400"
                />
              </div>
            </motion.div>

            {/* Enhanced Add Project Section */}
            <motion.div 
              className="p-4 border-b border-gray-200/50 bg-white/30"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {!showAddForm ? (
                <motion.button
                  onClick={() => setShowAddForm(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Plus size={18} />
                      Add New Project
                    </>
                  )}
                </motion.button>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  onSubmit={handleAddProject}
                  className="space-y-3"
                >
                  <input
                    type="text"
                    placeholder="Project name..."
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300/50 rounded-xl bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-400"
                    autoFocus
                    disabled={isLoading}
                  />
                  <input
                    type="text"
                    placeholder="Project description (optional)"
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300/50 rounded-xl bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-400"
                    disabled={isLoading}
                  />
                  <div className="flex gap-2">
                    <motion.button
                      type="submit"
                      className="flex-1 px-3 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 text-sm flex items-center justify-center gap-2 disabled:opacity-50 shadow-md hover:shadow-lg"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        'Add'
                      )}
                    </motion.button>
                    <motion.button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setNewProjectName('');
                        setNewProjectDesc('');
                      }}
                      className="flex-1 px-3 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-700 rounded-xl hover:from-gray-400 hover:to-gray-500 transition-all duration-300 text-sm disabled:opacity-50 shadow-md hover:shadow-lg"
                      disabled={isLoading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </motion.div>

            {/* Enhanced Projects List */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-transparent to-white/30">
              {isLoading && projects.length === 0 ? (
                <motion.div 
                  className="flex justify-center items-center h-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Loader2 size={32} className="animate-spin text-blue-500" />
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredProjects.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-center py-12 text-gray-500"
                    >
                      <div className="mb-4">
                        <Folder size={48} className="mx-auto text-gray-300" />
                      </div>
                      {searchTerm ? 'No projects found' : 'No projects yet'}
                    </motion.div>
                  ) : (
                    filteredProjects.map((project, index) => (
                      <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ 
                          duration: 0.3,
                          delay: index * 0.05,
                          type: "spring",
                          stiffness: 300,
                          damping: 25
                        }}
                        className={`group flex items-center justify-between p-4 rounded-xl mb-3 cursor-pointer transition-all duration-300 backdrop-blur-sm border ${
                          selectedProjectId === project._id
                            ? 'bg-gradient-to-r from-blue-100 to-blue-50 border-blue-300/50 shadow-lg transform scale-[1.02]'
                            : 'hover:bg-white/80 border-transparent hover:border-gray-200/50 hover:shadow-md hover:transform hover:scale-[1.01]'
                        }`}
                        onClick={() => handleSelectProject(project._id)}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <Folder 
                              size={20} 
                              className={`transition-colors duration-300 ${
                                selectedProjectId === project._id ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-500'
                              }`} 
                            />
                          </motion.div>
                          <div className="truncate flex-1">
                            <motion.span 
                              className={`font-semibold transition-colors duration-300 ${
                                selectedProjectId === project._id ? 'text-blue-800' : 'text-gray-700 group-hover:text-gray-900'
                              }`}
                              title={project.projectName}
                              onDoubleClick={() => handleUpdateProject(project._id)}
                              whileHover={{ scale: 1.02 }}
                            >
                              {project.projectName}
                            </motion.span>
                            {project.projectDesc && (
                              <motion.p 
                                className="text-xs text-gray-500 truncate mt-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                              >
                                {project.projectDesc}
                              </motion.p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateProject(project._id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-blue-100 rounded-lg transition-all duration-300 text-gray-500 hover:text-blue-600"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </motion.button>
                          <motion.button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(project._id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-100 rounded-lg transition-all duration-300 text-gray-500 hover:text-red-600"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Enhanced Selected Projects Summary */}
            {selectedProjectId && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="p-4 bg-gradient-to-r from-blue-100 to-blue-50 border-t border-blue-200/50 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <p className="text-sm font-medium text-blue-800">
                    Selected: {projects.find(p => p._id === selectedProjectId)?.projectName || 'Project'}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}