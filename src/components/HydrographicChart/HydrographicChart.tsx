import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, LayoutChangeEvent, ScrollView } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import Svg, { Line } from 'react-native-svg';
import WaterDrop from '../WaterDrop/WaterDrop.component';

interface Props { }

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const getBarColor = (value: number): string => {
  return value >= 180 ? '#5B9FED' : '#E74C5C';
};

function HydrographicChart() {
  const [chartHeight, setChartHeight] = useState(0);

  const hourlyData = [
    { values: [120, 115, 125, 130], avgVolume: 420 },
    { values: [110, 105, 115, 120], avgVolume: 410 },
    { values: [100, 95, 105, 110], avgVolume: 400 },
    { values: [90, 85, 95, 100], avgVolume: 380 },
    { values: [80, 75, 85, 90], avgVolume: 360 },
    { values: [70, 65, 75, 80], avgVolume: 340 },
    { values: [120, 130, 140, 150], avgVolume: 420 },
    { values: [160, 170, 180, 190], avgVolume: 450 },
    { values: [200, 210, 220, 230], avgVolume: 480 },
    { values: [210, 220, 215, 225], avgVolume: 490 },
    { values: [220, 230, 225, 235], avgVolume: 500 },
    { values: [230, 240, 235, 245], avgVolume: 500 },
    { values: [250, 260, 270, 280], avgVolume: 500 },
    { values: [240, 250, 260, 270], avgVolume: 500 },
    { values: [230, 240, 250, 260], avgVolume: 490 },
    { values: [220, 230, 240, 250], avgVolume: 480 },
    { values: [210, 220, 230, 240], avgVolume: 470 },
    { values: [200, 210, 220, 230], avgVolume: 460 },
    { values: [210, 180, 310, 290], avgVolume: 420 },
    { values: [210, 205, 210, 215], avgVolume: 450 },
    { values: [190, 185, 195, 200], avgVolume: 450 },
    { values: [110, 130, 105, 90], avgVolume: 280 },
    { values: [120, 140, 115, 135], avgVolume: 280 },
    { values: [50, 95, 100, 120], avgVolume: 280 },
  ];

  const generateBarData = () => {
    const data: any[] = [];
    hourlyData.forEach((hourData, hourIndex) => {
      hourData.values.forEach((value, barIndex) => {
        data.push({
          value,
          frontColor: getBarColor(value),
          label: '',
        });
      });
    });
    return data;
  };

  const generateWaterDropData = () => {
    return hourlyData.map((hourData, index) => ({
      hour: index,
      percent: Math.min(Math.round((hourData.avgVolume / 500) * 100), 100),
      volume: `${hourData.avgVolume}m`
    }));
  };

  const barData = generateBarData();
  const waterDrops = generateWaterDropData();

  const yAxisLabelWidth = 40;
  const barWidth = SCREEN_WIDTH * 0.04;
  const spacing = SCREEN_WIDTH * 0.015;
  const totalBars = 24 * 4;
  const barTotalWidth = barWidth + spacing;
  const chartContentWidth = (totalBars * barTotalWidth) + 40;
  const dynamicChartHeight = SCREEN_WIDTH * 0.7;

  const maxValue = 500;
  const thresholdValue = 180;

  const topPadding = 10;
  const bottomPadding = 40;

  const handleChartLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setChartHeight(height);
  };

  const verticalLineSpacing = barTotalWidth * 4;
  const waterDropSpacing = barTotalWidth * 4;

  const yAxisLabels = [];
  const sections = 5;
  for (let i = 0; i <= sections; i++) {
    const value = Math.round((maxValue / sections) * (sections - i));
    yAxisLabels.push(value);
  }

  const calculateThresholdPosition = () => {
    if (!chartHeight) return 0;
    // Match the Y-axis calculation system
    const chartAreaHeight = dynamicChartHeight - topPadding - bottomPadding;
    const ratio = (maxValue - thresholdValue) / maxValue;
    return topPadding + (ratio * chartAreaHeight);
  };

  const thresholdTop = calculateThresholdPosition();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Mức nước shot</Text>

        <View style={styles.legendContainer}>
          <Svg height="2" width="30" style={styles.legendLine}>
            <Line x1="0" y1="1" x2="24" y2="1" stroke="#E74C5C" strokeWidth="2" strokeDasharray="4, 3" />
          </Svg>
          <Text style={styles.legendText}>Mức nước chết</Text>
        </View>

        <View style={styles.chartContainer}>
          {/* Sticky Y-axis bên trái */}
          <View style={styles.stickyLeftColumn}>
            <View style={[styles.yAxisContainer, { height: dynamicChartHeight }]}>
              {yAxisLabels.map((label, index) => {
                // Calculate exact position matching BarChart's internal grid
                // BarChart uses chart area = height - topPadding - bottomPadding
                const chartAreaHeight = dynamicChartHeight - topPadding - bottomPadding;
                const sectionHeight = chartAreaHeight / sections;
                
                // Position for the grid line
                const lineTop = topPadding + (index * sectionHeight);
                
                // Center text on the line (text height ≈ 12px, so offset by half)
                const textOffset = 0; // Try different values: -6, 0, 6
                const topOffset = lineTop + textOffset;
                
                return (
                  <View
                    key={index}
                    style={[
                      styles.yAxisLabelWrapper,
                      {
                        position: 'absolute',
                        top: topOffset,
                      }
                    ]}
                  >
                    <Text style={styles.yAxisText}>{label}</Text>
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
              <Text style={styles.thresholdLabelText}>180m</Text>
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

                  hideRules={false}
                  rulesColor="#4A5568"
                  rulesType="dashed"
                  dashWidth={4}
                  dashGap={4}

                  showReferenceLine1={false}

                  isAnimated
                  animationDuration={600}

                  showVerticalLines
                  verticalLinesColor="#4A5568"
                  verticalLinesStrokeDashArray={[4, 4]}
                  verticalLinesThickness={1}
                  verticalLinesSpacing={verticalLineSpacing}

                  scrollToEnd={false}
                  scrollAnimation={false}
                />

                {/* Threshold line đỏ - full width, chạm Y-axis */}
                {chartHeight > 0 && (
                  <View
                    style={[
                      styles.scrollableThresholdLine,
                      {
                        top: thresholdTop,
                        left: 0,
                        width: chartContentWidth
                      }
                    ]}
                  >
                    <Svg height="2" width={chartContentWidth}>
                      <Line
                        x1="0"
                        y1="1"
                        x2={chartContentWidth}
                        y2="1"
                        stroke="#E74C5C"
                        strokeWidth="2"
                        strokeDasharray="6, 4"
                      />
                    </Svg>
                  </View>
                )}
              </View>

              {/* Custom X-axis labels - chính giữa 4 cột */}
              <View style={styles.customXAxisContainer}>
                {hourlyData.map((_, hourIndex) => {
                  const groupWidth = 4 * barTotalWidth;
                  const labelPosition = (hourIndex * groupWidth) + (groupWidth / 2);

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
                })}
              </View>

              {/* Water drops */}
              <View style={styles.waterDropContainer}>
                <View style={styles.waterDropRow}>
                  {waterDrops.map((drop, index) => (
                    <View key={index} style={[styles.waterDropWrapper, { width: waterDropSpacing }]}>
                      <WaterDrop percent={drop.percent} />
                      <Text style={styles.volumeText}>{drop.volume}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: '#2C3E5C',
    padding: 16,
    borderRadius: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: SCREEN_WIDTH * 0.037,
    marginBottom: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    position: 'relative',
  },
  stickyLeftColumn: {
    width: 40,
    position: 'relative',
    zIndex: 10,
  },
  yAxisContainer: {
    position: 'relative',
  },
  yAxisLabelWrapper: {
    alignItems: 'flex-end',
    paddingRight: 8,
    width: 40,
  },
  yAxisText: {
    color: '#8A94A8',
    fontSize: SCREEN_WIDTH * 0.03,
  },
  stickyRightLabel: {
    position: 'absolute',
    right: 16,
    backgroundColor: '#2C3E5C',
    paddingHorizontal: 6,
    paddingVertical: 3,
    zIndex: 15,
    borderRadius: 4,
  },
  thresholdLabelText: {
    color: '#E74C5C',
    fontWeight: 'bold',
    fontSize: SCREEN_WIDTH * 0.028,
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
    marginTop: -20,
  },
  customXAxisLabel: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -1 }],
  },
  customXAxisText: {
    color: '#8A94A8',
    fontSize: SCREEN_WIDTH * 0.028,
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
    fontSize: SCREEN_WIDTH * 0.03,
    fontWeight: '400',
  },
  waterDropContainer: {
    marginTop: 16,
  },
  waterDropRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waterDropWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  volumeText: {
    color: '#8A94A8',
    fontSize: SCREEN_WIDTH * 0.028,
    marginTop: 4,
    textAlign: 'center',
  },
});

export default HydrographicChart;
