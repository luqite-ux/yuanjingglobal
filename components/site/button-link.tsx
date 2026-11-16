import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

const variants = {
  primary:
    'bg-yj-blue text-white hover:bg-yj-blue-deep active:bg-[#061f5e] border border-yj-blue',
  light:
    'bg-white text-yj-blue hover:bg-yj-tint active:bg-[#d3dcf0] border border-white',
  outline:
    'bg-transparent text-yj-blue border border-yj-blue/40 hover:border-yj-blue hover:bg-yj-tint active:bg-[#d3dcf0]',
  quiet: 'bg-transparent text-ink border border-transparent hover:bg-ink/5',
} as const

interface ButtonLinkProps extends React.ComponentProps<typeof Link> {
  variant?: keyof typeof variants
  arrow?: boolean
}

export function ButtonLink({
  variant = 'primary',
  arrow = true,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        'group/btn inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-5 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 active:translate-y-px',
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-150 group-hover/btn:translate-x-0.5"
        />
      )}
    </Link>
  )
}
