// app/projects/[id]/page.jsx
import Navbar from "@/app/components/modules/Navbar";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

async function getProjectById(id) {
  console.log("Fetching project with ID:", id);

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`http://localhost:5000/api/v1/project/${id}`, {
    cache: "no-store",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("API failed:", res.status, res.statusText);

    if (res.status === 401) {
      throw new Error("Unauthorized: Please log in");
    }

    throw new Error("Failed to fetch project");
  }

  const result = await res.json();
  console.log("API raw result:", result);

  return result.data;
}

export async function generateMetadata({ params }) {
  const project = await getProjectById(params.id);

  return {
    title: project?.projectName + " " + "-" + " " + project?.projectDesc || "Project",
    description: project?.projectDesc || "Project details page",
  };
}

export default async function ProjectPage({ params }) {
  const { id } = params;

  try {
    const project = await getProjectById(id);
    console.log("Parsed project data:", project);

    return (
      <div className="">
        <div>
          <Navbar/>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering project page:", error);
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold text-red-600">Error</h1>
        <p className="mt-4 text-gray-700">{error.message}</p>
        {error.message.includes("Unauthorized") && (
          <p className="mt-2 text-sm text-blue-600">
            <a href="/login">Please log in to continue</a>
          </p>
        )}
      </div>
    );
  }
}
