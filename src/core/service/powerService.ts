import { api } from './api.service'
import {prefix_api} from '../constants/vars'

export const Service = {
    getPowerOverviewApi,
}
export const servicePattern = {
    getPowerOverview: `${prefix_api}/overview`,
}

function getPowerOverviewApi() {
    return api.get(`${servicePattern.getPowerOverview}`)
}