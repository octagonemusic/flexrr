interface ServerProps {
  title: string
  subtitle: string
}

export default function CoverBlockServer({ title, subtitle }: ServerProps) {
  return (
    <div className="max-w-5xl py-20 text-center mx-auto">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-xl text-gray-600">{subtitle}</p>
    </div>
  )
}
