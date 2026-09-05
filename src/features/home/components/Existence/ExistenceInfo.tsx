import React, { useEffect } from 'react'
import {  Text, View } from 'react-native'
import { useAppDispatch, useAppSelector } from '@/core/redux/hooks'
import { RootState } from '@/core/redux/store'
import SectionContainer from '@/components/ui/SectionContainer/SectionContainer.component'
import { getExistence } from '@/core/redux/domains/documents'
import styles from './ExistenceInfo.styles'
import { Badge } from '@/components/Badge/Badge.component'
import { formatDate } from '@/core/utils/date'
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import CalendarIcon from './CalendarIcon'

interface ExistenceProps {
    currentPlantId?: string
}

const ExistenceInfo: React.FC<ExistenceProps> = (props) => {
    const dispatch = useAppDispatch()
    const { currentPlantId } = props
    const { isLoadingExistence, existence } = useAppSelector((state: RootState) => state.documentSlice)
    const { countRefesh } = useAppSelector((state: any) => state.refreshSlice)
    useEffect(() => {
        console.log(currentPlantId);
        if (!currentPlantId) return
        dispatch(getExistence({ currentPlantId }))
        console.log(existence);
    }, [dispatch, currentPlantId, countRefesh])

    const data = existence.map((item, index) => ({
        ...item,
        id: index
    }))
    if (data?.length === 0) {
        return null;
    }

    return (
        <SectionContainer
            title="Tồn tại"
        >
            {data.map((problem, index) => {
                const formattedDate = formatDate(new Date(problem?.date));
                return (<AnimatedCardContainer style={styles.cardGap} key={index}>
                    {/* Top row */}
                    <View style={styles.topRow}>
                        <Badge status={problem.status} />
                        <View style={styles.dateContainer}>
                            <CalendarIcon />
                            <Text style={styles.date}>{formattedDate}</Text>
                        </View>
                    </View>

                    {/* Title */}
                    <Text style={styles.title}>
                        {problem.name}
                    </Text>
                </AnimatedCardContainer>)
            })}

        </SectionContainer>
    )
}

export default ExistenceInfo