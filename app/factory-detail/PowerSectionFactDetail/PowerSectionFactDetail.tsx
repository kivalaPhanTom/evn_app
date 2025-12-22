import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
// import TotalPower from './TotalPower/TotalPower'
// import PowerRecentDays from './PowerRecentDays/PowerRecentDays'
import styles from './PowerSectionFactDetail.styles'
// import PowerByHours from './PowerByHours/PowerByHours'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { getPowerOverivew } from '@/core/redux/Actions/PowerActions'
import TotalPower from '@/features/home/components/PowerSection/TotalPower/TotalPower'
import TotalPowerFactDetail from './TotalPowerFactDetail/TotalPowerFactDetail'
import PowerByHoursFactDetail from './PowerByHoursFactDetail/PowerByHoursFactDetail'
import PowerRecentDaysFacrDetail from './PowerRecentDaysFacrDetail/PowerRecentDaysFacrDetail'


function PowerSectionFactDetail() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPowerOverivew())
  }, [])

  return (
    <SectionContainer title="Công Suất">
      <View>
        <View style={styles.section}>
          <TotalPowerFactDetail/>
        </View>
        <View style={styles.section}>
           <PowerByHoursFactDetail/>
          {/* <PowerByHours /> */}
        </View>
        <View style={styles.section}>
            <PowerRecentDaysFacrDetail/>
          {/* <PowerRecentDays /> */}
        </View>
      </View>
    </SectionContainer>
  )
}

export default PowerSectionFactDetail
