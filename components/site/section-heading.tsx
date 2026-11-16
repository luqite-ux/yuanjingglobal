import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: React.ReactNode
  children?: React.ReactNode
  className?: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="display-lg mt-4 text-balance text-ink">
        {title}
      </h2>
      {children && (
        <div className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
          {children}
        </div>
      )}
    </div>
  )
}
