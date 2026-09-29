import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import ScrollableTabBar from '@/components/ScrollableTabBar/ScrollableTabBar.component'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { getTechInfo, getTechInfoDetail } from '@/core/redux/domains/technology'
import { useRouter } from 'expo-router'
import { useLocalSearchParams } from 'expo-router'
import TechnologyInfo from '@/components/TechnologyInfo/TechnologyInfo'

function getCurrentPlantId(activeTab: string): string {
    let result: string = ''
    switch (activeTab) {
        case 'buon-tua-srah':
            result = 'BTS'
            break
        case 'buon-kuop':
            result = 'BK'
            break
        case 'srepok-3':
            result = 'SP3'
            break
        default:
            break
    }
    return result
}
interface TechInfoDetailProps {
    currentPlantId: string
    keyTab: number
}
function TechInfoDetail(props: TechInfoDetailProps) {
    const dispatch = useAppDispatch()
    const { isLoadingTechInfoDetail, techInfoDetail } = useAppSelector((state: RootState) => state.techInfoSlice)
    const { activeTabIndex } = useAppSelector((state: RootState) => state.powerSlice)
    const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
    const { currentPlantId, keyTab } = props
    const data = techInfoDetail.map(item => ({
        label: item.Name,
        value: `${item.Value} ${item.UoM !== "-" ? `(${(item.UoM)})` : ""}`
    }))

    useEffect(() => {
        if (activeTabIndex === keyTab) {
            dispatch(getTechInfoDetail({ currentPlantId }))
        }
    }, [dispatch, currentPlantId, activeTabIndex, keyTab, countRefesh])
    return (
        <SectionContainer
            title="Thông số kỹ thuật"
        >
            <View
            >
                <TechnologyInfo data={data} isLoading={isLoadingTechInfoDetail} />
            </View>
        </SectionContainer>
    )
}

export default TechInfoDetail