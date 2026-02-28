import React, { useRef, useEffect, useMemo } from 'react';
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native';
import Svg, {
  Path,
  Circle,
  Line,
  Text as SvgText,
} from 'react-native-svg';
import { Text } from 'react-native';
import WaterDrop from '../WaterDrop/WaterDrop.component';
import { Colors } from '@/core/constants/colors';
import { LineChartSkeleton } from '../Skeletons/LineChartSkeleton';

interface ChartPoint {
  label: string;
  value: unknown;
}

/* ===== CONFIG ===== */
const CHART_HEIGHT = 220;
const POINT_WIDTH = 60;
const Y_AXIS_WIDTH = 28;
const PADDING_TOP = 20;
const PADDING_BOTTOM = 36;
const PADDING_RIGHT = 16;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
/* ===== HELPERS ===== */
const sanitizeNumber = (v: unknown): number | null => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

interface Props {
  data: ChartPoint[];
}
interface HydroChartItem {
  avgVolume: number;
  percent: number;
  values: number;
}
interface HydrographicChartProps {
  isLoading: boolean
  data: HydroChartItem[]
  referenceLevel: number
  maxLevel?: number
  bgColor?:string
}
const HydrographicChart: React.FC<HydrographicChartProps> = (props) => {
  const { isLoading = false, data = [], referenceLevel = 0, bgColor } = props
  const scrollRef = useRef<ScrollView>(null);
  const convertedData: { label: string; value: number }[] = data.map((item, index) => ({
    label: `${index}`,
    value: item.avgVolume,
  }))
  const waterDrops = useMemo(() => {
    return data.map((item, index) => ({
      hour: index,
      percent: item.percent,
      volume: `${item.avgVolume}m`
    }));
  }, [JSON.stringify(data)]);

  useEffect(() => {
    if (scrollRef.current && safeData.length > 0) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      });
    }
  }, [JSON.stringify(data), isLoading]);
  if (!data || data.length < 2) return null;

  const safeData = convertedData
    .map(d => ({ ...d, value: sanitizeNumber(d.value) }))
    .filter(d => d.value !== null) as {
      label: string;
      value: number;
    }[];

  if (safeData.length < 2) return null;

  const values = safeData.map(d => d.value);

  let min = Math.min(...values);
  if (referenceLevel < min) {
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

  const chartWidth =
    POINT_WIDTH * (safeData.length - 1) +
    Y_AXIS_WIDTH +
    PADDING_RIGHT;

  const getX = (i: number) =>
    Y_AXIS_WIDTH + i * POINT_WIDTH;

  const getY = (v: number) =>
    PADDING_TOP + CHART_HEIGHT - (v - minY) * scaleY;

  const sections = 4;

  const path = safeData
    .map((p, i) => {
      const x = getX(i);
      const y = getY(p.value);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
  const thresholdY = getY(referenceLevel);
const formatYAxis = (value: number, range: number) => {
  if (range < 1) return value.toFixed(2);
  if (range < 10) return value.toFixed(1);
  return Math.round(value).toString();
};
  return (
    <View style={styles.mainContainer}>
      {isLoading ? <LineChartSkeleton /> :
        <View style={styles.container}>
          <View style={styles.legendContainer}>
            <View style={[styles.legendItem, { marginLeft: 8 }]}>
              <Text style={styles.legendText}>Đơn vị:</Text>
              <Text style={[styles.legendText, { marginLeft: 4 }]}>m</Text>
            </View>
            <View style={styles.legendItem}>
              <Svg height="2" width="30" style={styles.legendLine}>
                <Line x1="0" y1="1" x2="24" y2="1" stroke={Colors.warningFull} strokeWidth="2" strokeDasharray="4, 3" />
              </Svg>
              <Text style={styles.legendText}>Mực nước chết</Text>
            </View>
          </View>

          <View style={styles.chartContainer}>

            <View style={[styles.wrapper, { position: 'relative' }]}>
              {/* ===== STICKY Y AXIS ===== */}
              <Svg
                width={Y_AXIS_WIDTH}
                height={CHART_HEIGHT + PADDING_TOP + PADDING_BOTTOM + 100}
                style={{
                  backgroundColor: bgColor || '#1c056eff',
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
                      fill="#9fa8da"
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
                          stroke="rgba(255,255,255,0.15)"
                        />
                      );
                    })}

                    {/* line */}
                    <Path
                      d={path}
                      stroke="#4da6ff"
                      strokeWidth={3}
                      fill="none"
                    />

                    {/* points + labels */}
                    {safeData.map((p, i) => {
                      const x = getX(i);
                      const y = getY(p.value);

                      return (
                        <React.Fragment key={i}>
                          <Circle cx={x} cy={y} r={4} fill="#fff" />

                          {/* value */}
                          <SvgText
                            x={x}
                            y={y - 8}
                            fontSize={10}
                            fill="#fff"
                            textAnchor="middle"
                          >
                            {p.value}
                          </SvgText>

                          {/* x label */}
                          <SvgText
                            x={x}
                            y={PADDING_TOP + CHART_HEIGHT + 20}
                            fontSize={10}
                            fill="#9fa8da"
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
                        stroke={Colors.warningFull}
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
                    {waterDrops.map((drop, index) => {
                      const x = getX(index);

                      return (
                        <View
                          key={index}
                          style={{
                            position: 'absolute',
                            left: x,
                            width: POINT_WIDTH,      
                            alignItems: 'center', 
                            transform: [{ translateX: -POINT_WIDTH / 2 }],
                          }}
                        >
                          <View style={styles.dropScale}>
                            <WaterDrop percent={drop.percent} fontSize={12} isShowPercent = {false}/>
                          </View>

                          <Text style={styles.volumeText}>
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
                      fill={Colors.warningFull}
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
                      fill={Colors.warningFull}
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
      }
    </View>

  );
};

export default HydrographicChart;

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
    color: 'white',
    fontSize: SCREEN_WIDTH * 0.025,
    fontWeight: '400',
  },
  volumeText: {
    color: '#8A94A8',
    fontSize: SCREEN_WIDTH * 0.022,
    marginTop: 2,
    textAlign: 'center',
  },
  dropScale: {
    transform: [{ scale: 0.8 }],
    marginBottom: -16,
  },
});
