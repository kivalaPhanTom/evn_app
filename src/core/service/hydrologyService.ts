import { prefix_api } from '../constants/vars'
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
  getHydrographicChart: `${prefix_api}/hydrographic_chart`,
  getHydrologyFlow: `${prefix_api}/FlowDiagram`,
  getInflowOutflow: `${prefix_api}/InflowOutflow_v2`,
  getHydrologyPlantsParam: `${prefix_api}/hydrologyplant_detail`,
  getHydrologyPlantsInfo: `${prefix_api}/HydrologyPlantInformation`,
  getUpstreamWaterLevel: `${prefix_api}/GetUpstreamWaterLevel`,
  getInflow: `${prefix_api}/getInflow`,
  getOutflow: `${prefix_api}/getOutflow`,
  getTurbineflow: `${prefix_api}/getTurbineflow`,
  getPowerStoreInLake: `${prefix_api}/PowerStoreInLake`,
  getPowerStoreInLakeFactDetail: `${prefix_api}/PowerStoreInLakeOfFactory`,
  getOperateWaterLevel: `${prefix_api}/GetOperateWaterLevel`,
}
function getHydrologyGraphicChartApi(companyId: string, type: string) {
  return apiFormUrlEncoded.get(`${servicePattern.getHydrographicChart}/${companyId}`, {
    params: {
      type: type ? type : null,
    }
  })
}
function getHydrologyFlowApi(currentPlantId: string, date: string) {
  return apiFormUrlEncoded.get(`${servicePattern.getHydrologyFlow}?currentPlantId=${currentPlantId}&date=${date}`)
}

function getInflowOutflowApi(hydroElectricId: string) {
  return apiFormUrlEncoded.get(
    `${servicePattern.getInflowOutflow}?currentPlantId=${encodeURIComponent(hydroElectricId)}`,
  )
}
function getHydrologyPlantsParamApi(currentPlantId?: string) {
  const params: { currentPlantId?: string } = {}
  if (currentPlantId) {
    params.currentPlantId = currentPlantId
  }
  return api.get(`${servicePattern.getHydrologyPlantsParam}`, {
    params: params
  })
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