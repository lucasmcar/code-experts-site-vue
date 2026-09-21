export default async function handler() {
  const SUPABASE_URL = process.env.VITE_SUPABASE_URL
  const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY

  const staticUrls = [
    { loc: 'https://codeexpertssistemas.com.br/', changefreq: 'weekly', priority: '1.0' },
    { loc: 'https://codeexpertssistemas.com.br/servicos', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://codeexpertssistemas.com.br/sobre', changefreq: 'monthly', priority: '0.7' },
    { loc: 'https://codeexpertssistemas.com.br/contato', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://codeexpertssistemas.com.br/blog', changefreq: 'monthly', priority: '0.8' },
  ]

  let blogUrls = []

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/posts?select=slug,published_at,created_at&status=eq.published&order=published_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      },
    )

    if (res.ok) {
      const posts = await res.json()
      blogUrls = posts.map((post) => ({
        loc: `https://codeexpertssistemas.com.br/blog/${post.slug}`,
        lastmod: (post.published_at || post.created_at)?.split('T')[0],
        changefreq: 'monthly',
        priority: '0.6',
      }))
    } else {
      console.error('Falha ao buscar posts para sitemap:', res.status)
    }
  } catch (err) {
    console.error('Erro ao gerar sitemap:', err)
  }

  // Se a busca falhar, ainda serve o sitemap com as URLs estáticas —
  // melhor um sitemap incompleto do que um erro 500 pro Google.
  const allUrls = [...staticUrls, ...blogUrls]

  const escapeXml = (str) =>
    String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${escapeXml(url.loc)}</loc>
${url.lastmod ? `    <lastmod>${url.lastmod}</lastmod>\n` : ''}    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
