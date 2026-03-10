/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import config from '@payload-config'
import { GRAPHQL_POST } from '@payloadcms/next/routes'
import type { NextRequest } from 'next/server'

export const POST = GRAPHQL_POST(config)

// Fix for Next.js 15.5.9 type compatibility - GraphQL route doesn't need slug params
export const OPTIONS = async (_request: NextRequest, _context: { params: Promise<Record<string, never>> }) => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
