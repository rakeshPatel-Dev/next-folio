import AdminBlogForm from '@/components/forms/BlogForm'
import { AppBreadcrumb } from '@/components/BreadCrumb'
import React from 'react'
import { ADDBLOGS_METADATA } from '@/lib/metadata'

export const metadata = ADDBLOGS_METADATA;

const page = () => {
  return (
    <div className=' sm:p-6'>
      <div className='flex flex-col gap-2 mb-6'>
        <h1 className="text-3xl font-bold">Add New Blog</h1>
        <p className=" text-muted-foreground">Use the form below to add a new Blog to the portfolio.</p>
        <span className='mt-4 '>
          <AppBreadcrumb
            items={[
              { label: "dashboard", href: "/admin/dashboard" },
              { label: "blog", href: "/admin/blog" },
              { label: "add-blog", href: "/admin/projects/add-blog" },
            ]}
          />
        </span>
      </div>
      <AdminBlogForm path="/admin/blog" />
    </div>
  )
}

export default page
