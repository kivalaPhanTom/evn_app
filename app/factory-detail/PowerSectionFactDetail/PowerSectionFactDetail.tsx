import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import { RootState } from '@/core/redux/store'
// import TotalPower from './TotalPower/TotalPower'
// import PowerRecentDays from './PowerRecentDays/PowerRecentDays'
import styles from './PowerSectionFactDetail.styles'
// import PowerByHours from './PowerByHours/PowerByHours'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { getPowerOverivew } from '@/core/redux/Actions/PowerActions'
import TotalPowerFactDetail from './TotalPowerFactDetail/TotalPowerFactDetail'
import PowerByHoursFactDetail from './PowerByHoursFactDetail/PowerByHoursFactDetail'
import PowerRecentDaysFacrDetail from './PowerRecentDaysFactDetail/PowerRecentDaysFactDetail'
interface Props {
    currentPlantId: string
    keyTab: number
}
function PowerSectionFactDetail(props: Props) {
    const { currentPlantId, keyTab } = props
    
    return (
        <SectionContainer title="Công Suất (P)">
            <View>
                <View style={styles.section}>
                    <TotalPowerFactDetail
                        currentPlantId={currentPlantId}
                        keyTab={keyTab}
                    />
                </View>
                <View style={styles.section}>
                    <PowerByHoursFactDetail
                        currentPlantId={currentPlantId}
                        keyTab={keyTab}
                    />
                </View>
                <View style={styles.section}>
                    <PowerRecentDaysFacrDetail
                        currentPlantId={currentPlantId}
                        keyTab={keyTab}
                    />
                </View>
            </View>
        </SectionContainer>
    )
}

export default PowerSectionFactDetail
