// Create: app/diagnostic/page.tsx

import { getAllBlogPages, getBlogPage } from '@/lib/blogSource'
import { getBlogByIdOrSlug } from '@/utils/getBlogs'

export default async function DiagnosticPage() {
  // Get MDX pages
  const mdxPages = getAllBlogPages()

  // Test both blogs
  const blog1 = {
    slug: 'getting-started-with-nextjs-15',
    mdx: getBlogPage('getting-started-with-nextjs-15'),
    mongo: await getBlogByIdOrSlug('getting-started-with-nextjs-15'),
  }

  const blog2 = {
    slug: 'getting-started-with-nextjs',
    mdx: getBlogPage('getting-started-with-nextjs'),
    mongo: await getBlogByIdOrSlug('getting-started-with-nextjs'),
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">🔍 Complete Diagnostic</h1>

      {/* MDX Files Summary */}
      <section className="mb-8 p-6 border rounded-lg bg-blue-50">
        <h2 className="text-2xl font-semibold mb-4">📄 MDX Files Detected</h2>
        <p className="text-4xl font-bold mb-4">{mdxPages.length} files</p>
        <div className="space-y-2">
          {mdxPages.map((page, idx) => (
            <div key={idx} className="bg-white p-3 rounded border">
              <p><strong>Slug:</strong> <code className="bg-gray-100 px-2 py-1 rounded">{page.slugs[0]}</code></p>
              <p><strong>Title:</strong> {page.data.title || 'N/A'}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Blog 1 Test */}
      <BlogTest blog={blog1} />

      {/* Blog 2 Test */}
      <BlogTest blog={blog2} />

      {/* Quick Fix Section */}
      <section className="mt-8 p-6 border rounded-lg text-black bg-yellow-50">
        <h2 className="text-2xl font-semibold mb-4">🔧 Quick Fixes</h2>

        {!blog1.mongo && blog1.mdx && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded">
            <p className="font-semibold mb-2">❌ Blog 1: MDX exists but not in MongoDB</p>
            <p className="text-sm">The MDX file exists but there's no matching blog in MongoDB.</p>
            <p className="text-sm mt-2"><strong>Fix:</strong> Create the blog via admin panel at <code>/admin/blog/add-blog</code></p>
          </div>
        )}

        {blog1.mongo && !blog1.mdx && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded">
            <p className="font-semibold mb-2">❌ Blog 1: In MongoDB but no MDX file</p>
            <p className="text-sm">The blog exists in MongoDB but the MDX file is missing.</p>
            <p className="text-sm mt-2"><strong>Fix:</strong> Create <code>content/blogs/{blog1.slug}.mdx</code></p>
          </div>
        )}

        {blog1.mongo && blog1.mdx && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 rounded">
            <p className="font-semibold mb-2">✅ Blog 1: Everything is set up correctly!</p>
            <a
              href={`/blog/${blog1.slug}`}
              className="text-blue-600 hover:underline font-semibold"
            >
              Visit blog →
            </a>
          </div>
        )}

        {!blog2.mongo && blog2.mdx && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded">
            <p className="font-semibold mb-2">❌ Blog 2: MDX exists but not in MongoDB</p>
            <p className="text-sm">The MDX file exists but there's no matching blog in MongoDB.</p>
            <p className="text-sm mt-2"><strong>Fix:</strong> Create the blog via admin panel</p>
          </div>
        )}

        {blog2.mongo && blog2.mdx && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 rounded">
            <p className="font-semibold mb-2">✅ Blog 2: Everything is set up correctly!</p>
            <a
              href={`/blog/${blog2.slug}`}
              className="text-blue-600 hover:underline font-semibold"
            >
              Visit blog →
            </a>
          </div>
        )}
      </section>
    </div>
  )
}

function BlogTest({ blog }: { blog: { slug: string; mdx: any; mongo: any } }) {
  return (
    <section className="mb-8 p-6 border text-black rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Testing: {blog.slug}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* MDX Status */}
        <div className={`p-4 rounded ${blog.mdx ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'} border`}>
          <h3 className="font-semibold mb-2">
            {blog.mdx ? '✅' : '❌'} MDX File
          </h3>
          {blog.mdx ? (
            <div className="text-sm">
              <p><strong>Title:</strong> {blog.mdx.data.title}</p>
              <p><strong>Description:</strong> {blog.mdx.data.description}</p>
              <p><strong>Has content:</strong> {!!blog.mdx.data.body ? 'Yes' : 'No'}</p>
            </div>
          ) : (
            <p className="text-sm text-red-700">MDX file not found</p>
          )}
        </div>

        {/* MongoDB Status */}
        <div className={`p-4 rounded ${blog.mongo ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'} border`}>
          <h3 className="font-semibold mb-2">
            {blog.mongo ? '✅' : '❌'} MongoDB Entry
          </h3>
          {blog.mongo ? (
            <div className="text-sm">
              <p><strong>Title:</strong> {blog.mongo.title}</p>
              <p><strong>Status:</strong> {blog.mongo.status}</p>
              <p><strong>Author:</strong> {blog.mongo.author.name}</p>
              <p><strong>Tags:</strong> {blog.mongo.tags.join(', ')}</p>
            </div>
          ) : (
            <p className="text-sm text-red-700">Not found in MongoDB</p>
          )}
        </div>
      </div>

      {/* Combined Status */}
      <div className="mt-4 p-3 rounded bg-gray-100">
        <p className="font-semibold">
          {blog.mdx && blog.mongo ? (
            <span className="text-green-700">✅ Blog is complete and should work!</span>
          ) : !blog.mdx && !blog.mongo ? (
            <span className="text-red-700">❌ Blog doesn't exist (neither MDX nor MongoDB)</span>
          ) : !blog.mdx ? (
            <span className="text-red-700">❌ MDX file missing</span>
          ) : (
            <span className="text-red-700">❌ MongoDB entry missing</span>
          )}
        </p>
      </div>
    </section>
  )
}