import { px } from "@/core/utils/scale";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    pill: {
      paddingHorizontal: px.h(14),
      paddingVertical: px.v(6),
      backgroundColor: 'rgba(255,255,255,0.12)',
      borderRadius: px.h(8),
      alignSelf: 'flex-start',
      marginHorizontal: 'auto',
    },
    pillText: {
      textAlign: 'center',
      fontSize: px.m(18),
      fontWeight: '600',
    },
    mainRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginTop: px.v(12),
    },
    unit: {
      fontWeight: '700',
    },
    slash: {
      fontSize: px.f(25),
      fontWeight: '600',
      marginHorizontal: px.h(6),
    },
    refValue: {
      fontSize: px.f(35),
      fontWeight: '600',
    },
  })