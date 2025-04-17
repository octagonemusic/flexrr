import { LexicalDocument, serialize } from '@/utils/serialize'

interface RichTextProps {
  content: LexicalDocument | null | undefined
}

export default function RichTextBlockServer({ content }: RichTextProps) {
  return (
    <div className="max-w-5xl mx-auto px-4">
      <div
        className="prose prose-lg max-w-none"
        style={
          {
            '--tw-prose-body': 'var(--color-text-primary)',
            '--tw-prose-headings': 'var(--color-text-primary)',
            '--tw-prose-links': 'var(--color-accent-primary)',
          } as React.CSSProperties
        }
      >
        {serialize(content)}
      </div>
    </div>
  )
}
