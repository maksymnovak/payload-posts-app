import { RenderAdmin } from '@payloadcms/next/views'
import { importMap } from '@/importMap'
import config from '@/payload.config'

const Page = ({ params, searchParams }: { params: any; searchParams: any }) => {
  return <RenderAdmin config={config} importMap={importMap} params={params} searchParams={searchParams} />
}

export default Page

