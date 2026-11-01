import { prefix_api, prefix_api_v2 } from '../constants/vars'
import { apiFormUrlEncoded, api, get } from './api.service'

export const Service = {
  getHydrologyGraphicChartApi,
  getHydrologyFlowApi,
  getInflowOutflowApi,
  getHydrologyPlantsParamApi,
  getHydrologyPlantsInfoApi,
  getUpstreamWaterLevelApi,
  getInflowApi,
  getOutflowApi,
  getTurbineFlowApi,
  getPowerStoreInLake,
  getOperateWaterLevel,
  getPowerStoreInLakeFactDetail,
  getUpstreamWaterLevelApi_2,
  getUpstreamWaterLevelApi_3,
  getInflowApi_2,
  getInflowApi_3,
  getOutflowApi_2,
  getOutflowApi_3,
  getTurbineFlowApi_2,
  getTurbineFlowApi_3,
}
export const servicePattern = {
  getHydrographicChart: `${prefix_api_v2}/hydrographic_chart`,
  getHydrologyFlow: `${prefix_api}/FlowDiagram`,
  getInflowOutflow: `${prefix_api_v2}/InflowOutflow_v2`,
  getHydrologyPlantsParam: `${prefix_api_v2}/hydrologyplant_detail`,
  getHydrologyPlantsInfo: `${prefix_api}/HydrologyPlantInformation`,
  getUpstreamWaterLevel: `${prefix_api}/GetUpstreamWaterLevel`,
  getInflow: `${prefix_api}/getInflow`,
  getOutflow: `${prefix_api}/getOutflow`,
  getTurbineflow: `${prefix_api}/getTurbineflow`,
  getPowerStoreInLake: `${prefix_api}/PowerStoreInLake`,
  getPowerStoreInLakeFactDetail: `${prefix_api}/PowerStoreInLakeOfFactory`,
  getOperateWaterLevel: `${prefix_api}/GetOperateWaterLevel`,
}
function getHydrologyGraphicChartApi(maHoChua: string, type: string) {
  const url = servicePattern.getHydrographicChart
  const params = { type, mahochua: maHoChua }
  return apiFormUrlEncoded.get(url, { params })
}
function getHydrologyFlowApi(currentPlantId: string, date: string) {
  return apiFormUrlEncoded.get(`${servicePattern.getHydrologyFlow}?currentPlantId=${currentPlantId}&date=${date}`)
}

function getInflowOutflowApi(plantId: string | number, companyId: string, maHoChua?: string) {
  const url = servicePattern.getInflowOutflow
  const params: { currentPlantId: string; companyId: string; mahochua?: string } = {
    currentPlantId: String(plantId),
    companyId,
  }
  if (maHoChua) params.mahochua = maHoChua
  return apiFormUrlEncoded.get(url, { params })
}
async function getHydrologyPlantsParamApi(currentPlantId?: string, maHoChua?: string) {
  const params: { currentPlantId?: string; mahochua?: string } = {}
  if (currentPlantId) {
    params.currentPlantId = currentPlantId
  }
  if (maHoChua) {
    params.mahochua = maHoChua
  }
  const response = await api.get(`${servicePattern.getHydrologyPlantsParam}`, {
    params: params
  })
  return response
}

function getHydrologyPlantsInfoApi(plantId: string, date: string) {
  return api.get(`${servicePattern.getHydrologyPlantsInfo}?currentPlantId=${plantId}&date=${date}`)
}

function getUpstreamWaterLevelApi(currentPlantId: string, date: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getUpstreamWaterLevel}?currentPlantId=${encodeURIComponent(currentPlantId)}&date=${encodeURIComponent(date)}`,
  )
}
function getInflowApi(currentPlantId: string, date: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getInflow}?currentPlantId=${encodeURIComponent(currentPlantId)}&date=${encodeURIComponent(date)}`,
  )
}
function getOutflowApi(currentPlantId: string, date: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getOutflow}?currentPlantId=${encodeURIComponent(currentPlantId)}&date=${encodeURIComponent(date)}`,
  )
}
function getTurbineFlowApi(currentPlantId: string, date: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getTurbineflow}?currentPlantId=${encodeURIComponent(currentPlantId)}&date=${encodeURIComponent(date)}`,
  )
}
function getPowerStoreInLake() {
  return apiFormUrlEncoded.get(
    `${servicePattern.getPowerStoreInLake}`,
  )
}

function getPowerStoreInLakeFactDetail(currentPlantId: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getPowerStoreInLakeFactDetail}`, {
    params: {
      currentPlantId: currentPlantId,
    }
  }
  )
}

function getOperateWaterLevel(selectedMonth: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getOperateWaterLevel}?selectedMonth=${selectedMonth}`,
  )
}

function getUpstreamWaterLevelApi_2(currentPlantId: string, currentDate: string, compareDate: string, type: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getUpstreamWaterLevel}_v2`, {
    params: {
      currentPlantId: currentPlantId,
      currentDate: currentDate,
      compareDate: compareDate,
      type: type
    }
  }
  )
}

function getUpstreamWaterLevelApi_3(currentPlantId: string, currentFromDate: string, currentToDate: string, compareFromDate: string, compareToDate: string, type: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getUpstreamWaterLevel}_v3`, {
    params: {
      currentPlantId: currentPlantId,
      currentFromDate: currentFromDate,
      currentToDate: currentToDate,
      compareFromDate:compareFromDate,
      compareToDate: compareToDate,
      type: type
    }
  }
  )
}


function getInflowApi_2(currentPlantId: string, currentDate: string, compareDate: string,  type: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getInflow}_v2`, {
    params: {
      currentPlantId: currentPlantId,
      currentDate: currentDate,
      compareDate: compareDate,
      type: type
    }
  }
  )
}

function getInflowApi_3(currentPlantId: string, currentFromDate: string, currentToDate: string, compareFromDate: string, compareToDate: string, type: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getInflow}_v3`, {
    params: {
      currentPlantId: currentPlantId,
      currentFromDate: currentFromDate,
      currentToDate: currentToDate,
      compareFromDate: compareFromDate,
      compareToDate: compareToDate,
      type: type
    }
  }
  )
}

function getOutflowApi_2(currentPlantId: string, currentDate: string, compareDate: string,  type: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getOutflow}_v2`, {
    params: {
      currentPlantId: currentPlantId,
      currentDate: currentDate,
      compareDate: compareDate,
      type: type
    }
  }
  )
}
function getOutflowApi_3(currentPlantId: string, currentFromDate: string, currentToDate: string, compareFromDate: string, compareToDate: string, type: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getOutflow}_v3`, {
    params: {
      currentPlantId: currentPlantId,
      currentFromDate: currentFromDate,
      currentToDate: currentToDate,
      compareFromDate: compareFromDate,
      compareToDate: compareToDate,
      type: type
    }
  }
  )
}
function getTurbineFlowApi_2(currentPlantId: string, currentDate: string, compareDate: string, type: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getTurbineflow}_v2`, {
    params: {
      currentPlantId: currentPlantId,
      currentDate: currentDate,
      compareDate: compareDate,
      type: type
    }
  }
  )
}
function getTurbineFlowApi_3(currentPlantId: string, currentFromDate: string, currentToDate: string, compareFromDate: string, compareToDate: string, type: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getTurbineflow}_v3`, {
    params: {
       currentPlantId: currentPlantId,
      currentFromDate: currentFromDate,
      currentToDate: currentToDate,
      compareFromDate: compareFromDate,
      compareToDate: compareToDate,
      type: type
    }
  }
  )
}
