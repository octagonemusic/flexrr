import { LexicalDocument, serialize } from '@/utils/serialize'

interface RichTextProps {
  content: LexicalDocument | null | undefined
}

export default function RichTextBlockServer({ content }: RichTextProps) {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="prose prose-invert prose-lg max-w-none">{serialize(content)}</div>
    </div>
  )
}
