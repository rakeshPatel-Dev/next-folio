import { AppBreadcrumb } from "@/components/BreadCrumb"
import ProjectForm from "@/components/forms/ProjectForm"
import { ADDPROJECTS_METADATA } from "@/lib/metadata"
import { connectDB } from "@/lib/mongoose"
import Project from "@/models/projectModel"

export const metadata = ADDPROJECTS_METADATA

// ✅ Server action to save a project
async function saveProject(values: any) {
  "use server"
  try {
    await connectDB()


    // Validate and sanitize input before saving
    const { title, shortDescription, type, status, image } = values;

    if (!title || !shortDescription || !type || !status || !image) {
      throw new Error("Required fields are missing");
    }


    // directly save the payload
    await Project.create(values)

    return {
      success: true,
      message: "Project saved successfully",
    }
  } catch (error) {
    console.error("Error while saving:", error)
    throw new Error("Failed to save project")
  }
}

const Page = async () => {
  return (
    <div className="sm:p-6">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold">Add New Project</h1>
        <p className="text-muted-foreground">
          Use the form below to add a new project to your portfolio.
        </p>

        <span className="mt-4">
          <AppBreadcrumb
            items={[
              { label: "dashboard", href: "/admin/dashboard" },
              { label: "projects", href: "/admin/projects" },
              { label: "add-project", href: "/admin/projects/add-project" },
            ]}
          />
        </span>
      </div>

      <ProjectForm
        path="/admin/projects"
        saveProject={saveProject} // 🚀 this will now handle direct save
      />
    </div>
  )
}

export default Page
