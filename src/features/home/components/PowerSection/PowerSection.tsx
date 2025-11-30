import React, { useEffect } from 'react'
import { View } from 'react-native'
import { useDispatch } from 'react-redux'
import TotalPower from './TotalPower/TotalPower'
import PowerRecentDays from './PowerRecentDays/PowerRecentDays'
import styles from './PowerSection.styles'
import PowerByHours from './PowerByHours/PowerByHours'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { getPowerOverivew } from '@/core/redux/Actions/PowerActions'

function PowerSection() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPowerOverivew());
  }, []);

  return (
    <SectionContainer title="Công Suất">
      <View>
        <View style={styles.section}>
          <TotalPower />
        </View>
        <View style={styles.section}>
          <PowerByHours />
        </View>
        <View style={styles.section}>
          <PowerRecentDays />
        </View>
      </View>
    </SectionContainer>
  )
}

export default PowerSection
