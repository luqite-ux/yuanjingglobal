import { ChevronDown } from 'lucide-react'

interface FaqProps {
  items: readonly { question: string; answer: string }[]
}

export function Faq({ items }: FaqProps) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-6 px-1 py-4 text-left text-lg font-medium text-ink transition-colors duration-150 hover:bg-yj-tint/60 hover:text-yj-blue-deep active:bg-yj-tint">
            {item.question}
            <ChevronDown
              aria-hidden="true"
              className="faq-chevron size-5 shrink-0 text-yj-blue transition-transform duration-200"
            />
          </summary>
          <p className="max-w-2xl px-1 pb-6 leading-relaxed text-slate">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  )
}
