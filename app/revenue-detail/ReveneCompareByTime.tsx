import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import AnimatedCardContainer from '@/components/AnimatedCardContainer/AnimatedCardContainer.component'
import DateRangePicker from '@/components/DateRangePicker/DateRangePicker.component'

interface Props {
    fromDate: string;
    toDate: string;
    metricLabel: string;
    onPressFrom?: () => void;
    onPressTo?: () => void;
    onPressMetric?: () => void;
}
const OPTIONS = [
    'Tổng doanh thu theo thị trường điện',
    'Tổng doanh thu theo giá hợp đồng',
    'Tổng chi phí',
];
export default function ReveneCompareByTime({
    fromDate,
    toDate,
    metricLabel,
    onPressFrom,
    onPressTo,
    onPressMetric,
}: Props) {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(OPTIONS[0]);

    const onSelect = (value: string) => {
        setSelected(value);
        setOpen(false);
        // onChangeOption?.(value);
    };

    const [range, setRange] = useState({ from: dayjs().subtract(1, 'day'), to: dayjs(), })
    const onChangeDateRage = (newRange: { from: any; to: any }) => {
        setRange(newRange)
        const fromDate = dayjs(newRange.from)
        const toDate = dayjs(newRange.to)
        // console.log('Selected Date Range:', { from: fromDate.format('DD/MM/YYYY'), to: toDate.format('DD/MM/YYYY') })

        // dispatch(
        //   getCompareProductOutput({
        //     tagetDate: fromDate.format('DD/MM/YYYY'),
        //     compareDate: toDate.format('DD/MM/YYYY'),
        //   }),
        // )
    }
    return (
        <View style={styles.wrapper}>
            <AnimatedCardContainer>
                {/* <View style={styles.wrapper}> */}
                <Text style={styles.title}>So sánh theo thời gian</Text>
                <DateRangePicker
                    labelFrom="Ngày mục tiêu"
                    labelTo="Ngày so sánh"
                    format={'DD/MM/YYYY'}
                    value={range}
                    onChange={onChangeDateRage}
                    mode="modal"
                    chooseMode={'day'}
                />
                {/* <View style={styles.row}> */}

                {/* <TouchableOpacity style={styles.dateBox} onPress={onPressFrom}>
                        <Text style={styles.dateText}>{fromDate}</Text>
                    </TouchableOpacity>

                    <Text style={styles.toText}>đến</Text>

                    <TouchableOpacity style={styles.dateBox} onPress={onPressTo}>
                        <Text style={styles.dateText}>{toDate}</Text>
                    </TouchableOpacity> */}
                {/* </View> */}
                {/* 
                <TouchableOpacity style={styles.dropdown} onPress={onPressMetric}>
                    <Text style={styles.dropdownText}>{metricLabel}</Text>
                    <Text style={styles.arrow}>▼</Text>
                </TouchableOpacity> */}
                {/* DROPDOWN */}
                <View>
                    <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setOpen(!open)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.dropdownText}>{selected}</Text>
                        <Text style={styles.arrow}>{open ? '▲' : '▼'}</Text>
                    </TouchableOpacity>

                    {open && (
                        <View style={styles.menu}>
                            {OPTIONS.map(option => (
                                <TouchableOpacity
                                    key={option}
                                    style={[
                                        styles.menuItem,
                                        selected === option && styles.menuItemActive,
                                    ]}
                                    onPress={() => onSelect(option)}
                                >
                                    <Text
                                        style={[
                                            styles.menuText,
                                            selected === option && styles.menuTextActive,
                                        ]}
                                    >
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                </View>
                {/* </View> */}
            </AnimatedCardContainer>
        </View>

    );
}
const styles = StyleSheet.create({
    wrapper: {
        // paddingVertical: 16,
        // paddingHorizontal: 16,
        marginTop: 14,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },

    title: {
        color: '#F8FAFC',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 14,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },

    dateBox: {
        flex: 1,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(148,163,184,0.12)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(148,163,184,0.25)',
    },

    dateText: {
        color: '#F8FAFC',
        fontSize: 13,
        fontWeight: '600',
    },

    toText: {
        color: '#94A3B8',
        fontSize: 13,
        marginHorizontal: 10,
    },

    // dropdown: {
    //     height: 48,
    //     borderRadius: 14,
    //     backgroundColor: 'rgba(148,163,184,0.12)',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     paddingHorizontal: 16,
    //     borderWidth: 1,
    //     borderColor: 'rgba(148,163,184,0.25)',
    // },

    dropdownText: {
        color: '#F8FAFC',
        fontSize: 13,
        fontWeight: '600',
    },

    arrow: {
        color: '#CBD5E1',
        fontSize: 12,
    },


    dropdown: {
        height: 48,
        borderRadius: 14,
        backgroundColor: 'rgba(148,163,184,0.12)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: 'rgba(148,163,184,0.25)',
    },

    // dropdownText: {
    //     color: '#F8FAFC',
    //     fontSize: 13,
    //     fontWeight: '600',
    //     flex: 1,
    //     paddingRight: 8,
    // },

    // arrow: {
    //     color: '#CBD5E1',
    //     fontSize: 12,
    // },

    /* MENU */
    menu: {
        marginTop: 6,
        backgroundColor: '#0F172A',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(148,163,184,0.25)',
        overflow: 'hidden',
    },

    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

    menuItemActive: {
        backgroundColor: 'rgba(59,130,246,0.12)',
    },

    menuText: {
        color: '#CBD5E1',
        fontSize: 13,
    },

    menuTextActive: {
        color: '#F8FAFC',
        fontWeight: '600',
    },
});
