import Image from 'next/image'

interface ImageProps {
  image: {
    url: string
    alt: string
  }
  caption?: string
  settings?: {
    width?: 'full' | 'large' | 'medium' | 'small'
    alignment?: 'left' | 'center' | 'right'
    rounded?: boolean
    shadow?: boolean
  }
}

const widthClasses = {
  full: 'max-w-full',
  large: 'max-w-5xl',
  medium: 'max-w-3xl',
  small: 'max-w-xl',
}

export default function ImageBlockServer({ image, caption, settings }: ImageProps) {
  const width = settings?.width || 'large'
  const alignment = settings?.alignment || 'center'
  const rounded = settings?.rounded || false
  const shadow = settings?.shadow || false

  const alignmentClass =
    alignment === 'center' ? 'mx-auto' : alignment === 'right' ? 'ml-auto' : 'mr-auto'

  const containerClasses = ['py-12', widthClasses[width], alignmentClass].join(' ')

  const imageClasses = ['w-full', rounded ? 'rounded-lg' : '', shadow ? 'shadow-lg' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={containerClasses}>
      <figure>
        <div className="relative aspect-[16/9]">
          <Image
            src={image?.url}
            alt={image?.alt}
            fill
            className={`object-cover ${imageClasses}`}
          />
        </div>
        {caption && (
          <figcaption className="mt-4 text-center text-sm italic text-gray-600 dark:text-gray-400">
            {caption}
          </figcaption>
        )}
      </figure>
    </div>
  )
}
