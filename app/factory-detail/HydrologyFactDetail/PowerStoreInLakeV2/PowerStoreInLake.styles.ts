import { px } from "@/core/utils/scale";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
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
    justifyContent: 'flex-start',
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
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 12,
    marginTop: px.v(20),
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cardValue: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: px.v(6),
  },
  cardUnit: {
    fontSize: 16,
    fontWeight: '300',
  },
  cardTitle: {
    color: '#8b92a0',
    fontSize: px.f(16),
  },
})

export default styles;