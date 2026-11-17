import { useState } from 'react'
import { useAppSelector } from '@/core/redux/hooks'

type PlantCapability = 'hasHydrology' | 'hasRevenue' | 'hasProfit'

export function usePlantSelection(requestedPlantId?: string, capability?: PlantCapability) {
  const { plants, selectedCompanyId } = useAppSelector((state) => state.companyPlantSlice)
  const [selection, setSelection] = useState<{
    companyId: string | null
    requestedPlantId?: string
    plantId: string
  } | null>(null)
  const availablePlants = plants.filter(
    (plant) => plant.companyId === selectedCompanyId && (!capability || plant[capability]),
  )
  const selectedId = selection?.companyId === selectedCompanyId && selection?.requestedPlantId === requestedPlantId
    ? selection.plantId
    : requestedPlantId
  const plant = availablePlants.find(
    (item) => String(item.plantId) === selectedId || item.symbol === selectedId || item.abbreviation === selectedId,
  ) ?? availablePlants[0]

  return {
    plant,
    currentPlantId: plant ? String(plant.plantId) : '',
    tabs: availablePlants.map((item) => ({ id: String(item.plantId), label: item.plantName })),
    selectPlant: (plantId: string) => setSelection({ companyId: selectedCompanyId, requestedPlantId, plantId }),
  }
}
