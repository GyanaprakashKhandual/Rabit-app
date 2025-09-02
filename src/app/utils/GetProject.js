// utils/getProjectDetails.js
import axios from "axios";

/**
 * Fetch project details using projectId from current URL
 * @returns {Promise<Object|null>} project details or null
 */
export const getProjectDetails = async () => {
  try {
    // 1. Extract projectId from current URL
    const pathSegments = window.location.pathname.split("/");
    const projectId = pathSegments[pathSegments.length - 1]; // e.g. "68b6e315b8d54311a520e3e4"

    // 2. Get token from localStorage
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token not found in localStorage");

    // 3. Fetch project details from API using projectId
    const response = await axios.get(
      `http://localhost:5000/api/v1/project/${projectId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in headers
        },
      }
    );

    // 4. Return project data
    return response.data.data;
  } catch (error) {
    console.error("Error fetching project details:", error.message);
    return null;
  }
};
