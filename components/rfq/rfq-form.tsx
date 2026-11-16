'use client'

import { useId, useState } from 'react'
import { CheckCircle2, Loader2, TriangleAlert } from 'lucide-react'
import { company } from '@/lib/site'
import { cn } from '@/lib/utils'
import { InquiryCaptchaField } from './inquiry-captcha-field'

type Status = 'idle' | 'submitting' | 'success' | 'error'
type Errors = Partial<Record<'name' | 'email' | 'company' | 'model', string>>

interface RfqFormProps {
  variant?: 'short' | 'full'
  defaultModel?: string
}

const inputClass =
  'h-12 w-full rounded-sm border border-input bg-paper px-3.5 text-base text-ink transition-colors placeholder:text-slate/70 hover:border-ink/50 focus-visible:border-yj-blue focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-yj-blue aria-[invalid=true]:border-destructive'

const drawingOptions = [
  'I have a drawing',
  'I have a physical sample',
  'I only have a model or cross-reference',
  'Not sure yet',
]

function Field({
  label,
  error,
  required,
  hint,
  children,
  id,
}: {
  label: string
  error?: string
  required?: boolean
  hint?: string
  children: React.ReactNode
  id: string
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-ink">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error && <p className="mt-1.5 text-xs text-slate">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function RfqForm({ variant = 'full', defaultModel = '' }: RfqFormProps) {
  const uid = useId()
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})
  const [captchaRefreshKey, setCaptchaRefreshKey] = useState(0)
  const full = variant === 'full'
  const id = (name: string) => `${uid}-${name}`

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    const next: Errors = {}
    if (!data.name?.trim()) next.name = 'Enter your name.'
    if (!data.email?.trim()) next.email = 'Enter your business email.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      next.email = 'Enter a valid email address.'
    if (!data.company?.trim()) next.company = 'Enter your company name.'
    if (!data.model?.trim())
      next.model = 'Enter a model, cross-reference or short description.'
    setErrors(next)
    if (Object.keys(next).length > 0) {
      const first = Object.keys(next)[0]
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus()
      return
    }

    setStatus('submitting')
    try {
      const response = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus(response.ok ? 'success' : 'error')
      if (!response.ok) setCaptchaRefreshKey((value) => value + 1)
    } catch {
      setStatus('error')
      setCaptchaRefreshKey((value) => value + 1)
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="border border-yj-blue/30 bg-yj-tint p-8">
        <CheckCircle2 aria-hidden="true" className="size-8 text-yj-blue" />
        <h3 className="display-md mt-4 text-ink">Request received</h3>
        <p className="mt-3 max-w-md leading-relaxed text-slate">
          Thank you. Our team will review your request and reply to the email
          address you provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 inline-flex min-h-11 items-center rounded-sm border border-yj-blue/40 px-5 text-sm font-semibold text-yj-blue transition-colors hover:border-yj-blue hover:bg-white active:bg-yj-tint"
        >
          Send another request
        </button>
      </div>
    )
  }

  const submitting = status === 'submitting'

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6" aria-busy={submitting}>
      {status === 'error' && (
        <div
          role="alert"
          className="flex gap-3 border border-destructive/40 bg-[#fbeeec] p-4 text-sm text-ink"
        >
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-destructive" />
          <p>
            We could not send your request. Your details are still in the form.
            Please try again, or email{' '}
            <a
              href={`mailto:${company.email}`}
              className="font-semibold text-yj-blue underline underline-offset-4"
            >
              {company.email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={id('name')} label="Name" required error={errors.name}>
          <input
            id={id('name')}
            name="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${id('name')}-error` : undefined}
            className={inputClass}
          />
        </Field>
        <Field id={id('email')} label="Business email" required error={errors.email}>
          <input
            id={id('email')}
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${id('email')}-error` : undefined}
            className={inputClass}
          />
        </Field>
        <Field id={id('company')} label="Company" required error={errors.company}>
          <input
            id={id('company')}
            name="company"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? `${id('company')}-error` : undefined}
            className={inputClass}
          />
        </Field>
        <Field
          id={id('model')}
          label="Model or cross-reference"
          required
          error={errors.model}
          hint="FMSI, OE, WVA or TRW number, or a short description."
        >
          <input
            id={id('model')}
            name="model"
            defaultValue={defaultModel}
            aria-invalid={Boolean(errors.model)}
            aria-describedby={errors.model ? `${id('model')}-error` : undefined}
            className={inputClass}
          />
        </Field>
        <Field id={id('quantity')} label="Estimated quantity" hint="Pieces per order, if known.">
          <input
            id={id('quantity')}
            name="quantity"
            inputMode="numeric"
            className={inputClass}
          />
        </Field>
        {full && (
          <Field id={id('drawing')} label="Drawing or specification">
            <select
              id={id('drawing')}
              name="drawing"
              defaultValue={drawingOptions[2]}
              className={cn(inputClass, 'pr-8')}
            >
              {drawingOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </Field>
        )}
      </div>

      <Field id={id('message')} label="Message">
        <textarea
          id={id('message')}
          name="message"
          rows={full ? 6 : 4}
          className={cn(inputClass, 'h-auto py-3 leading-relaxed')}
        />
      </Field>

      <InquiryCaptchaField refreshKey={captchaRefreshKey} />

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm border border-yj-blue bg-yj-blue px-7 text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-yj-blue-deep active:translate-y-px disabled:cursor-wait disabled:opacity-80"
        >
          {submitting && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
          {submitting ? 'Sending…' : 'Send Request'}
        </button>
        <p className="max-w-xs text-xs leading-relaxed text-slate">
          Quotes are prepared by our team. This form does not take payment.
        </p>
      </div>
    </form>
  )
}
