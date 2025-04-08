import React, { ReactNode } from 'react'
import escapeHTML from 'escape-html'
import Link from 'next/link'
import Image from 'next/image'

// Define more specific types for the Lexical document structure
interface LexicalTextNode {
  type: 'text'
  text: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  code?: boolean
  subscript?: boolean
  superscript?: boolean
  isInline?: boolean
}

interface LexicalLinkNode {
  type: 'link'
  url: string
  newTab?: boolean
  children: LexicalNode[]
}

interface LexicalListNode {
  type: 'list'
  listType: 'number' | 'bullet'
  children: LexicalNode[]
}

interface LexicalListItemNode {
  type: 'listitem'
  children: LexicalNode[]
}

interface LexicalHeadingNode {
  type: 'heading'
  tag: string | number
  children: LexicalNode[]
}

interface LexicalParagraphNode {
  type: 'paragraph'
  children: LexicalNode[]
}

interface LexicalQuoteNode {
  type: 'quote'
  children: LexicalNode[]
}

interface LexicalUploadNode {
  type: 'upload'
  fields: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
}

interface LexicalHrNode {
  type: 'hr'
}

interface LexicalLinebreakNode {
  type: 'linebreak'
}

// Union type for all possible node types
type LexicalNode =
  | LexicalTextNode
  | LexicalLinkNode
  | LexicalListNode
  | LexicalListItemNode
  | LexicalHeadingNode
  | LexicalParagraphNode
  | LexicalQuoteNode
  | LexicalUploadNode
  | LexicalHrNode
  | LexicalLinebreakNode

// Document root structure
export interface LexicalDocument {
  root: {
    children: LexicalNode[]
    type: string
    direction: 'ltr' | 'rtl' | null
    format?: string
    indent?: number
    version?: number
  }
}

export const serialize = (content: LexicalDocument | null | undefined): ReactNode => {
  if (!content) return null
  if (!content.root || !content.root.children) return null

  return serializeNodes(content.root.children)
}

const serializeNodes = (nodes: LexicalNode[]): ReactNode => {
  return nodes.map((node, i) => {
    if (node.type === 'text') {
      const text = node.text || ''

      // Escape the HTML in text nodes
      const safeText = escapeHTML(text)

      if (text.trim().length === 0 && !node.isInline) {
        return null
      }

      // Handle text formatting
      if (node.bold) {
        return <strong key={i}>{safeText}</strong>
      } else if (node.italic) {
        return <em key={i}>{safeText}</em>
      } else if (node.underline) {
        return <u key={i}>{safeText}</u>
      } else if (node.strikethrough) {
        return <s key={i}>{safeText}</s>
      } else if (node.code) {
        return <code key={i}>{safeText}</code>
      } else if (node.subscript) {
        return <sub key={i}>{safeText}</sub>
      } else if (node.superscript) {
        return <sup key={i}>{safeText}</sup>
      }

      return <span key={i}>{safeText}</span>
    }

    if (node.type === 'link') {
      return (
        <Link
          key={i}
          href={node.url || '#'}
          target={node.newTab ? '_blank' : undefined}
          rel={node.newTab ? 'noopener noreferrer' : undefined}
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          {serializeNodes(node.children)}
        </Link>
      )
    }

    if (node.type === 'list') {
      const ListElement = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListElement key={i} className={node.listType === 'number' ? 'list-decimal' : 'list-disc'}>
          {serializeNodes(node.children)}
        </ListElement>
      )
    }

    if (node.type === 'listitem') {
      return <li key={i}>{serializeNodes(node.children)}</li>
    }

    if (node.type === 'heading') {
      // Add debug to see the actual tag value
      console.log('Heading node:', node)

      const tagLevel =
        typeof node.tag === 'number'
          ? node.tag
          : typeof node.tag === 'string'
            ? node.tag.charAt(1) === 'h'
              ? parseInt(node.tag.substring(2), 10) // For format "h1"
              : parseInt(node.tag.charAt(1), 10) // For format "h1"
            : 2
      // Use a switch with explicit numerical comparisons
      switch (tagLevel) {
        case 1:
          return (
            <h1 key={i} className="text-4xl font-extrabold mt-8 mb-4">
              {serializeNodes(node.children)}
            </h1>
          )
        case 2:
          return (
            <h2 key={i} className="text-3xl font-bold mt-6 mb-3">
              {serializeNodes(node.children)}
            </h2>
          )
        case 3:
          return (
            <h3 key={i} className="text-2xl font-semibold mt-5 mb-2">
              {serializeNodes(node.children)}
            </h3>
          )
        case 4:
          return (
            <h4 key={i} className="text-xl font-semibold mt-4 mb-2">
              {serializeNodes(node.children)}
            </h4>
          )
        case 5:
          return (
            <h5 key={i} className="text-lg font-medium mt-3 mb-1">
              {serializeNodes(node.children)}
            </h5>
          )
        case 6:
          return (
            <h6 key={i} className="text-base font-medium mt-3 mb-1">
              {serializeNodes(node.children)}
            </h6>
          )
        default:
          // Log unknown tag values
          console.warn(`Unknown heading tag value: ${node.tag} (type: ${typeof node.tag})`)
          return (
            <h2 key={i} className="text-3xl font-bold mt-6 mb-3">
              {serializeNodes(node.children)}
            </h2>
          )
      }
    }

    if (node.type === 'paragraph') {
      return <p key={i}>{serializeNodes(node.children)}</p>
    }

    if (node.type === 'quote') {
      return <blockquote key={i}>{serializeNodes(node.children)}</blockquote>
    }

    if (node.type === 'upload') {
      const { fields } = node
      if (fields?.url) {
        return (
          <div className="my-6" key={i}>
            <Image
              src={fields.url}
              alt={fields.alt || ''}
              width={fields.width || 1000}
              height={fields.height || 800}
              className="rounded-md"
            />
            {fields.alt && <p className="text-sm text-gray-400 mt-2">{fields.alt}</p>}
          </div>
        )
      }
      return null
    }

    if (node.type === 'hr') {
      return <hr key={i} className="my-6 border-gray-700" />
    }

    if (node.type === 'linebreak') {
      return <br key={i} />
    }

    return null
  })
}
