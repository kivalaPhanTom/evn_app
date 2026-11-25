import { usePlantSelection } from '@/core/hooks/use-plant-selection'
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

function TechInfo() {
    const dispatch = useAppDispatch()
    const { isLoadingTechInfo, techInfo } = useAppSelector((state: RootState) => state.techInfoSlice)
    const { currentPlantId } = useLocalSearchParams<{
        currentPlantId?: string
    }>()
    const { tabs, currentPlantId: activeTab, selectPlant } = usePlantSelection(currentPlantId)
    useEffect(() => {

        if (activeTab) {
            dispatch(getTechInfo({ currentPlantId: activeTab }))
        }

    }, [activeTab])
    
    const data = techInfo.map(item => ({
        label: item.label,
        value: `${item.value} ${item.unit !== "-" ? `(${(item.unit)})` :""}`
    }))

    return (
        <SectionContainer
            title="Thông số kỹ thuật"
        >
            <View
            >
                <ScrollableTabBar tabs={tabs} activeTab={activeTab} onTabChange={selectPlant} />
                <TechnologyInfo data={data} isLoading={isLoadingTechInfo}/>
            </View>
        </SectionContainer>
    )
}

export default TechInfo