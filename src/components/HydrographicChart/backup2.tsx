import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, LayoutChangeEvent, ScrollView } from 'react-native';
// import { BarChart } from 'react-native-gifted-charts';
import Svg, { Line } from 'react-native-svg';
// import { LineChart } from '@/components/ChartView/LineChart.component'
import WaterDrop from '../WaterDrop/WaterDrop.component';
import LineBarChartSkeleton from '../Skeletons/LineBarChartSkeleton';
import { Colors } from '@/core/constants/colors';
import { LineChart } from 'react-native-gifted-charts'

interface Props { }

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const getBarColor = (value: number, referenceLevel: number): string => {
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
  const { isLoading = false, referenceLevel = 0, maxLevel = 0 } = props //data = []
  const data = [
    {
      "values": 487.4,
      "avgVolume": 480,
      "percent": 99.1,
      "NgayGio": "1/24/2026 12:00:00 AM"
    },
    {
      "values": 487.4,
      "avgVolume": 487.4,
      "percent": 99.1,
      "NgayGio": "1/24/2026 1:00:00 AM"
    },
    {
      "values": 487.4,
      "avgVolume": 490,
      "percent": 99.1,
      "NgayGio": "1/24/2026 2:00:00 AM"
    },
    {
      "values": 487.4,
      "avgVolume": 487.4,
      "percent": 99.1,
      "NgayGio": "1/24/2026 3:00:00 AM"
    },
    {
      "values": 487.4,
      "avgVolume": 460,
      "percent": 99.1,
      "NgayGio": "1/24/2026 4:00:00 AM"
    },
    {
      "values": 487.4,
      "avgVolume": 487.4,
      "percent": 99.1,
      "NgayGio": "1/24/2026 5:00:00 AM"
    },
    {
      "values": 487.4,
      "avgVolume": 487.4,
      "percent": 99.1,
      "NgayGio": "1/24/2026 6:00:00 AM"
    },
    {
      "values": 487.4,
      "avgVolume": 450,
      "percent": 99.1,
      "NgayGio": "1/24/2026 7:00:00 AM"
    },
    {
      "values": 487.4,
      "avgVolume": 487.4,
      "percent": 99.0,
      "NgayGio": "1/24/2026 8:00:00 AM"
    },
    {
      "values": 487.4,
      "avgVolume": 430,
      "percent": 99.0,
      "NgayGio": "1/24/2026 9:00:00 AM"
    },
    {
      "values": 487.4,
      "avgVolume": 487.4,
      "percent": 99.1,
      "NgayGio": "1/24/2026 10:00:00 AM"
    }
  ]
  const convertedData: { label: string; value: number }[] = data.map((item, index) => ({
    label: `${index}`,
    value: item.avgVolume,
    labelComponent: () => (
      <Text style={{ color: 'red', fontSize: 12, textAlign: 'center' }}>{index}</Text>
    ),
  }))
  console.log('convertedData:', convertedData)
  const [chartHeight, setChartHeight] = useState(0);
  const scrollRef = React.useRef<ScrollView>(null);
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

  useEffect(() => {
    if (data.length > 0) {
      requestAnimationFrame(() => {
        scrollRef.current?.scrollToEnd({ animated: false });
      });
    }
  }, [JSON.stringify(data), isLoading]);

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
  const initialSpacing = barTotalWidth / 2 - 10;
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

  function getNiceStep(range: number) {
    const roughStep = range / 4 // số section mong muốn
    const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)))
    const residual = roughStep / magnitude

    if (residual >= 5) return 5 * magnitude
    if (residual >= 2) return 2 * magnitude
    return magnitude
  }
  // const values = convertedData.map(d => d.value)

  // const rawMin = Math.min(...values)
  // const rawMax = Math.max(...values)

  // const range = rawMax - rawMin
  // const stepValue = getNiceStep(range)

  // const minY =
  //   Math.floor(rawMin / stepValue) * stepValue

  // const maxY =
  //   Math.ceil(rawMax / stepValue) * stepValue

  // const noOfSections = (maxY - minY) / stepValue
  const values = convertedData.map(d => d.value);
  // const min = Math.min(...values);
  const min = Math.min(...values) - 10;
  // const max = Math.max(...values);
  const max = Math.max(...values) + 10;
  console.log('YYYYYYY', min, max)
  const padding = (max - min) * 0.2 || 10;
  const range = max - min
  const stepValue = Math.ceil(range / 2 / 10) * 10 // ~20
  console.log('padding:', padding)
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
            <LineChart
              data={convertedData}
              color="#2563eb" //màu đường line
              thickness={3} //độ dày đường line
              xAxisLabelTextStyle={{ color: '#333', fontSize: 12 }}
              // xAxisLabelRotation={0}
              dataPointsRadius={4}
              dataPointsColor="#3b82f6"
              showValuesAsDataPointsText
              showXAxisIndices={true}
              xAxisThickness={1}
              xAxisColor="#ccc"


              height={300}
              // yAxisExtraHeight={100} // ⬅️ thêm không gian Y
              // yAxisLabelTexts={[`${min}`, `${max}`]}
              // yAxisOffset={min}
              // // yAxisOffset={420}
              // maxValue={max}
              // stepValue={120}

              // yAxisOffset={min - padding}
              // maxValue={500}
              // noOfSections={3}
              // stepValue={100}  



              // startFillColor="#4ADE80"
              // endFillColor="#4ADE80"
              yAxisTextStyle={{
                color: '#10b981',
                fontSize: 12,
                fontWeight: '500',
              }}
            />
            {/* <LineChart
              data={[]}
              data2={convertedData}
              color="rgba(255, 255, 255, 0.25)"
              color2="#4ADE80"
              hideDataPoints2={false}
              hideYAxisText={true}
              hideDataPoints1={true}
              strokedashArray1={[12, 6]}
              spacing={9}
              startFillColor2="#4ADE80"
              endFillColor2="#4ADE80"
            /> */}
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
    left: 2
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
