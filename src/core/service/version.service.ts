import { get } from '@/core/service/api.service'

export interface VersionResult {
  latestVersion: string
  forceUpdate: boolean
  message?: string
  storeUrl?: {
    ios?: string
    android?: string
  }
}

export interface VersionResponse {
  Result: VersionResult
}

export async function checkAppVersion(platform: string, version: string): Promise<VersionResponse> {
  const res = await get<VersionResponse>(`/api/API/App_Version?platform=${platform}&version=${version}`)
  return res.data
}

export default { checkAppVersion }
