import { hydrologyLight as light, hydrologyDark as dark } from '@/core/constants/hydrologyPalette'
import React, { useRef, useEffect, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Text } from 'react-native';
import Svg, {
  Path,
  Circle,
  Line,
  Text as SvgText,
} from 'react-native-svg';
import WaterDrop from '../WaterDrop/WaterDrop.component';
import { LineChartSkeleton } from '../Skeletons/LineChartSkeleton';
import { useAppTheme } from '@/core/hooks/use-app-theme';
import { prepareHydrographicChartData, type HydroChartItem } from './hydrographicChart.data';

/* ===== CONFIG ===== */
const CHART_HEIGHT = 220;
const POINT_WIDTH = 60;
const Y_AXIS_WIDTH = 32;
const PADDING_TOP = 20;
const PADDING_BOTTOM = 36;
const PADDING_RIGHT = 16;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
interface HydrographicChartProps {
  isLoading: boolean
  data: HydroChartItem[]
  referenceLevel: number | null
  maxLevel?: number
  bgColor?: string
  selectedOptionsValue?: string
}
const HydrographicChart: React.FC<HydrographicChartProps> = (props) => {
  const { isLoading = false, data = [], referenceLevel = 0, bgColor, selectedOptionsValue = "" } = props
  const scheme = useAppTheme();
  const isDark = scheme === 'dark';
  const scrollRef = useRef<ScrollView>(null);
  // Chuẩn bị chung dữ liệu đường biểu diễn và giọt nước để hai phần không lệch giờ.
  // Chỉ tính lại khi response hoặc chế độ xem thay đổi.
  const { points: safeData, waterDrops } = useMemo(
    () => prepareHydrographicChartData(data, selectedOptionsValue),
    [data, selectedOptionsValue],
  )
  // Kết thúc biểu đồ ở điểm cuối có dữ liệu, bỏ phần giờ tương lai đang null ở cuối response.
  const lastPointIndex = safeData[safeData.length - 1]?.index ?? 0

  useEffect(() => {
    // Sau khi cập nhật dữ liệu, cuộn đến cuối biểu đồ để thấy điểm mới nhất.
    if (scrollRef.current && safeData.length > 0) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      });
    }
  }, [safeData.length, lastPointIndex, isLoading, scrollRef]);
  if (isLoading) {
    return (
      <View style={styles.mainContainer}>
        <LineChartSkeleton />
      </View>
    )
  }
  // Giữ điều kiện cũ: cần ít nhất hai điểm hợp lệ để hiển thị biểu đồ đường.
  if (safeData.length < 2) return null;

  // Chỉ dùng mực nước hợp lệ để tính trục Y, tránh null bị ép thành 0 làm sai thang đo.
  const values = safeData.map(d => d.value);

  let min = Math.min(...values);
  if (referenceLevel !== null && referenceLevel < min) {
    min = referenceLevel;
  }
  let max = Math.max(...values);

  if (min === max) {
    min -= 1;
    max += 1;
  }

  const padding = 0.5;
  const minY = min - padding;
  const maxY = max + padding;
  const rangeY = maxY - minY;
  const scaleY = CHART_HEIGHT / rangeY;

  // Dùng vị trí gốc của điểm cuối, không dùng số điểm sau lọc để tránh dồn các giờ bị thiếu.
  const chartWidth =
    POINT_WIDTH * lastPointIndex +
    Y_AXIS_WIDTH +
    PADDING_RIGHT;

  const getX = (i: number) =>
    Y_AXIS_WIDTH + i * POINT_WIDTH;

  const getY = (v: number) =>
    PADDING_TOP + CHART_HEIGHT - (v - minY) * scaleY;

  const sections = 4;

  const path = safeData
    .map((p, i) => {
      const x = getX(p.index);
      const y = getY(p.value);
      // SVG: M bắt đầu đoạn mới, L nối tiếp đoạn hiện tại.
      // Nếu thiếu dữ liệu giữa hai giờ thì ngắt đường, không nối xuyên qua khoảng thiếu.
      const startsSegment = i === 0 || p.index !== safeData[i - 1].index + 1;
      return `${startsSegment ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
  const thresholdY = referenceLevel === null ? null : getY(referenceLevel);
  const formatYAxis = (value: number, range: number) => {
    if (range < 1) return value.toFixed(2);
    if (range < 10) return value.toFixed(1);
    return Math.round(value).toString();
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
          <View style={styles.legendContainer}>
            <View style={[styles.legendItem, { marginLeft: 8 }]}>
              <Text style={[styles.legendText, !isDark && { color: light.muted }]}>Đơn vị:</Text>
              <Text style={[styles.legendText, { marginLeft: 4 }, !isDark && { color: light.muted }]}>m</Text>
            </View>
            {referenceLevel !== null && (
              <View style={styles.legendItem}>
                <Svg height="2" width="30" style={styles.legendLine}>
                  <Line x1="0" y1="1" x2="24" y2="1" stroke={isDark ? dark.warning : light.warning} strokeWidth="2" strokeDasharray="4, 3" />
                </Svg>
                <Text style={[styles.legendText, !isDark && { color: light.muted }]}>Mực nước chết</Text>
              </View>
            )}
          </View>

          <View style={styles.chartContainer}>

            <View style={[styles.wrapper, { position: 'relative' }]}>
              {/* ===== STICKY Y AXIS ===== */}
              <Svg
                width={Y_AXIS_WIDTH}
                height={CHART_HEIGHT + PADDING_TOP + PADDING_BOTTOM + 100}
                style={{
                  backgroundColor: bgColor || (isDark ? dark.background : light.background),
                  ...styles.yAxis
                }}
              >
                {Array.from({ length: sections + 1 }).map((_, i) => {
                  const y =
                    PADDING_TOP +
                    (CHART_HEIGHT / sections) * i;
                  const value =
                    maxY - (rangeY / sections) * i;

                  return (
                    <SvgText
                      key={i}
                      x={Y_AXIS_WIDTH - 4}
                      y={y + 4}
                      fontSize={10}
                      fill={isDark ? dark.chart.axisText : light.muted}
                      textAnchor="end"
                    >
                      {formatYAxis(value, rangeY)}
                      {/* {Math.round(value)} */}
                    </SvgText>
                  );
                })}
              </Svg>

              {/* ===== SCROLLABLE CHART ===== */}
              <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingLeft: Y_AXIS_WIDTH - 10 }}
              >
                <View
                  style={{
                    position: 'relative',
                    width: chartWidth,
                    height: CHART_HEIGHT + PADDING_TOP + PADDING_BOTTOM + 80,
                  }}
                >
                  <Svg
                    width={chartWidth}
                    height={
                      CHART_HEIGHT +
                      PADDING_TOP +
                      PADDING_BOTTOM
                    }
                  >
                    {/* grid */}
                    {Array.from({ length: sections + 1 }).map((_, i) => {
                      const y =
                        PADDING_TOP +
                        (CHART_HEIGHT / sections) * i;

                      return (
                        <Line
                          key={i}
                          x1={Y_AXIS_WIDTH}
                          y1={y}
                          x2={chartWidth}
                          y2={y}
                          stroke={isDark ? dark.grid : light.grid}
                        />
                      );
                    })}

                    {/* line */}
                    <Path
                      d={path}
                      stroke={isDark ? dark.water : light.water}
                      strokeWidth={3}
                      fill="none"
                    />

                    {/* Chỉ vẽ điểm và nhãn đã qua lọc, đặt theo vị trí giờ gốc. */}
                    {safeData.map((p, i) => {
                      const x = getX(p.index);
                      const y = getY(p.value);

                      return (
                        <React.Fragment key={i}>
                          <Circle cx={x} cy={y} r={4} fill={isDark ? dark.text : '#fff'} stroke={isDark ? dark.text : light.water} strokeWidth={2} />

                          {/* value */}
                          <SvgText
                            x={x}
                            y={y - 8}
                            fontSize={10}
                            fill={isDark ? dark.text : light.text}
                            textAnchor="middle"
                          >
                            {p.value}
                          </SvgText>

                          {/* x label */}
                          <SvgText
                            x={x}
                            y={PADDING_TOP + CHART_HEIGHT + 20}
                            fontSize={10}
                            fill={isDark ? dark.chart.axisText : light.muted}
                            textAnchor="middle"
                          >
                            {p.label}
                          </SvgText>
                        </React.Fragment>
                      );
                    })}
                    {thresholdY !== null && (
                      <Line
                        x1={Y_AXIS_WIDTH}
                        x2={chartWidth}
                        y1={thresholdY}
                        y2={thresholdY}
                        stroke={isDark ? dark.warning : light.warning}
                        strokeWidth={2}
                        strokeDasharray="6 4"
                      />
                    )}
                  </Svg>


                  <View
                    style={{
                      position: 'absolute',
                      top: PADDING_TOP + CHART_HEIGHT + 12,
                      left: 0,
                      width: chartWidth,
                      height: 80,
                    }}
                  >
                    {/* Dùng cùng vị trí giờ với đường biểu diễn; không tạo giọt nước cho percent null. */}
                    {waterDrops.map((drop) => {
                      const x = getX(drop.index);

                      return (
                        <View
                          key={drop.index}
                          style={{
                            position: 'absolute',
                            left: x,
                            width: POINT_WIDTH,
                            alignItems: 'center',
                            transform: [{ translateX: -POINT_WIDTH / 2 }],
                          }}
                        >
                          <View style={styles.dropScale}>
                            <WaterDrop
                              percent={drop.percent}
                              fontSize={12}
                              isShowPercent={false}
                              colors={isDark ? {
                                top: drop.percent >= 50 ? dark.drop.top : dark.warningTop,
                                bottom: drop.percent >= 50 ? dark.drop.bottom : dark.warningMid,
                                border: drop.percent >= 50 ? dark.drop.border : dark.warning,
                                background: dark.drop.background,
                                text: drop.percent >= 50 ? dark.drop.text : dark.danger,
                              } : {
                                top: drop.percent >= 50 ? light.waterTop : light.warningTop,
                                bottom: drop.percent >= 50 ? light.waterBottom : light.warningBottom,
                                border: drop.percent >= 50 ? light.water : light.warning,
                                background: light.surface,
                                text: drop.percent >= 50 ? light.water : light.warning,
                              }}
                            />
                          </View>

                          <Text style={[styles.volumeText, !isDark && { color: light.muted }]}>
                            {drop.percent}%
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>

              </ScrollView>

              {thresholdY !== null && (
                <View
                  pointerEvents="none"
                  style={{
                    position: 'absolute',
                    left: Y_AXIS_WIDTH - 20,
                    right: 8,
                    top: 8,
                  }}
                >
                  <Svg
                    width="100%"
                    height={CHART_HEIGHT + PADDING_TOP + PADDING_BOTTOM}
                  >
                    {/* number */}
                    <SvgText
                      x="100%"
                      dx={0}
                      y={thresholdY - 6}
                      fill={isDark ? dark.warning : light.warning}
                      fontSize={12}
                      fontWeight="600"
                      textAnchor="end"
                    >
                      {referenceLevel}
                    </SvgText>

                    {/* unit */}
                    {/* <SvgText
                      x="100%"
                      dx={-4}
                      y={thresholdY - 6}
                      fill={isDark ? dark.warning : light.warning}
                      fontSize={12}
                      textAnchor="end"
                    >
                      m
                    </SvgText> */}
                  </Svg>
                </View>
              )}
            </View>
          </View>
      </View>
    </View>

  );
};

export default React.memo(HydrographicChart);

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 8,
  },
  yAxis: {
    position: 'absolute',
    left: 0,
    top: 8,
    zIndex: 10,
  },

  mainContainer: {
    flex: 1,
    marginBottom: 20
  },
  container: {
    backgroundColor: 'transparent',
    padding: 0,
    paddingTop: 10,
    borderRadius: 12,
  },
  chartContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingRight: 4,

  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendLine: {
    marginRight: 8,
  },
  legendText: {
    color: dark.text,
    fontSize: SCREEN_WIDTH * 0.025,
    fontWeight: '400',
  },
  volumeText: {
    color: dark.chart.volumeText,
    fontSize: SCREEN_WIDTH * 0.022,
    marginTop: 2,
    textAlign: 'center',
  },
  dropScale: {
    transform: [{ scale: 0.8 }],
    marginBottom: -16,
  },
});
