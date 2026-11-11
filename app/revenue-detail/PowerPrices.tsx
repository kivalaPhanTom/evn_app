import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useAppSelector } from '@/core/redux/hooks'
import { formatNumber } from '@/core/utils/utils'
import { useAppTheme } from '@/core/hooks/use-app-theme'
interface Props {}

function SectionBox({ children, style }: any) {
  return <View style={style}>{children}</View>
}

export default function PowerPrices(props: Props) {
  const isDark = useAppTheme() === 'dark'
  const { powerPriceDetail } = useAppSelector((state: any) => state.revenueProfitSlice)
  const data = {
    powerPrices: [
      {
        label: 'GIÁ TT BÌNH QUÂN NGÀY',
        value: powerPriceDetail.AvgMarketPrice.Value || 0,
        unit: powerPriceDetail.AvgMarketPrice.Unit || 'Đồng/kWh',
        type: 'blue',
        icon: 'flash' as const,
        iconColor: '#10B981',
      },
      {
        label: 'GIÁ CÔNG SUẤT BQ',
        value: powerPriceDetail.AvgCapacityPrice.Value || 0,
        unit: powerPriceDetail.AvgCapacityPrice.Unit || 'Đồng/kWh',
        type: 'gray',
        icon: 'stats-chart' as const,
        iconColor: '#3B82F6',
      },

      // ✅ FULL WIDTH
      {
        label: 'GIÁ THỊ TRƯỜNG TOÀN PHẦN',
        value: powerPriceDetail.FullMarketPrice.Value || 0,
        unit: powerPriceDetail.FullMarketPrice.Unit || 'Đồng/kWh',
        type: 'green',
        full: true,
        icon: 'trending-up' as const,
        iconColor: '#A78BFA',
      },
      {
        label: 'GIÁ TRẦN CHÀO',
        value: powerPriceDetail.PriceCeiling.Value || 0,
        unit: powerPriceDetail.PriceCeiling.Unit || 'Đồng/kWh',
        type: 'gray',
        icon: 'arrow-up-circle' as const,
        iconColor: '#EF4444',
      },
      {
        label: 'GIÁ HĐ THÁNG (TẠM TÍNH)',
        value: powerPriceDetail.MonthlyContractPrice.Value || 0,
        unit: powerPriceDetail.MonthlyContractPrice.Unit || 'Đồng/kWh',
        type: 'gray',
        icon: 'document-text' as const,
        iconColor: '#F59E0B',
      },

      // ✅ FULL WIDTH
      {
        label: 'GIÁ BIẾN ĐỔI NHIÊN LIỆU',
        value: powerPriceDetail.FuelVariablePrice.Value || 0,
        unit: powerPriceDetail.FuelVariablePrice.Unit || 'Đồng/kWh',
        note: powerPriceDetail.FuelVariablePrice.Note,
        type: 'gray',
        full: true,
        icon: 'flame' as const,
        iconColor: '#F97316',
      },
    ],
  }

  // Theme-aware colors
  const sectionTitleColor = isDark ? '#94A3B8' : 'rgba(84,84,84,0.8)'
  const cardBg = isDark ? 'rgba(30, 41, 59, 0.85)' : '#FFFFFF'
  const cardBorder = isDark ? '#334155' : 'rgba(255,255,255,0.12)'
  const labelColor = isDark ? '#fff' : '#475569'
  const valueColor = isDark ? '#F8FAFC' : '#475569'
  const unitColor = isDark ? '#94A3B8' : '#475569'
  const noteBg = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.08)'
  const noteColor = isDark ? '#64748B' : '#475569'

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>GIÁ ĐIỆN</Text>

      <View style={styles.gridWrap}>
        {data.powerPrices.map((item, idx) => {
          const boxStyle: any[] = [
            styles.sectionBox,
            { backgroundColor: cardBg, borderColor: cardBorder },
            item.full && styles.fullWidth,
          ]

          return (
            <SectionBox key={idx} style={boxStyle}>
              <View style={styles.labelRow}>
                <View style={[styles.iconBox, { backgroundColor: item.iconColor }]}>
                  <Ionicons name={item.icon} size={18} color={'#000'} />
                </View>
                <Text style={[styles.label, { color: labelColor }]}>{item.label}</Text>
              </View>
              <Text style={[styles.value, { color: valueColor }]}>{formatNumber(item.value)}</Text>
              <Text style={[styles.unit, { color: unitColor }]}>{item.unit}</Text>
              {item.note && (
                <View style={[styles.noteBox, { backgroundColor: noteBg }]}>
                  <Text style={[styles.note, { color: noteColor }]}>{item.note}</Text>
                </View>
              )}
            </SectionBox>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  sectionTitle: {
    color: '#94A3B8',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
  },

  gridWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  sectionBox: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    width: '49%',
    minHeight: 110,
    borderWidth: 1,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },

  fullWidth: {
    width: '100%',
    marginRight: 0,
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconBox: {
    width: 24,
    height: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  label: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
    color: '#fff',
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  value: {
    color: '#F8FAFC',
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 28,
  },

  unit: {
    color: '#94A3B8',
    fontSize: 11,
    marginTop: 2,
  },

  noteBox: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
    alignSelf: 'flex-start',
  },

  note: {
    color: '#64748B',
    fontSize: 11,
  },
})
