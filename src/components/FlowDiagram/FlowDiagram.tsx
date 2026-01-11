import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native'
import Svg, { Defs, LinearGradient, Stop, Rect, Text as SvgText, Circle, G, Path } from 'react-native-svg'

// const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const SCALE = 0.58

const CENTER_X = SCREEN_WIDTH / 2
const MAIN_W = Math.round(180 * SCALE)
const MAIN_H = Math.round(120 * SCALE)
const TOP_W = Math.round(160 * SCALE)
const TOP_H = Math.round(72 * SCALE)
const BOTTOM_W = Math.round(160 * SCALE)
const BOTTOM_H = Math.round(72 * SCALE)
const SIDE_W = TOP_W // Math.round(160 * SCALE)
const SIDE_H = TOP_H // Math.round(72 * SCALE)

// Độ dài đường ngang từ main box ra ngoài
const HORIZONTAL_LINE_LENGTH = Math.round(90 * SCALE)
// Độ dài đường dọc xuống dưới
const VERTICAL_LINE_LENGTH = Math.round(90 * SCALE)

// Thicken & rounding params
const ELBOW_STROKE = Math.round(12 * SCALE) // stroke width cho elbow (đỏ)
const MAIN_PIPE_STROKE = Math.round(12 * SCALE) // stroke width cho vertical blue/green
const CURVE_RADIUS = Math.round(18 * SCALE) // bán kính cong cho path Q

interface flowChartItem {
	label: string,
	code: string,
	value: {
		current: number,
		period: number
	},
	unit: string,
}
interface flowDiagramProps {
	data: {
		mntl: flowChartItem,
		qve: flowChartItem,
		qcm: flowChartItem,
		qxt: flowChartItem
		qxmt: flowChartItem
	}
}

