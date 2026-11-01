import type { Plant } from '@/core/service/companyPlantService'

export function getReservoirTabs(plants: Plant[]) {
  return plants.flatMap((plant) =>
    (plant.ListHoChua ?? []).map((reservoir) => ({
      id: reservoir.MaHoChua,
      name: reservoir.TenHoChua,
      currentLevel: reservoir.currentLevel,
      maxLevel: reservoir.maxLevel,
      referenceLevel: reservoir.referenceLevel,
      previousLevel: reservoir.previousLevel,
      plantId: plant.plantId,
      reservoirCount: plant.ListHoChua?.length ?? 0,
      symbol: plant.symbol,
      color: plant.color,
    })),
  )
}
