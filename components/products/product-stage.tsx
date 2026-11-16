import Image from 'next/image'
import type { ProductView } from '@/lib/data/products'
import { cn } from '@/lib/utils'

interface ProductStageProps {
  image: ProductView['image']
  className?: string
  priority?: boolean
  sizes?: string
}

export function ProductStage({
  image,
  className,
  priority,
  sizes = '(min-width: 1024px) 40vw, 90vw',
}: ProductStageProps) {
  return (
    <div
      className={cn(
        'relative aspect-square overflow-hidden bg-stage',
        className,
      )}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-contain mix-blend-multiply"
      />
    </div>
  )
}