export default function FlowDiagram(props: flowDiagramProps) {
	const { data } = props
	// Animation values
	// const animValue = useRef(new Animated.Value(0)).current

	// useEffect(() => {
	// 	const animate = () => {
	// 		Animated.loop(
	// 			Animated.timing(animValue, {
	// 				toValue: 1,
	// 				duration: 2200,
	// 				easing: Easing.linear,
	// 				useNativeDriver: true,
	// 			})
	// 		).start()
	// 	}
	// 	animate()
	// }, [])

	const mainX = CENTER_X - MAIN_W / 2
	const mainY = Math.round(140 * SCALE)

	const topX = CENTER_X - TOP_W / 2
	const topY = mainY - TOP_H - Math.round(80 * SCALE)


	const bottomX = CENTER_X - Math.round(BOTTOM_W / 2)
	const bottomY = mainY + MAIN_H + Math.round(85 * SCALE)

	// Điểm bắt đầu của đường line đỏ (giữa cạnh trái/phải của main box)
	const lineStartY = mainY + MAIN_H / 2

	// Điểm cuối của đường ngang bên trái
	const leftLineEndX = mainX - HORIZONTAL_LINE_LENGTH
	// Điểm cuối của đường ngang bên phải  
	const rightLineEndX = mainX + MAIN_W + HORIZONTAL_LINE_LENGTH

	// Điểm cuối của đường dọc (xuống dưới)
	const verticalLineEndY = lineStartY + VERTICAL_LINE_LENGTH

	// Box Qtf: nằm dưới đường line, căn giữa theo đường dọc bên trái
	const leftBoxX = leftLineEndX - SIDE_W / 2
	const leftBoxY = verticalLineEndY

	// Box Qxt: nằm dưới đường line, căn giữa theo đường dọc bên phải
	const rightBoxX = rightLineEndX - SIDE_W / 2
	const rightBoxY = verticalLineEndY

	// const pipeDotGap = Math.max(6, Math.round(12 * SCALE))
	// const pipeDotR = Math.max(1, Math.round(4 * SCALE))
	// const smallDotR = Math.max(1, Math.round(3 * SCALE))

	// Helpers to create a smooth elbow path (from (sx,sy) horizontal to (ex,ey) vertical)
	const makeElbowPath = (sx: number, sy: number, ex: number, ey: number, direction: 'left' | 'right') => {
		// We will move horizontally from sx to ex (or reverse) then curve down to ey.
		// Use a quadratic curve at the corner for smooth rounding.
		const midX = direction === 'left' ? ex + CURVE_RADIUS : ex - CURVE_RADIUS
		// path: move to sx,sy -> line to midX,sy -> quad to ex, midY (curve) then line to ex,ey
		// But a simpler smooth path: L to midX, then Q from (midX,sy) to (ex, midY) with control at (ex, sy)
		const path = `M ${sx} ${sy} L ${midX} ${sy} Q ${ex} ${sy} ${ex} ${sy + CURVE_RADIUS} L ${ex} ${ey}`
		return path
	}

	const minY = Math.min(0, topY - Math.round(50 * SCALE))
	const maxY = Math.max(bottomY + BOTTOM_H, rightBoxY + SIDE_H)
	const offsetY = Math.max(0, -minY) + Math.round(5 * SCALE)

	return (
		<View style={styles.container}>
			<Svg width={SCREEN_WIDTH} style={{ alignSelf: 'center' }} height={maxY - minY + offsetY + Math.round(5 * SCALE)}>
				<Defs>
					<LinearGradient id="mainGrad" x1="0%" y1="0%" x2="0%" y2="100%">
						<Stop offset="0%" stopColor="#1e6a9e" stopOpacity="1" />
						<Stop offset="100%" stopColor="#0d4a6f" stopOpacity="1" />
					</LinearGradient>
					<LinearGradient id="nodeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
						<Stop offset="0%" stopColor="#0f5f8a" stopOpacity="1" />
						<Stop offset="100%" stopColor="#0b4670" stopOpacity="1" />
					</LinearGradient>
				</Defs>

				<G transform={`translate(0, ${offsetY})`}>
					{/* Main box with subtle glow */}
					<G>
						{/* Glowing border */}
						<Rect x={mainX} y={mainY} rx={Math.round(16 * SCALE)} ry={Math.round(16 * SCALE)} width={MAIN_W} height={MAIN_H} fill="#101423" stroke="#22C5FF" strokeOpacity={0.4} strokeWidth={Math.max(1, Math.round(3 * SCALE))} />
						{/* Title */}
						<SvgText x={mainX + MAIN_W / 2} y={mainY + Math.round(28 * SCALE)} fontSize={Math.round(18 * SCALE)} fill="#22C5FF" fontWeight="700" textAnchor="middle">HỒ THỦY ĐIỆN</SvgText>
						{/* Subtitle */}
						<SvgText x={mainX + MAIN_W / 2} y={mainY + Math.round(46 * SCALE)} fontSize={Math.round(11 * SCALE)} fill="#C0C4CC" textAnchor="middle">{data.mntl.code}</SvgText>
						{/* Divider */}
						<Path
							d={`M ${mainX + Math.round(24 * SCALE)} ${mainY + Math.round(54 * SCALE)} L ${mainX + MAIN_W - Math.round(24 * SCALE)} ${mainY + Math.round(54 * SCALE)}`}
							stroke="#3A3F4A"
							strokeWidth={Math.max(1, Math.round(1 * SCALE))}
							strokeLinecap="round"
						/>
						{/* HT column */}
						<SvgText x={mainX + MAIN_W * 0.28} y={mainY + Math.round(74 * SCALE)} fontSize={Math.round(12 * SCALE)} fill="#C0C4CC" textAnchor="middle">HT</SvgText>
						<SvgText x={mainX + MAIN_W * 0.28} y={mainY + Math.round(94 * SCALE)} fontSize={Math.round(22 * SCALE)} fill="#22C5FF" fontWeight="700" textAnchor="middle">{data.mntl.value.current}</SvgText>
						<SvgText x={mainX + MAIN_W * 0.28} y={mainY + Math.round(110 * SCALE)} fontSize={Math.round(12 * SCALE)} fill="#C0C4CC88" textAnchor="middle">{data.mntl.unit}</SvgText>
						{/* CK column */}
						<SvgText x={mainX + MAIN_W * 0.72} y={mainY + Math.round(74 * SCALE)} fontSize={Math.round(12 * SCALE)} fill="#C0C4CC" textAnchor="middle">CK</SvgText>
						<SvgText x={mainX + MAIN_W * 0.72} y={mainY + Math.round(94 * SCALE)} fontSize={Math.round(22 * SCALE)} fill="#C0C4CC" fontWeight="700" textAnchor="middle">{data.mntl.value.period}</SvgText>
						<SvgText x={mainX + MAIN_W * 0.72} y={mainY + Math.round(110 * SCALE)} fontSize={Math.round(12 * SCALE)} fill="#C0C4CC88" textAnchor="middle">{data.mntl.unit}</SvgText>
						{/* Indicator circles */}
						<Circle cx={mainX + MAIN_W / 2} cy={mainY - Math.round(8 * SCALE)} r={Math.round(4 * SCALE)} fill="#22C5FF" opacity={0.8} />
						<Circle cx={mainX - Math.round(8 * SCALE)} cy={mainY + MAIN_H / 2} r={Math.round(4 * SCALE)} fill="#ef4444" opacity={0.8} />
						<Circle cx={mainX + MAIN_W + Math.round(8 * SCALE)} cy={mainY + MAIN_H / 2} r={Math.round(4 * SCALE)} fill="#ef4444" opacity={0.8} />
						<Circle cx={mainX + MAIN_W / 2} cy={mainY + MAIN_H + Math.round(8 * SCALE)} r={Math.round(4 * SCALE)} fill="#00E676" opacity={0.8} />
					</G>

					{/* Vertical pipe from Qve to Hồ Thủy Điện - màu xanh dương (dày + bo) */}
					<Path
						d={`M ${CENTER_X} ${topY + TOP_H + Math.round(30 * SCALE)} L ${CENTER_X} ${mainY + Math.round(3 * SCALE)}`}
						stroke="#3ea8d6"
						strokeWidth={MAIN_PIPE_STROKE}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>

					{/* Chấm trắng chạy trên đường xanh dương - từ Qve xuống Hồ Thủy Điện */}
					{/* {(() => {
						const dotStartY = topY + TOP_H + Math.round(30 * SCALE) // Bắt đầu xa hơn nữa từ cạnh dưới Qve
						const dotEndY = mainY + Math.round(3 * SCALE) // Kết thúc rất gần trong hộp Hồ Thủy Điện
						const totalDistance = dotEndY - dotStartY
						const numDots = 3
						const dotSpacing = 0.12 // Khoảng cách giữa các chấm
						const animDuration = 0.6 // Thời gian mỗi chấm di chuyển (60% của animation)

						return new Array(numDots).fill(0).map((_, i) => {
							const delay = i * dotSpacing

							const dotProgress = animValue.interpolate({
								inputRange: [0, 1],
								outputRange: [-delay, 1 - delay],
								extrapolate: 'clamp',
							})

							const translateY = dotProgress.interpolate({
								inputRange: [0, animDuration],
								outputRange: [0, totalDistance],
								extrapolate: 'clamp',
							})

							const opacity = dotProgress.interpolate({
								inputRange: [-0.05, 0, animDuration - 0.05, animDuration],
								outputRange: [0, 1, 1, 0],
								extrapolate: 'clamp',
							})

							return (
								<AnimatedCircle
									key={`blue-flow-${i}`}
									cx={CENTER_X}
									cy={dotStartY}
									r={smallDotR}
									fill="#ffffff"
									opacity={opacity}
									style={{
										transform: [{ translateY }],
									}}
								/>
							)
						})
					})()} */}

					{/* Top node (Qve) */}
					<G>
						{/* Khung: bo tròn hơn, màu nền đúng hơn */}
						<Rect
							x={topX}
							y={topY}
							rx={Math.round(22 * SCALE)}
							ry={Math.round(22 * SCALE)}
							width={TOP_W}
							height={TOP_H + Math.round(32 * SCALE)}
							fill="#0F1115"
							stroke="#3ea8d655"
							strokeWidth={Math.max(1, Math.round(2 * SCALE))}
						/>

						{/* Title */}
						<SvgText
							x={topX + TOP_W / 2}
							y={topY + Math.round(22 * SCALE)}
							fontSize={Math.round(16 * SCALE)}
							fontWeight="700"
							fill="#6A8CFF"
							textAnchor="middle"
						>
							{data.qve.code}
						</SvgText>

						{/* Divider */}
						<Path
							d={`M ${topX + Math.round(12 * SCALE)} ${topY + Math.round(32 * SCALE)} 
            L ${topX + TOP_W - Math.round(12 * SCALE)} ${topY + Math.round(32 * SCALE)}`}
							stroke="#3A3F4A"
							strokeWidth={Math.max(1, Math.round(1 * SCALE))}
							strokeLinecap="round"
						/>

						{/* HT column */}
						<SvgText
							x={topX + TOP_W * 0.28}
							y={topY + Math.round(52 * SCALE)}
							fontSize={Math.round(12 * SCALE)}
							fill="#C0C4CC"
							textAnchor="middle"
						>
							HT
						</SvgText>

						<SvgText
							x={topX + TOP_W * 0.28}
							y={topY + Math.round(74 * SCALE)}
							fontSize={Math.round(26 * SCALE)}
							fill="#6A8CFF"
							fontWeight="700"
							textAnchor="middle"
						>
							{data.qve.value.current}
						</SvgText>

						<SvgText
							x={topX + TOP_W * 0.28}
							y={topY + Math.round(92 * SCALE)}
							fontSize={Math.round(12 * SCALE)}
							fill="#C0C4CC88"
							textAnchor="middle"
						>
							{data.qve.unit}
						</SvgText>

						{/* CK column */}
						<SvgText
							x={topX + TOP_W * 0.72}
							y={topY + Math.round(52 * SCALE)}
							fontSize={Math.round(12 * SCALE)}
							fill="#C0C4CC"
							textAnchor="middle"
						>
							CK
						</SvgText>

						<SvgText
							x={topX + TOP_W * 0.72}
							y={topY + Math.round(74 * SCALE)}
							fontSize={Math.round(26 * SCALE)}
							fill="#ffffff"
							fontWeight="700"
							textAnchor="middle"
						>
							{data.qve.value.period}
						</SvgText>

						<SvgText
							x={topX + TOP_W * 0.72}
							y={topY + Math.round(92 * SCALE)}
							fontSize={Math.round(12 * SCALE)}
							fill="#C0C4CC88"
							textAnchor="middle"
						>
							{data.qve.unit}
						</SvgText>
					</G>

					{/* Left smooth elbow (red) - path with quadratic curve */}
					<G>
						<Path
							d={makeElbowPath(mainX, lineStartY, leftLineEndX, verticalLineEndY, 'left')}
							stroke="#ef4444"
							strokeWidth={ELBOW_STROKE}
							strokeLinecap="round"
							strokeLinejoin="round"
							fill="none"
						/>
						{/* Animation dots along computed path: approximate using same logic as before (moves horizontally then down) */}
						{/* {(() => {
							const horizontalDistance = mainX - leftLineEndX
							const verticalDistance = leftBoxY - lineStartY // Kết thúc chạm cạnh trên Qtf
							const totalDistance = horizontalDistance + verticalDistance
							const numDots = 3
							const dotSpacing = 0.12
							const animDuration = 0.6

							return new Array(numDots).fill(0).map((_, i) => {
								const delay = i * dotSpacing

								const dotProgress = animValue.interpolate({
									inputRange: [0, 1],
									outputRange: [-delay, 1 - delay],
									extrapolate: 'clamp',
								})

								const horizontalRatio = (horizontalDistance / totalDistance) * animDuration

								const posX = dotProgress.interpolate({
									inputRange: [0, horizontalRatio, animDuration],
									outputRange: [0, -horizontalDistance, -horizontalDistance],
									extrapolate: 'clamp',
								})

								const posY = dotProgress.interpolate({
									inputRange: [0, horizontalRatio, animDuration],
									outputRange: [0, 0, verticalDistance],
									extrapolate: 'clamp',
								})

								const opacity = dotProgress.interpolate({
									inputRange: [-0.05, 0, animDuration - 0.05, animDuration],
									outputRange: [0, 1, 1, 0],
									extrapolate: 'clamp',
								})

								return (
									<AnimatedCircle
										key={`left-flow-${i}`}
										cx={mainX}
										cy={lineStartY}
										r={smallDotR}
										fill="#ffffff"
										opacity={opacity}
										style={{
											transform: [{ translateX: posX }, { translateY: posY }],
										}}
									/>
								)
							})
						})()} */}
					</G>

					{/* Right smooth elbow (red) */}
					<G>
						<Path
							d={makeElbowPath(mainX + MAIN_W, lineStartY, rightLineEndX, verticalLineEndY, 'right')}
							stroke="#ef4444"
							strokeWidth={ELBOW_STROKE}
							strokeLinecap="round"
							strokeLinejoin="round"
							fill="none"
						/>
						{/* Dots */}
						{/* {(() => {
							const horizontalDistance = rightLineEndX - (mainX + MAIN_W)
							const verticalDistance = rightBoxY - lineStartY
							const totalDistance = horizontalDistance + verticalDistance
							const numDots = 3
							const dotSpacing = 0.12
							const animDuration = 0.6

							return new Array(numDots).fill(0).map((_, i) => {
								const delay = i * dotSpacing

								const dotProgress = animValue.interpolate({
									inputRange: [0, 1],
									outputRange: [-delay, 1 - delay],
									extrapolate: 'clamp',
								})

								const horizontalRatio = (horizontalDistance / totalDistance) * animDuration

								const posX = dotProgress.interpolate({
									inputRange: [0, horizontalRatio, animDuration],
									outputRange: [0, horizontalDistance, horizontalDistance],
									extrapolate: 'clamp',
								})

								const posY = dotProgress.interpolate({
									inputRange: [0, horizontalRatio, animDuration],
									outputRange: [0, 0, verticalDistance],
									extrapolate: 'clamp',
								})

								const opacity = dotProgress.interpolate({
									inputRange: [-0.05, 0, animDuration - 0.05, animDuration],
									outputRange: [0, 1, 1, 0],
									extrapolate: 'clamp',
								})

								return (
									<AnimatedCircle
										key={`right-flow-${i}`}
										cx={mainX + MAIN_W}
										cy={lineStartY}
										r={smallDotR}
										fill="#ffffff"
										opacity={opacity}
										style={{
											transform: [{ translateX: posX }, { translateY: posY }],
										}}
									/>
								)
							})
						})()} */}
					</G>

					{/* Left side box (Qtf) - nằm dưới và căn giữa đường line */}
					<G>
						<Rect x={leftBoxX} y={leftBoxY} rx={Math.round(14 * SCALE)} ry={Math.round(14 * SCALE)} width={SIDE_W} height={TOP_H + Math.round(32 * SCALE)} fill="#0a0a10" stroke="#ef4444" strokeWidth={Math.max(1, Math.round(3 * SCALE))} />
						{/* Title */}
						<SvgText x={leftBoxX + SIDE_W / 2} y={leftBoxY + Math.round(24 * SCALE)}
							fontSize={Math.max(10, Math.round(14 * SCALE))}
							fill="#ef4444" fontWeight="700" textAnchor="middle">{data.qxmt.code}</SvgText>
						{/* Divider */}
						<Path
							d={`M ${leftBoxX + Math.round(10 * SCALE)} ${leftBoxY + Math.round(32 * SCALE)} L ${leftBoxX + SIDE_W - Math.round(10 * SCALE)} ${leftBoxY + Math.round(32 * SCALE)}`}
							stroke="#ffffff"
							strokeOpacity={0.3}
							strokeWidth={1}
							strokeLinecap="round"
						/>
						{/* HT COLUMN */}
						<SvgText x={leftBoxX + SIDE_W * 0.28} y={leftBoxY + Math.round(52 * SCALE)}
							fontSize={Math.round(12 * SCALE)} fill="#ffffff" textAnchor="middle">HT</SvgText>
						<SvgText x={leftBoxX + SIDE_W * 0.28} y={leftBoxY + Math.round(74 * SCALE)}
							fontSize={Math.round(26 * SCALE)} fontWeight="700"
							fill="#ef4444" textAnchor="middle">{data.qxmt.value.current}</SvgText>
						<SvgText x={leftBoxX + SIDE_W * 0.28} y={leftBoxY + Math.round(92 * SCALE)}
							fontSize={Math.round(12 * SCALE)} fill="#C0C4CC88" textAnchor="middle">{data.qxmt.unit}</SvgText>
						{/* CK COLUMN */}
						<SvgText x={leftBoxX + SIDE_W * 0.72} y={leftBoxY + Math.round(52 * SCALE)}
							fontSize={Math.round(12 * SCALE)} fill="#ffffff" textAnchor="middle">CK</SvgText>
						<SvgText x={leftBoxX + SIDE_W * 0.72} y={leftBoxY + Math.round(74 * SCALE)}
							fontSize={Math.round(26 * SCALE)} fontWeight="700"
							fill="#ffffff" textAnchor="middle">{data.qxmt.value.period}</SvgText>
						<SvgText x={leftBoxX + SIDE_W * 0.72} y={leftBoxY + Math.round(92 * SCALE)}
							fontSize={Math.round(12 * SCALE)} fill="#C0C4CC88" textAnchor="middle">{data.qxmt.unit}</SvgText>
					</G>

					{/* Right side box (Qxt) - nằm dưới và căn giữa đường line */}
					<G>
						<Rect x={rightBoxX} y={rightBoxY} rx={Math.round(14 * SCALE)} ry={Math.round(14 * SCALE)} width={SIDE_W} height={TOP_H + Math.round(32 * SCALE)} fill="#0a0a10" stroke="#FFD600" strokeWidth={Math.max(1, Math.round(3 * SCALE))} />
						<SvgText x={rightBoxX + SIDE_W / 2} y={rightBoxY + Math.round(22 * SCALE)} fontSize={Math.round(16 * SCALE)} fill="#ef4444" fontWeight="700" textAnchor="middle">{data.qxt.code}</SvgText>
						<Path
							d={`M ${rightBoxX + Math.round(12 * SCALE)} ${rightBoxY + Math.round(32 * SCALE)} L ${rightBoxX + SIDE_W - Math.round(12 * SCALE)} ${rightBoxY + Math.round(32 * SCALE)}`}
							stroke="#3A3F4A"
							strokeWidth={Math.max(1, Math.round(1 * SCALE))}
							strokeLinecap="round"
						/>
						<SvgText x={rightBoxX + SIDE_W * 0.28} y={rightBoxY + Math.round(52 * SCALE)} fontSize={Math.round(12 * SCALE)} fill="#C0C4CC" textAnchor="middle">HT</SvgText>
						<SvgText x={rightBoxX + SIDE_W * 0.28} y={rightBoxY + Math.round(74 * SCALE)} fontSize={Math.round(26 * SCALE)} fill="#ef4444" fontWeight="700" textAnchor="middle">{data.qxt.value.current}</SvgText>
						<SvgText x={rightBoxX + SIDE_W * 0.28} y={rightBoxY + Math.round(92 * SCALE)} fontSize={Math.round(12 * SCALE)} fill="#C0C4CC88" textAnchor="middle">{data.qxt.unit}</SvgText>
						<SvgText x={rightBoxX + SIDE_W * 0.72} y={rightBoxY + Math.round(52 * SCALE)} fontSize={Math.round(12 * SCALE)} fill="#C0C4CC" textAnchor="middle">CK</SvgText>
						<SvgText x={rightBoxX + SIDE_W * 0.72} y={rightBoxY + Math.round(74 * SCALE)} fontSize={Math.round(26 * SCALE)} fill="#ffffff" fontWeight="700" textAnchor="middle">{data.qxt.value.period}</SvgText>
						<SvgText x={rightBoxX + SIDE_W * 0.72} y={rightBoxY + Math.round(92 * SCALE)} fontSize={Math.round(12 * SCALE)} fill="#C0C4CC88" textAnchor="middle">{data.qxt.unit}</SvgText>
					</G>

					{/* Vertical pipe from Hồ Thủy Điện to Qcm - màu xanh lá (dày + bo) */}
					<Path
						d={`M ${CENTER_X} ${mainY + MAIN_H} L ${CENTER_X} ${bottomY}`}
						stroke="#00E676"
						strokeWidth={MAIN_PIPE_STROKE}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>

					{/* Chấm trắng chạy trên đường xanh lá - từ Hồ Thủy Điện xuống Qcem */}
					{/* {(() => {
						const dotStartY = mainY + MAIN_H // Bắt đầu sát cạnh dưới Hồ Thủy Điện
						const dotEndY = bottomY // Kết thúc chạm cạnh trên Qcem
						const totalDistance = dotEndY - dotStartY
						const numDots = 3
						const dotSpacing = 0.12
						const animDuration = 0.6

						return new Array(numDots).fill(0).map((_, i) => {
							const delay = i * dotSpacing

							const dotProgress = animValue.interpolate({
								inputRange: [0, 1],
								outputRange: [-delay, 1 - delay],
								extrapolate: 'clamp',
							})

							const translateY = dotProgress.interpolate({
								inputRange: [0, animDuration],
								outputRange: [0, totalDistance],
								extrapolate: 'clamp',
							})

							const opacity = dotProgress.interpolate({
								inputRange: [-0.05, 0, animDuration - 0.05, animDuration],
								outputRange: [0, 1, 1, 0],
								extrapolate: 'clamp',
							})

							return (
								<AnimatedCircle
									key={`green-flow-${i}`}
									cx={CENTER_X}
									cy={dotStartY}
									r={smallDotR}
									fill="#ffffff"
									opacity={opacity}
									style={{
										transform: [{ translateY }],
									}}
								/>
							)
						})
					})()} */}

					{/* Bottom node (Qcem) */}
					<G>
						<Rect x={bottomX} y={bottomY} rx={Math.round(14 * SCALE)} ry={Math.round(14 * SCALE)} width={BOTTOM_W} height={TOP_H + Math.round(32 * SCALE)} fill="#0a0a10" stroke="#00E676" strokeWidth={Math.max(1, Math.round(3 * SCALE))} />
						<SvgText x={bottomX + BOTTOM_W / 2} y={bottomY + Math.round(22 * SCALE)} fontSize={Math.round(16 * SCALE)} fill="#00E676" fontWeight="700" textAnchor="middle">{data.qcm.code}</SvgText>
						{/* Divider */}
						<Path
							d={`M ${bottomX + Math.round(12 * SCALE)} ${bottomY + Math.round(32 * SCALE)} L ${bottomX + BOTTOM_W - Math.round(12 * SCALE)} ${bottomY + Math.round(32 * SCALE)}`}
							stroke="#3A3F4A"
							strokeWidth={Math.max(1, Math.round(1 * SCALE))}
							strokeLinecap="round"
						/>
						{/* HT column */}
						<SvgText x={bottomX + BOTTOM_W * 0.28} y={bottomY + Math.round(52 * SCALE)} fontSize={Math.round(12 * SCALE)} fill="#C0C4CC" textAnchor="middle">HT</SvgText>
						<SvgText x={bottomX + BOTTOM_W * 0.28} y={bottomY + Math.round(74 * SCALE)} fontSize={Math.round(26 * SCALE)} fill="#00E676" fontWeight="700" textAnchor="middle">{data.qcm.value.current}</SvgText>
						<SvgText x={bottomX + BOTTOM_W * 0.28} y={bottomY + Math.round(92 * SCALE)} fontSize={Math.round(12 * SCALE)} fill="#C0C4CC88" textAnchor="middle">{data.qcm.unit}</SvgText>
						{/* CK column */}
						<SvgText x={bottomX + BOTTOM_W * 0.72} y={bottomY + Math.round(52 * SCALE)} fontSize={Math.round(12 * SCALE)} fill="#C0C4CC" textAnchor="middle">CK</SvgText>
						<SvgText x={bottomX + BOTTOM_W * 0.72} y={bottomY + Math.round(74 * SCALE)} fontSize={Math.round(26 * SCALE)} fill="#C0C4CC" fontWeight="700" textAnchor="middle">{data.qcm.value.period}</SvgText>
						<SvgText x={bottomX + BOTTOM_W * 0.72} y={bottomY + Math.round(92 * SCALE)} fontSize={Math.round(12 * SCALE)} fill="#C0C4CC88" textAnchor="middle">{data.qcm.unit}</SvgText>
					</G>
				</G>
			</Svg>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingVertical: 8,
		backgroundColor: 'transparent',
	},
})
