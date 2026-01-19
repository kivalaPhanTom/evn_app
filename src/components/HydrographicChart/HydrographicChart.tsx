import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, LayoutChangeEvent, ScrollView } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import Svg, { Line } from 'react-native-svg';
import WaterDrop from '../WaterDrop/WaterDrop.component';
import LineBarChartSkeleton from '../Skeletons/LineBarChartSkeleton';
import { Colors } from '@/core/constants/colors';


interface Props { }

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const getBarColor = (value: number, referenceLevel:number): string => {
  return value >= referenceLevel ? '#5B9FED' : Colors.warningFull;
};
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
}
function HydrographicChart(props: HydrographicChartProps) {
  const { isLoading = false, data = [], referenceLevel = 0, maxLevel= 0} = props
  const [chartHeight, setChartHeight] = useState(0);

  // Compute maxValue from the largest avgVolume so grid scales to data.
  const maxAvgVolume = maxLevel ? maxLevel : data.length ? Math.max(...data.map(h => h.avgVolume)) : 500;
  // Round up to nearest 50 for a cleaner axis
  const computedMaxValue = Math.ceil(maxAvgVolume / 50) * 50;

  // Memoize bar data and water drops to avoid recalculating on every render
  // const barData = useMemo(() => {
  //   const data: any[] = [];
  //   hourlyData.forEach((hourData) => {
  //     hourData.values.forEach((value) => {
  //       data.push({
  //         value,
  //         frontColor: getBarColor(value),
  //         label: '',
  //       });
  //     });
  //   });
  //   return data;
  // }, [hourlyData]);

  const barData = useMemo(() => {
    return data.map(item => ({
      value: item.avgVolume,
      frontColor: getBarColor(item.avgVolume, referenceLevel),
      borderRadius: 6,
    }));
  }, [JSON.stringify(data)]);

  const waterDrops = useMemo(() => {
    return data.map((item, index) => ({
      hour: index,
      percent: item.percent,
      volume: `${item.avgVolume}m`
    }));
  }, [JSON.stringify(data), computedMaxValue]);

  const yAxisLabelWidth = 40;
  // Make the chart compact so it doesn't take too much vertical space
  // const barWidth = SCREEN_WIDTH * 0.028;
  // const spacing = SCREEN_WIDTH * 0.01;

  const barWidth = SCREEN_WIDTH * 0.05; // to hơn trước
  const spacing = SCREEN_WIDTH * 0.04;

  // derive total bars from data rather than hardcoding
  // const totalBars = hourlyData.length * 4;
  const totalBars = data.length;
  const barTotalWidth = barWidth + spacing;
  // const initialSpacing = spacing / 2
  const initialSpacing =  barTotalWidth / 2-10;
  const verticalLinesShift = initialSpacing;
  // const chartContentWidth = Math.max((totalBars * barTotalWidth) + 40, SCREEN_WIDTH);
  const chartContentWidth = Math.max(totalBars * barTotalWidth, SCREEN_WIDTH);
  const dynamicChartHeight = SCREEN_WIDTH * 0.45;

  const maxValue = computedMaxValue;
  const thresholdValue = referenceLevel;

  const topPadding = 8;
  // Try zero bottom padding so the baseline is at the very bottom of chart area
  const bottomPadding = 0;
  // Some chart implementations add an internal bottom inset for labels/axis.
  // `barBottomInset` nudges our computed baseline up so it lines up with BarChart's bar bottoms.
  // Increase this value if bars appear above the baseline (tunable per device).
  const barBottomInset = 22;
  // Remove overlay offset — draw grid exactly from computed baseline
  const overlayOffset = 0;

  const handleChartLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    // Only update state when height actually changes to avoid extra renders
    if (height && height !== chartHeight) setChartHeight(height);
  };

  // const verticalLineSpacing = barTotalWidth * 4; // every 4 bars
  const verticalLineSpacing = barTotalWidth;
  // const waterDropSpacing = barTotalWidth * 4;
  const waterDropSpacing = barTotalWidth;
  const yAxisLabels = [];
  const sections = 5;
  for (let i = 0; i <= sections; i++) {
    const value = Math.round((maxValue / sections) * (sections - i));
    yAxisLabels.push(value);
  }

  // Precompute actual height and y positions for each grid line so labels and SVG use the same coordinates
  const yPositions = useMemo(() => {
    const actualHeight = chartHeight || dynamicChartHeight;
    // ensure baseline sits exactly at the bottom of the chart area (minus a 1px inset)
    const baselineY = actualHeight - bottomPadding - 1 - barBottomInset;
    const usableTop = topPadding;
    const chartAreaHeight = baselineY - usableTop;
    const sectionHeight = chartAreaHeight / sections;
    return Array.from({ length: sections + 1 }, (_, i) => usableTop + (i * sectionHeight));
  }, [chartHeight, dynamicChartHeight, topPadding, bottomPadding, sections]);

  const calculateThresholdPosition = () => {
    const actualHeight = chartHeight || dynamicChartHeight;
    // Match the Y-axis calculation system
    const baselineY = actualHeight - bottomPadding - 1 - barBottomInset;
    const chartAreaHeight = baselineY - topPadding;
    const ratio = (maxValue - thresholdValue) / maxValue;
    return topPadding + (ratio * chartAreaHeight);
  };

  const thresholdTop = calculateThresholdPosition();
  return (
    <View style={styles.mainContainer}>
      {isLoading ? <LineBarChartSkeleton
        isShowLine={false}
      /> :
        <View style={styles.container}>
          <View style={styles.legendContainer}>
            <Svg height="2" width="30" style={styles.legendLine}>
              <Line x1="0" y1="1" x2="24" y2="1" stroke={Colors.warningFull} strokeWidth="2" strokeDasharray="4, 3" />
            </Svg>
            <Text style={styles.legendText}>Mực nước chết</Text>
          </View>

          <View style={styles.chartContainer}>
            {/* Sticky Y-axis bên trái */}
            <View style={styles.stickyLeftColumn}>
              <View style={[styles.yAxisContainer, { height: chartHeight || dynamicChartHeight }]}>
                {yAxisLabels.map((label, index) => {
                  // Use precomputed yPositions to ensure exact match with SVG grid
                  const lineTop = yPositions[index];
                  const fontSize = SCREEN_WIDTH * 0.026;
                  const containerTop = lineTop - (fontSize / 2);

                  return (
                    <View
                      key={index}
                      style={[
                        styles.yAxisLabelWrapper,
                        {
                          position: 'absolute',
                          top: containerTop,
                          height: fontSize,
                          justifyContent: 'center',
                        }
                      ]}
                    >
                      <Text style={[styles.yAxisText, { fontSize, lineHeight: fontSize }]}>{label}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Sticky label "180m" bên phải màn hình */}
            {chartHeight > 0 && (
              <View
                style={[
                  styles.stickyRightLabel,
                  { top: thresholdTop - 10 }
                ]}
              >
                <Text style={styles.thresholdLabelText}>{`${referenceLevel}m`}</Text>
              </View>
            )}

            {/* Scrollable content: Chart + Water drops */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              style={styles.scrollView}
            >
              <View style={{ width: chartContentWidth }}>
                {/* Chart wrapper */}
                <View style={styles.chartWrapper} onLayout={handleChartLayout}>
                  {(chartHeight || dynamicChartHeight) > 0 && (
                    <View
                      pointerEvents="none"
                      style={[
                        styles.scrollableThresholdLine,
                        {
                          zIndex: 1, // 👈 THẤP
                          width: chartContentWidth,
                          height: chartHeight || dynamicChartHeight,
                        },
                      ]}
                    >
                      <Svg
                        width={chartContentWidth}
                        height={chartHeight || dynamicChartHeight}
                      >
                        {barData.map((_, index) => {
                          const x =
                            initialSpacing +
                            barWidth / 2 +
                            index * barTotalWidth +
                            barTotalWidth / 2;

                          return (
                            <Line
                              key={`slot-line-${index}`}
                              x1={x}
                              y1={0}
                              x2={x}
                              y2={chartHeight || dynamicChartHeight}
                              stroke="#4A5568"
                              strokeWidth={1}
                              strokeDasharray={[4, 4]}
                            />
                          );
                        })}
                      </Svg>
                    </View>
                  )}

                  {(chartHeight || dynamicChartHeight) > 0 && (
                    <View
                      style={[
                        styles.scrollableThresholdLine,
                        {
                          zIndex: 0, // 👈 BẮT BUỘC
                          top: 0,
                          left: 0,
                          width: chartContentWidth,
                          height: chartHeight || dynamicChartHeight,
                        }
                      ]}
                    >
                      <Svg height={chartHeight || dynamicChartHeight} width={chartContentWidth}>
                        {yAxisLabels.map((_, index) => {
                          const y = yPositions[index];
                          return (
                            <Line
                              key={`grid-${index}`}
                              x1="0"
                              y1={y}
                              x2={chartContentWidth}
                              y2={y}
                              stroke="#4A5568"
                              strokeWidth="1"
                              strokeDasharray={[4, 4]}
                              opacity={0.85}
                            />
                          );
                        })}

                        {/* threshold line (red dashed) */}
                        <Line
                          x1="0"
                          y1={thresholdTop}
                          x2={chartContentWidth}
                          y2={thresholdTop}
                          stroke={Colors.warningFull}
                          strokeWidth="2"
                          strokeDasharray={[6, 4]}
                        />

                        {/* x-axis baseline: draw at the bottom of chart area so bars sit on it */}
                        {
                          (() => {
                            const actualHeight = chartHeight || dynamicChartHeight;
                            const baselineY = actualHeight - bottomPadding - 1 - barBottomInset; // match barBottomInset
                            return (
                              <Line
                                x1="0"
                                y1={baselineY}
                                x2={chartContentWidth}
                                y2={baselineY}
                                stroke="rgba(255,255,255,0.06)"
                                strokeWidth="1"
                              />
                            );
                          })()
                        }
                      </Svg>
                    </View>
                  )}
                  <BarChart
                    data={barData}
                    width={chartContentWidth}
                    height={dynamicChartHeight}
                    barWidth={barWidth}
                    spacing={spacing}
                    barBorderRadius={4}
                    backgroundColor="transparent"

                    maxValue={maxValue}
                    noOfSections={sections}

                    yAxisColor="transparent"
                    hideYAxisText={true}
                    yAxisLabelWidth={0}

                    xAxisColor="transparent"
                    xAxisLabelTextStyle={{
                      color: 'transparent',
                      fontSize: SCREEN_WIDTH * 0.028,
                    }}

                    hideRules={true}
                    // We draw our own rules (grid lines) with an SVG overlay so
                    // label positions exactly match the grid. See overlay below.
                    rulesColor="#4A5568"
                    rulesType="dashed"
                    dashWidth={4}
                    dashGap={4}

                    showReferenceLine1={false}

                    isAnimated={false}
                    animationDuration={0}

                    initialSpacing={initialSpacing}
                    // initialSpacing={initialSpacing}
                    // verticalLinesShift={verticalLinesShift}   // ✅ DÒNG QUYẾT ĐỊNH
                    // // showVerticalLines
                    // verticalLinesColor="#4A5568"
                    // verticalLinesStrokeDashArray={[4, 4]}
                    verticalLinesSpacing={barTotalWidth}
                    verticalLinesThickness={1}
                    // verticalLinesSpacing={verticalLineSpacing}

                    scrollToEnd={false}
                    scrollAnimation={false}
                  />

                  {/* Custom grid lines + threshold drawn with SVG so we control exact positions */}

                </View>

                {/* Custom X-axis labels - chính giữa 4 cột */}
                <View style={styles.customXAxisContainer}>
                  {/* {hourlyData.map((_, hourIndex) => {
                    const groupWidth = 4 * barTotalWidth;
                    // const labelPosition = (hourIndex * groupWidth) + (groupWidth / 2);
                    const labelPosition = hourIndex * barTotalWidth + barWidth / 2;

                    return (
                      <View
                        key={hourIndex}
                        style={[
                          styles.customXAxisLabel,
                          { left: labelPosition }
                        ]}
                      >
                        <Text style={styles.customXAxisText}>{hourIndex}</Text>
                      </View>
                    );
                  })} */}
                  {data.map((_, index) => {
                    const xStart = initialSpacing + index * (barWidth + spacing);
                    const xCenter = xStart + barWidth / 2;
                    const labelPosition =
                      barTotalWidth * index + barTotalWidth / 2;

                    return (
                      <View
                        key={index}
                        style={[
                          styles.customXAxisLabel,
                          { left: xCenter },
                        ]}
                      >
                        <Text style={styles.customXAxisText}>{index}</Text>
                      </View>
                    );
                  })}

                </View>

                {/* Water drops */}
                {/* <View style={styles.waterDropContainer}>
                  <View style={styles.waterDropRow}>
                    {waterDrops.map((drop, index) => (
                      <View
                        key={index}
                        style={[
                          styles.waterDropWrapper,
                          {
                            width: barTotalWidth, // đúng bằng bar + spacing
                            alignItems: 'center',
                          },
                        ]}
                      >
                        <View style={styles.dropScale}>
                          <WaterDrop percent={drop.percent} />
                        </View>

                        <Text style={styles.volumeText}>{drop.volume}</Text>
                      </View>
                    ))}
                  </View>
                </View> */}
                {/* <View style={styles.waterDropContainer}>
                  <View style={[styles.waterDropRow, { paddingLeft: initialSpacing - 40 }]}>
                    {waterDrops.map((drop, index) => (
                      <View key={index} style={[styles.waterDropWrapper, { width: waterDropSpacing }]}>
                        <WaterDrop percent={drop.percent} />
                        <Text style={[styles.volumeText, { marginTop: -8 }]}>{drop.volume}</Text>
                      </View>
                    ))}
                    {waterDrops.map((drop, index) => (
                      <View
                        key={index}
                        style={[
                          styles.waterDropWrapper,
                          { width: barTotalWidth } // đúng bằng bar + spacing
                        ]}
                      >
                        <WaterDrop percent={drop.percent} />
                        <Text style={[styles.volumeText, { marginTop: 2 }]}>{drop.volume}</Text>
                      </View>
                    ))}
                  </View>
                </View> */}
              </View>
            </ScrollView>
          </View>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginBottom: 20
  },
  container: {
    // backgroundColor: '#2C3E5C',
    backgroundColor: 'transparent',
    padding: 0,
    paddingTop: 10,
    borderRadius: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: SCREEN_WIDTH * 0.032,
    marginBottom: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  stickyLeftColumn: {
    width: 35,
    position: 'relative',
    zIndex: 10,
  },
  yAxisContainer: {
    position: 'relative',
  },
  yAxisLabelWrapper: {
    alignItems: 'center',
    paddingRight: 8,
    width: 40,
  },
  yAxisText: {
    color: '#8A94A8',
    fontSize: SCREEN_WIDTH * 0.026,
  },
  stickyRightLabel: {
    position: 'absolute',
    right: 16,
    backgroundColor: '#000033',
    paddingHorizontal: 6,
    paddingVertical: 3,
    zIndex: 15,
    borderRadius: 4,
  },
  thresholdLabelText: {
    color: Colors.warningFull,
    fontWeight: 'bold',
    fontSize: SCREEN_WIDTH * 0.024,
  },
  scrollView: {
    flex: 1,
  },
  chartWrapper: {
    position: 'relative',
  },
  scrollableThresholdLine: {
    position: 'absolute',
    zIndex: 3,
  },
  customXAxisContainer: {
    position: 'relative',
    height: 0,
    // pull labels up a bit so they sit closer to bars and reduce empty gap below
    marginTop: -12,
  },
  customXAxisLabel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -1 }],
  },
  customXAxisText: {
    color: '#8A94A8',
    fontSize: SCREEN_WIDTH * 0.024,
  },
  legendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 8,
    paddingRight: 4,
  },
  legendLine: {
    marginRight: 8,
  },
  legendText: {
    color: 'white',
    fontSize: SCREEN_WIDTH * 0.025,
    fontWeight: '400',
  },
  // waterDropContainer: {
  //   // reduce space between chart baseline and water drops
  //   marginTop: -2,
  // },
  // waterDropRow: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // waterDropWrapper: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   // Scale the WaterDrop component so the droplets appear smaller
  //   transform: [{ scale: 0.7 }],
  // },
  volumeText: {
    color: '#8A94A8',
    fontSize: SCREEN_WIDTH * 0.022,
    // slightly reduce margin so volume text sits closer to the droplet
    marginTop: 2,
    textAlign: 'center',
  },



  // waterDropWrapper: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  waterDropContainer: {
  position: 'relative',
  left:2
},
  waterDropRow: {
    flexDirection: 'row', // 👈 BẮT BUỘC
  },
  waterDropWrapper: {
    justifyContent: 'flex-start', // 👈 quan trọng
    alignItems: 'center',
  },

  dropScale: {
    transform: [{ scale: 0.8 }],
    marginBottom: -16, // 👈 kéo text lên sát giọt
  },

  // volumeText: {
  //   marginTop: 0, // hoặc -2 nếu muốn sát hơn
  //   fontSize: SCREEN_WIDTH * 0.022,
  //   color: '#8A94A8',
  //   textAlign: 'center',
  // },
});

export default HydrographicChart;
