import { RootPage } from '@payloadcms/next/views'
import { importMap } from '@/app/(payload)/admin/importMap'
import config from '@/payload.config'

const normalizeParams = (params: { segments?: string[] }) => ({
  segments: params?.segments ?? [],
})

const normalizeSearchParams = (
  searchParams: Record<string, string | string[] | undefined>,
): Record<string, string | string[]> => {
  const entries = Object.entries(searchParams ?? {}).filter(([, value]) => value !== undefined)
  return Object.fromEntries(entries) as Record<string, string | string[]>
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  return RootPage({
    config: Promise.resolve(config),
    importMap,
    params: Promise.resolve(normalizeParams(resolvedParams)),
    searchParams: Promise.resolve(normalizeSearchParams(resolvedSearchParams)),
  })
}
