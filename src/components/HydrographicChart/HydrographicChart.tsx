import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Svg, {
  Path,
  Circle,
  Line,
  Text as SvgText,
} from 'react-native-svg';
import WaterDrop from '../WaterDrop/WaterDrop.component';
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

/* ===== HELPERS ===== */
const sanitizeNumber = (v: unknown): number | null => {
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

interface Props {
  data: ChartPoint[];
}

const HydrographicChart: React.FC<Props> = ({ }) => {
  const threshold = 450;

  let convertedData = [
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
  const data: { label: string; value: number }[] = convertedData.map((item, index) => ({
    label: `${index}`,
    value: item.avgVolume,
    // labelComponent: () => (
    //   <Text style={{ color: 'red', fontSize: 12, textAlign: 'center' }}>{index}</Text>
    // ),
  }))

  if (!data || data.length < 2) return null;

  // ✅ sanitize
  const safeData = data
    .map(d => ({ ...d, value: sanitizeNumber(d.value) }))
    .filter(d => d.value !== null) as {
      label: string;
      value: number;
    }[];

  if (safeData.length < 2) return null;

  const values = safeData.map(d => d.value);

  let min = Math.min(...values);
  let max = Math.max(...values);

  if (min === max) {
    min -= 1;
    max += 1;
  }

  const padding = 10;
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
  const thresholdY =
    threshold !== undefined
      ? PADDING_TOP +
      ((maxY - threshold) / (maxY - minY)) * CHART_HEIGHT
      : null;

  return (
    <View style={styles.wrapper}>
      {/* ===== STICKY Y AXIS ===== */}
      <Svg
        width={Y_AXIS_WIDTH}
        height={CHART_HEIGHT + PADDING_TOP + PADDING_BOTTOM}
        style={styles.yAxis}
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
              {Math.round(value)}
            </SvgText>
          );
        })}
      </Svg>

      {/* ===== SCROLLABLE CHART ===== */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: Y_AXIS_WIDTH - 10 }}
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
              stroke="#FF3B30"
              strokeWidth={2}
              strokeDasharray="6 4"
            />
          )}
        </Svg>

      </ScrollView>
      {thresholdY !== null && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            left: Y_AXIS_WIDTH,
            right: 8,
            top: 8,
          }}
        >
          <Svg
            width="100%"
            height={CHART_HEIGHT + PADDING_TOP + PADDING_BOTTOM}
          >
            <SvgText
              x="100%"
              dx={-8}
              y={thresholdY - 6}
              fill="#FF3B30"
              fontSize={12}
              fontWeight="600"
              textAnchor="end"
            >
              {threshold}m
            </SvgText>
          </Svg>
        </View>
      )}
    </View>
  );
};

export default HydrographicChart;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#1b1b4f',
    paddingVertical: 8,
  },
  yAxis: {
    position: 'absolute',
    left: 0,
    top: 8,
    zIndex: 10,
    backgroundColor: '#1b1b4f',
  },
});
