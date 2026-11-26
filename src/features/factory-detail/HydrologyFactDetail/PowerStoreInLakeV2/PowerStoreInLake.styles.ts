import { px } from "@/core/utils/scale";
import { StyleSheet } from "react-native";

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    lightCard: {
      elevation: 0,
      shadowOpacity: 0,
    },
    lightHeader: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 8,
    },
    lightTitle: {
      color: '#1E293B',
      fontSize: px.m(17),
      fontWeight: '700',
    },
    lightCurrent: {
      color: '#0F766E',
      fontSize: px.f(42),
      fontWeight: '700',
      fontVariant: ['tabular-nums'],
      marginVertical: px.v(8),
    },
    lightUnit: {
      color: '#475569',
      fontSize: px.m(16),
      fontWeight: '600',
    },
    lightProgressLabel: {
      color: '#475569',
      fontWeight: '600',
    },
    lightComparison: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      gap: 8,
      marginTop: px.v(14),
      paddingTop: px.v(10),
      borderTopWidth: StyleSheet.hairlineWidth,
      borderTopColor: '#CBD5E1',
    },
    lightComparisonLabel: {
      color: '#475569',
      fontSize: px.m(14),
    },
    lightComparisonValue: {
      color: '#1E293B',
      fontSize: px.m(14),
      fontWeight: '700',
      fontVariant: ['tabular-nums'],
    },
    pill: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: px.v(6),
      borderRadius: px.h(8),
    },
    pillText: {
      textAlign: 'center',
      fontSize: px.m(18),
      fontWeight: '600',
    },
    mainRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'baseline',
      columnGap: px.h(12),
      rowGap: px.v(4),
      marginTop: px.v(12),
    },
    currentValue: {
      maxWidth: '100%',
      fontSize: px.f(52),
      fontWeight: '700',
    },
    unit: {
      fontSize: px.f(20),
      fontWeight: '700',
    },
    slash: {
      fontSize: px.f(25),
      fontWeight: '600',
    },
    refValue: {
      maxWidth: '100%',
      fontSize: px.f(35),
      fontWeight: '600',
    },
    firstSkeleton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    revenueCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.04)',
      borderRadius: 12,
      marginTop: px.v(20),
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.08)',
    },
    cardValue: {
      color: isDark ? '#ffffff' : '#111827',
      fontSize: 24,
      fontWeight: '700',
      marginBottom: px.v(6),
    },
    cardUnit: {
      fontSize: 16,
      fontWeight: '300',
      color: isDark ? '#ffffff' : '#6B7280',
    },
    cardTitle: {
      color: isDark ? '#8b92a0' : '#475569',
      fontSize: px.f(16),
    },
  })

export default createStyles
