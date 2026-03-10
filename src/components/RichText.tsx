'use client'

import React from 'react'
import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'

type LexicalData = {
  root?: {
    type: string
    children: unknown[]
    [k: string]: unknown
  }
  [k: string]: unknown
}

type Props = {
  /** Serialized Lexical editor state from Payload (excerpt or content) */
  data: LexicalData | null | undefined
  className?: string
  /** If true, no wrapper div */
  disableContainer?: boolean
}

export default function RichText({ data, className, disableContainer }: Props) {
  if (!data?.root) return null
  return (
    <LexicalRichText
      data={data as unknown as Parameters<typeof LexicalRichText>[0]['data']}
      className={className}
      disableContainer={disableContainer}
    />
  )
}
