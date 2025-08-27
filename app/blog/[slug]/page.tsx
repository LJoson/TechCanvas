import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogDetail } from '@/components/blog/BlogDetail'
import { BlogSidebar } from '@/components/blog/BlogSidebar'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { getBlogPostBySlug, getAllBlogPosts } from '@/lib/content/mdx-parser'

interface BlogPageProps {
  params: {
    slug: string
  }
}

// 生成静态路径
export async function generateStaticParams() {
  try {
    const posts = getAllBlogPosts()
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('生成静态路径时出错:', error)
    return []
  }
}

// 生成元数据
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  try {
    const post = getBlogPostBySlug(params.slug)

    if (!post) {
      return {
        title: '文章未找到 - LJoson 的"废柴"小窝',
        description: '抱歉，您访问的文章不存在。',
      }
    }

    return {
      title: `${post.title} - LJoson 的"废柴"小窝`,
      description: post.description,
      keywords: post.tags.join(', '),
      openGraph: {
        title: post.title,
        description: post.description,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
        tags: post.tags,
        images: [
          {
            url: `/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.description,
        images: [`/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(post.description)}`],
      },
    }
  } catch (error) {
    console.error('生成元数据时出错:', error)
    return {
      title: '加载中 - LJoson 的"废柴"小窝',
      description: '正在加载文章内容...',
    }
  }
}

export default function BlogPage({ params }: BlogPageProps) {
  try {
    const post = getBlogPostBySlug(params.slug)

    if (!post) {
      notFound()
    }

    // 获取相关文章
    const allPosts = getAllBlogPosts()
    const relatedPosts = allPosts
      .filter(p => p.slug !== post.slug && p.category === post.category)
      .slice(0, 3)

    return (
      <div className="min-h-screen bg-cyber-bg-900">
        {/* 页面头部装饰 */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-fail-red/5 via-fail-orange/3 to-fail-purple/5"></div>

          {/* 主要内容区域 */}
          <div className="relative z-10">
            {/* 文章内容区域 */}
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* 主要内容区域 */}
                <div className="lg:col-span-3 w-full">
                  <BlogDetail post={post} />
                </div>

                {/* 侧边栏 */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <BlogSidebar />
                  </div>
                </div>
              </div>
            </div>

            {/* 相关文章推荐 */}
            {relatedPosts.length > 0 && (
              <div className="max-w-7xl mx-auto px-4 pb-16">
                <RelatedPosts posts={relatedPosts} currentPost={post} />
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('博客页面渲染出错:', error)
    return (
      <div className="min-h-screen bg-cyber-bg-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-fail-red mb-4">
            🤖 加载失败
          </h1>
          <p className="text-gray-400 mb-4">
            抱歉，文章加载时出现了问题
          </p>
          <a
            href="/blog/"
            className="inline-flex items-center px-4 py-2 bg-fail-red text-white rounded-lg hover:bg-fail-orange transition-colors"
          >
            返回博客列表
          </a>
        </div>
      </div>
    )
  }
}

