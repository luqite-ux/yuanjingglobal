import { NextResponse } from 'next/server'

// Placeholder until secure server submission and image CAPTCHA are connected.
export async function POST() {
  return NextResponse.json(
    { ok: false, error: 'Quote submission is not connected yet.' },
    { status: 501 },
  )
}
