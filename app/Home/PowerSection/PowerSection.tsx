import React from 'react'
import { View } from 'react-native'
import CommonLayout from '@/layouts/CommonLayout/CommonLayout'
import TotalPower from './TotalPower/TotalPower'
import PowerRecentDays from './PowerRecentDays/PowerRecentDays'
import styles from './PowerSection.styles'

function PowerSection() {

    return (
        <CommonLayout title="Công Suất">
            <View>
                <View style={styles.section}>
                    <TotalPower />
                </View>
                <View style={styles.section}>
                    <PowerRecentDays />
                </View>
            </View>
        </CommonLayout>
    )
}

export default PowerSection
