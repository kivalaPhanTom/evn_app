import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/core/redux/store'
import ScrollableTabBar from '@/components/ScrollableTabBar/ScrollableTabBar.component'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
// import { getTechInfo, getTechInfoDetail } from '../Actions/TechInfoActions'
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
function TechInfo() {
    const dispatch = useDispatch()
    const { isLoadingTechInfo } = useSelector((state: RootState) => state.techInfoSlice)
    const { currentPlantId } = useLocalSearchParams<{
        currentPlantId?: string
    }>()
    const [activeTab, setActiveTab] = useState<string>(currentPlantId ?? 'BTS')
    const hydrologyPlants = {
        plantsData: [
            { abbreviation: 'buon-tua-srah', name: 'Buôn Tua Srah' },
            { abbreviation: 'buon-kuop', name: 'Buôn Kuốp' },
            { abbreviation: 'srepok-3', name: 'Srepok 3' },
        ],
    }
    const tabs = hydrologyPlants?.plantsData?.map((plant) => {
        const plantId = getCurrentPlantId(plant.abbreviation)
        return {
            id: plantId,
            label: plant.name,
        }
    })
    useEffect(() => {

        if (activeTab) {
            dispatch(getTechInfo({ currentPlantId: activeTab }))
        }

    }, [activeTab])
    const data = [
        { label: "Diện tích lưu vực", value: "2.93 km²" },
        { label: "Mực nước dâng bình thường", value: "487.5 m" },
        { label: "Cao trình đỉnh đập", value: "492.3 m" },
        { label: "Chiều dài đập tràn theo đỉnh", value: "45 m" },
        { label: "Lưu lượng thiết kế", value: "204.9 m³/s" },
    ];

    return (
        <SectionContainer
            title="Thông số kỹ thuật"
        >
            <View
            >
                <ScrollableTabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
                <TechnologyInfo data={data} isLoading={isLoadingTechInfo}/>
            </View>
        </SectionContainer>
    )
}

export default TechInfo