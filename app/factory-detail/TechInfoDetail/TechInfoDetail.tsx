import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/core/redux/store'
import ScrollableTabBar from '@/components/ScrollableTabBar/ScrollableTabBar.component'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { getTechInfo, getTechInfoDetail } from '@/core/redux/Actions/TechInfoActions'
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
    const dispatch = useDispatch()
    const { isLoadingTechInfoDetail, techInfoDetail } = useSelector((state: RootState) => state.techInfoSlice)
    const { activeTabIndex } = useSelector((state: RootState) => state.powerSlice)
    const { countRefesh } = useSelector((state: any) => state.refreshSlice)
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