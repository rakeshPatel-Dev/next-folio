import { AppBreadcrumb } from '@/components/BreadCrumb'
import ProjectForm from '@/components/ProjectForm'
import React from 'react'
import { ADDPROJECTS_METADATA } from '@/lib/metadata'

export const metadata = ADDPROJECTS_METADATA;

const page = () => {
  return (
    <div className=' p-6'>
      <div className='flex flex-col gap-2 mb-6'>
        <h1 className="text-3xl font-bold">Add New Project</h1>
        <p className=" text-muted-foreground">Use the form below to add a new project to your portfolio.</p>
        <span className='mt-4 '>
          <AppBreadcrumb
            items={[
              { label: "dashboard", href: "/admin/dashboard" },
              { label: "projects", href: "/admin/projects" },
              { label: "add-project", href: "/admin/projects/add-project" },
            ]}
          />
        </span>
      </div>
      <ProjectForm path="/admin/projects" />
    </div>
  )
}

export default page
