"use client";

import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Login Form */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex flex-col items-center justify-center p-8"
      >
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back!</h1>
          <p className="text-gray-600 mb-8">
            Simplify your workflow and boost your productivity with Tuga's App. Get started for free.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end mt-1">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot Password?
                </a>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Login
            </motion.button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <motion.button
                whileHover={{ y: -2 }}
                type="button"
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <FcGoogle className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                type="button"
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <FaGithub className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ y: -2 }}
                type="button"
                className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <FaApple className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Not a member?{" "}
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Register now
              </a>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Right side - Illustration */}
      {/* Right side - Illustration */}
<div className="hidden md:flex w-1/2 bg-gradient-to-br from-pink-50 via-sky-50 to-lime-50 items-center justify-center p-12">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="text-gray-800 text-center"
  >
    <div className="mb-8">
      <div className="inline-block bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-lg shadow-lg">
        <span className="text-2xl font-bold text-gray-700">Rabit Design</span>
      </div>
    </div>
    <h2 className="text-4xl font-bold mb-4 text-gray-800">10 Task</h2>
    <p className="text-xl mb-8 text-gray-600">Design</p>
    <p className="text-xl text-gray-700">
      Make your work easier and organized<br />
      with Rabit's App
    </p>
  </motion.div>
</div>
    </div>
  );
}