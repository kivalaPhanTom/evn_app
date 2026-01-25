import { api } from './api.service'

export const Service = {
    getModulesApi,
}

function getModulesApi(username: string) {
  return api.get(`api/users/${username}/modules`)
}
