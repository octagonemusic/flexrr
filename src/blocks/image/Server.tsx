import Image from 'next/image'

interface ImageProps {
  image: {
    url: string
    alt: string
  }
}

export default function ImageBlockServer({ image }: ImageProps) {
  return (
    <div className="max-w-5xl py-20 text-center mx-auto">
      <Image src={image?.url} alt={image?.alt} width={1000} height={1000} className="mx-auto" />
    </div>
  )
}
