'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Trash2, Folder, X, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2';

export default function ProjectSidebar({ isOpen, onClose }) {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
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
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
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
        body: JSON.stringify({ name: newProjectName.trim() })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create project');
      }

      const newProject = await response.json();
      setProjects([...projects, newProject]);
      setNewProjectName('');
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
      inputValue: projectToUpdate.name,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Project name cannot be empty!';
        }
      }
    });

    if (!newName || newName === projectToUpdate.name) return;

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
        body: JSON.stringify({ name: newName })
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
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-80 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Projects</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Add Project Section */}
            <div className="p-4 border-b border-gray-200">
              {!showAddForm ? (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      <Plus size={18} />
                      Add New Project
                    </>
                  )}
                </button>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleAddProject}
                  className="space-y-3"
                >
                  <input
                    type="text"
                    placeholder="Project name..."
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    autoFocus
                    disabled={isLoading}
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        'Add'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setNewProjectName('');
                      }}
                      className="flex-1 px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors duration-200 text-sm disabled:opacity-50"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                  </div>
                </motion.form>
              )}
            </div>

            {/* Projects List */}
            <div className="flex-1 overflow-y-auto p-4">
              {isLoading && projects.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <Loader2 size={24} className="animate-spin text-gray-400" />
                </div>
              ) : (
                <AnimatePresence>
                  {filteredProjects.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8 text-gray-500"
                    >
                      {searchTerm ? 'No projects found' : 'No projects yet'}
                    </motion.div>
                  ) : (
                    filteredProjects.map((project) => (
                      <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`group flex items-center justify-between p-3 rounded-lg mb-2 cursor-pointer transition-all duration-200 ${
                          selectedProjectId === project._id
                            ? 'bg-blue-50 border-2 border-blue-200'
                            : 'hover:bg-gray-50 border-2 border-transparent'
                        }`}
                        onClick={() => handleSelectProject(project._id)}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <Folder 
                            size={18} 
                            className={selectedProjectId === project._id ? 'text-blue-600' : 'text-gray-400'} 
                          />
                          <span 
                            className={`font-medium truncate ${
                              selectedProjectId === project._id ? 'text-blue-800' : 'text-gray-700'
                            }`}
                            title={project.name}
                            onDoubleClick={() => handleUpdateProject(project._id)}
                          >
                            {project.name}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateProject(project._id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-all duration-200 text-gray-500 hover:text-gray-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(project._id);
                            }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded transition-all duration-200 text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              )}
            </div>

            {/* Selected Projects Summary */}
            {selectedProjectId && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-blue-50 border-t border-blue-200"
              >
                <p className="text-sm text-blue-800">
                  Selected: {projects.find(p => p._id === selectedProjectId)?.name || 'Project'}
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}