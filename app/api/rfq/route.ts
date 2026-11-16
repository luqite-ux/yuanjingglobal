import { NextResponse } from 'next/server'
import { createSupabaseCaptchaContextFromEnv, verifyCaptchaSubmission } from '@/lib/inquiry-captcha'
import { getAdminSupabase } from '@/lib/supabase/server'

export async function POST(request: Request) {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  const secret = process.env.CAPTCHA_SECRET?.trim()
  if (!tenantId || !secret) return NextResponse.json({ error: 'Inquiry service unavailable' }, { status: 503 })
  let body: Record<string, unknown>
  try { body = await request.json() as Record<string, unknown> } catch { return NextResponse.json({ error: 'Invalid request' }, { status: 400 }) }
  const read = (key: string) => String(body[key] ?? '').trim()
  if (!read('name') || !read('email') || !read('company') || !read('model')) return NextResponse.json({ error: 'Required details are missing' }, { status: 400 })
  let captcha
  try {
    captcha = await verifyCaptchaSubmission({ secret, ...createSupabaseCaptchaContextFromEnv(), scope: read('captchaScope'), token: read('captchaToken'), answer: read('captchaAnswer') })
  } catch { return NextResponse.json({ error: 'Captcha service unavailable' }, { status: 503 }) }
  if (!captcha.ok) return NextResponse.json({ error: 'Captcha verification failed', captchaCode: captcha.code }, { status: 400 })
  const details = [read('drawing') && `Drawing or specification: ${read('drawing')}`, read('quantity') && `Estimated quantity: ${read('quantity')}`, read('message')].filter(Boolean).join('\n')
  const { error } = await getAdminSupabase().from('inquiries').insert({ tenant_id: tenantId, name: read('name'), email: read('email'), company: read('company'), phone: '', subject: `RFQ · ${read('model')}`, message: details || `Model / reference: ${read('model')}` })
  if (error) return NextResponse.json({ error: 'Unable to save inquiry' }, { status: 500 })
  return NextResponse.json({ ok: true }, { status: 201 })
}
