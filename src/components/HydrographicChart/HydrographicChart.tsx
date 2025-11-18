import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, LayoutChangeEvent } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import Svg, { Line } from 'react-native-svg'; // ✅ Đã có sẵn với Expo
// import { StyleSheet, View, TextStyle } from 'react-native'
interface Props { }

const { width: SCREEN_WIDTH } = Dimensions.get('window');
function HydrographicChart() {
  const barData = [
    // 18 giờ - Blue bars
    { value: 210, frontColor: '#5B9FED', label: '' },
    { value: 180, frontColor: '#5B9FED', label: '' },
    { value: 310, frontColor: '#5B9FED', label: '18' },

    // 19 giờ - Blue bars
    { value: 210, frontColor: '#5B9FED', label: '' },
    { value: 205, frontColor: '#5B9FED', label: '' },
    { value: 210, frontColor: '#5B9FED', label: '19' },

    // 20 giờ - Blue bars
    { value: 190, frontColor: '#5B9FED', label: '' },
    { value: 185, frontColor: '#5B9FED', label: '' },
    { value: 195, frontColor: '#5B9FED', label: '' },
    { value: 200, frontColor: '#5B9FED', label: '20 giờ' },

    // 21 giờ - Red bars
    { value: 110, frontColor: '#E74C5C', label: '' },
    { value: 130, frontColor: '#E74C5C', label: '' },
    { value: 105, frontColor: '#E74C5C', label: '' },
    { value: 90, frontColor: '#E74C5C', label: '21' },

    // 22 giờ - Red bars
    { value: 120, frontColor: '#E74C5C', label: '' },
    { value: 140, frontColor: '#E74C5C', label: '' },
    { value: 115, frontColor: '#E74C5C', label: '' },
    { value: 135, frontColor: '#E74C5C', label: '22' },

    // 23 giờ - Red bars
    { value: 50, frontColor: '#E74C5C', label: '' },
    { value: 95, frontColor: '#E74C5C', label: '' },
    { value: 100, frontColor: '#E74C5C', label: '' },
    { value: 120, frontColor: '#E74C5C', label: '23' },
  ];

  const [chartHeight, setChartHeight] = useState(0);
  // Responsive values
  const containerPadding = 16;
  const yAxisLabelWidth = 40;
  const chartWidth = SCREEN_WIDTH - (containerPadding * 2);
  const dynamicChartHeight = SCREEN_WIDTH * 0.7; // 70% của screen width

  // Tính toán vị trí label động
  const maxValue = 500;
  const thresholdValue = 180;
  const topPadding = 20;
  const bottomPadding = 50;

  // Calculate label position
  const calculateLabelPosition = () => {
    if (!chartHeight) return '36%';

    const usableHeight = chartHeight - topPadding - bottomPadding;
    const valueRatio = (maxValue - thresholdValue) / maxValue;
    const labelTop = topPadding + (valueRatio * usableHeight);

    return labelTop + 2; // ⭐ Thêm 8px để kéo xuống (adjust số này)
  };

  const handleChartLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setChartHeight(height);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mức nước shot</Text>
      <View style={styles.legendContainer}>
        <Svg height="2" width="30" style={styles.legendLine}>
          <Line
            x1="0"
            y1="1"
            x2="24"
            y2="1"
            stroke="#E74C5C"
            strokeWidth="2"
            strokeDasharray="4, 3"
          />
        </Svg>
        <Text style={styles.legendText}>Mức nước chết</Text>
      </View>
      <View
        style={styles.chartWrapper}
        onLayout={handleChartLayout}
      >
        <BarChart
          data={barData}
          width={chartWidth}
          height={dynamicChartHeight}
          barWidth={SCREEN_WIDTH * 0.04} // 4% of screen width
          spacing={SCREEN_WIDTH * 0.015} // 1.5% of screen width
          barBorderRadius={4}
          backgroundColor="transparent"

          maxValue={maxValue}
          noOfSections={5}
          yAxisColor="transparent"
          yAxisTextStyle={{
            color: '#8A94A8',
            fontSize: SCREEN_WIDTH * 0.03, // Responsive font
          }}
          yAxisLabelWidth={yAxisLabelWidth}

          xAxisColor="transparent"
          xAxisLabelTextStyle={{
            color: '#8A94A8',
            fontSize: SCREEN_WIDTH * 0.028,
          }}

          // Grid lines
          hideRules={false}
          rulesColor="#4A5568"
          rulesType="dashed"
          dashWidth={4}
          dashGap={4}

          showVerticalLines
          verticalLinesColor="#4A5568"
          verticalLinesStrokeDashArray={[4, 4]}

          // Threshold line
          showReferenceLine1
          referenceLine1Position={thresholdValue}
          referenceLine1Config={{
            color: '#E74C5C',
            thickness: 2,
            strokeDashArray: [6, 4],
          }}

          isAnimated
          animationDuration={600}
        />

        {/* Responsive custom label */}
        <View
          style={[
            styles.customLabel,
            {
              top: calculateLabelPosition(),
              right: SCREEN_WIDTH * 0.025, // 2.5% from right
            }
          ]}
        >
          <Text style={[
            styles.labelText,
            { fontSize: SCREEN_WIDTH * 0.032 } // Responsive font
          ]}>
            180m
          </Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C3E5C',
    padding: 16,
    borderRadius: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: SCREEN_WIDTH * 0.037, // Responsive
    marginBottom: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  chartWrapper: {
    position: 'relative',
  },
  customLabel: {
    position: 'absolute',
    backgroundColor: '#2C3E5C',
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 10,
  },
  labelText: {
    color: '#E74C5C',
    fontWeight: 'bold',
  },

  // ⭐ Legend styles
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


})
export default HydrographicChart
