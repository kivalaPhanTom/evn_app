import React, { createContext, useContext, ReactNode, useMemo } from 'react'

/**
 * Context chia sẻ "có đang trong viewport không" cho các component sâu trong cây.
 * Parent (HomeContent/FactoryDetail) quyết định dựa trên scrollY.
 * Children dùng để stop/start Animated.loop để giảm CPU khi ra khỏi viewport.
 *
 * Mặc định: true (luôn coi là trong viewport) để tránh stop animation nhầm.
 */
type VisibilityMap = {
  hydrology: boolean
}

const defaultValue: VisibilityMap = {
  hydrology: true,
}

const VisibilityContext = createContext<VisibilityMap>(defaultValue)

export function VisibilityProvider({
  value,
  children,
}: {
  value: VisibilityMap
  children: ReactNode
}) {
  const memoValue = useMemo<VisibilityMap>(
    () => value,
    [value.hydrology],
  )
  return <VisibilityContext.Provider value={memoValue}>{children}</VisibilityContext.Provider>
}

export function useVisibility(): VisibilityMap {
  return useContext(VisibilityContext)
}
