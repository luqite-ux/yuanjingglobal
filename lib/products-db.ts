import { getSupabaseClient } from '@/lib/supabase'
import { categorySlug, getCategories as getFallbackCategories, getProduct as getFallbackProduct, getProducts as getFallbackProducts, type CategoryView, type ProductView } from '@/lib/data/products'

type ProductRow = { slug: string; name_i18n?: Record<string,string>; name?: string; description_i18n?: Record<string,string>; description?: string; image_url?: string; model?: string; specs?: Record<string,unknown>; extra_data?: Record<string,unknown> }
const text = (value: unknown) => typeof value === 'string' ? value : ''
const list = (value: unknown) => Array.isArray(value) ? value.map(text).filter(Boolean) : []

function mapProduct(row: ProductRow): ProductView {
  const fallback = getFallbackProduct(row.slug) ?? getFallbackProducts()[0]
  const specs = row.specs ?? {}
  const extra = row.extra_data ?? {}
  const references = (extra.references ?? {}) as Record<string,unknown>
  return {
    ...fallback,
    slug: row.slug,
    href: `/products/${categorySlug}/${row.slug}`,
    code: text(row.model) || fallback.code,
    title: text(row.name_i18n?.en) || text(row.name) || fallback.title,
    summary: text(row.description_i18n?.en) || text(row.description) || fallback.summary,
    material: text(specs.Material) || fallback.material,
    dimensions: text(specs.Dimensions) || fallback.dimensions,
    moq: Number(extra.moq) || fallback.moq,
    moqLabel: Number(extra.moq) ? `${Number(extra.moq)} pcs` : fallback.moqLabel,
    references: { fmsi: list(references.fmsi), oe: list(references.oe), wva: list(references.wva), trw: list(references.trw) },
    image: { ...fallback.image, src: text(row.image_url) || fallback.image.src },
  }
}

export async function fetchProductsData(): Promise<ProductView[]> {
  const client = getSupabaseClient()
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  if (!client || !tenantId) return getFallbackProducts()
  const { data, error } = await client.from('products').select('slug,name,name_i18n,description,description_i18n,image_url,model,specs,extra_data').eq('tenant_id', tenantId).eq('is_active', true).order('sort_order')
  if (error || !data?.length) return getFallbackProducts()
  return (data as ProductRow[]).map(mapProduct)
}

export async function fetchProduct(slug: string) { return (await fetchProductsData()).find(item => item.slug === slug) }
export async function fetchCategories(): Promise<CategoryView[]> {
  const products = await fetchProductsData()
  return getFallbackCategories().map(category => ({ ...category, productCount: products.length, image: products[0]?.image ?? category.image }))
}
