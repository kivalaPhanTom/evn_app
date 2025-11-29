import React, { useEffect, useRef } from 'react'
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native'
import Svg, { Defs, LinearGradient, Stop, Rect, Text as SvgText, Circle, G, Line } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const SCALE = 0.6

const CENTER_X = SCREEN_WIDTH / 2
const MAIN_W = Math.round(180 * SCALE)
const MAIN_H = Math.round(120 * SCALE)
const TOP_W = Math.round(160 * SCALE)
const TOP_H = Math.round(72 * SCALE)
const BOTTOM_W = Math.round(160 * SCALE)
const BOTTOM_H = Math.round(72 * SCALE)
const SIDE_W = Math.round(120 * SCALE)
const SIDE_H = Math.round(92 * SCALE)

// Độ dài đường ngang từ main box ra ngoài
const HORIZONTAL_LINE_LENGTH = Math.round(80 * SCALE)
// Độ dài đường dọc xuống dưới
const VERTICAL_LINE_LENGTH = Math.round(60 * SCALE)

export default function FlowDiagram() {
	// Animation values
	const animValue = useRef(new Animated.Value(0)).current

	useEffect(() => {
		const animate = () => {
			Animated.loop(
				Animated.timing(animValue, {
					toValue: 1,
					duration: 2000,
					easing: Easing.linear,
					useNativeDriver: true,
				})
			).start()
		}
		animate()
	}, [])

	const mainX = CENTER_X - MAIN_W / 2
	const mainY = Math.round(140 * SCALE)

	const topX = CENTER_X - TOP_W / 2
	const topY = mainY - TOP_H - Math.round(36 * SCALE)

	const bottomX = CENTER_X - Math.round(BOTTOM_W / 2)
	const bottomY = mainY + MAIN_H + Math.round(80 * SCALE)

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

	const pipeDotGap = Math.max(6, Math.round(12 * SCALE))
	const pipeDotR = Math.max(1, Math.round(4 * SCALE))
	const smallDotR = Math.max(1, Math.round(3 * SCALE))

	return (
		<View style={styles.container}>
			<Svg width={SCREEN_WIDTH} height={Math.max(bottomY + BOTTOM_H, rightBoxY + SIDE_H) + 40}>
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

				{/* Top node (Qve) */}
				<G>
					<Rect x={topX} y={topY} rx={Math.round(10 * SCALE)} ry={Math.round(10 * SCALE)} width={TOP_W} height={TOP_H} fill="#0a0a10" stroke="#3ea8d6" strokeWidth={Math.max(1, Math.round(2 * SCALE))} />
					<SvgText x={topX + TOP_W / 2} y={topY + Math.round(20 * SCALE)} fontSize={Math.max(10, Math.round(14 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="middle">Qve</SvgText>
					{/* Đường line dưới tiêu đề */}
					<Line
						x1={topX + Math.round(10 * SCALE)}
						y1={topY + Math.round(26 * SCALE)}
						x2={topX + TOP_W - Math.round(10 * SCALE)}
						y2={topY + Math.round(26 * SCALE)}
						stroke="#ffffff"
						strokeOpacity={0.3}
						strokeWidth={1}
					/>
					<SvgText x={topX + Math.round(12 * SCALE)} y={topY + Math.round(44 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="start">HT</SvgText>
					<SvgText x={topX + TOP_W / 2} y={topY + Math.round(44 * SCALE)} fontSize={Math.max(12, Math.round(18 * SCALE))} fill="#3ea8d6" fontWeight="700" textAnchor="middle">850</SvgText>
					<SvgText x={topX + TOP_W - Math.round(12 * SCALE)} y={topY + Math.round(44 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="end">m³/s</SvgText>
					<SvgText x={topX + Math.round(12 * SCALE)} y={topY + Math.round(60 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="start">CK</SvgText>
					<SvgText x={topX + TOP_W / 2} y={topY + Math.round(60 * SCALE)} fontSize={Math.max(9, Math.round(13 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="middle">845</SvgText>
					<SvgText x={topX + TOP_W - Math.round(12 * SCALE)} y={topY + Math.round(60 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="end">m/s</SvgText>
				</G>

				{/* Vertical line from Qve to Hồ Thủy Điện - màu xanh dương */}
				<Line
					x1={CENTER_X}
					y1={topY + TOP_H}
					x2={CENTER_X}
					y2={mainY}
					stroke="#3ea8d6"
					strokeWidth={Math.max(2, Math.round(4 * SCALE))}
					strokeLinecap="round"
				/>
				{/* Chấm trắng chạy trên đường xanh dương - từ Qve xuống Hồ Thủy Điện */}
				{(() => {
					const dotStartY = topY + TOP_H // Bắt đầu sát cạnh dưới Qve
					const dotEndY = mainY // Kết thúc chạm cạnh trên Hồ Thủy Điện
					const totalDistance = dotEndY - dotStartY
					const numDots = 3
					const dotSpacing = 0.1 // Khoảng cách giữa các chấm
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
				})()}

				{/* Main box with subtle glow */}
				<G>
					<Rect x={mainX - Math.round(6 * SCALE)} y={mainY - Math.round(6 * SCALE)} rx={Math.round(16 * SCALE)} ry={Math.round(16 * SCALE)} width={MAIN_W + Math.round(12 * SCALE)} height={MAIN_H + Math.round(12 * SCALE)} fill="none" stroke="#62c2ff" strokeOpacity={0.12} strokeWidth={Math.max(1, Math.round(8 * SCALE))} />
					<Rect x={mainX} y={mainY} rx={Math.round(12 * SCALE)} ry={Math.round(12 * SCALE)} width={MAIN_W} height={MAIN_H} fill="url(#mainGrad)" stroke="#0a7aa3" strokeWidth={Math.max(1, Math.round(2 * SCALE))} />
					<SvgText x={mainX + MAIN_W / 2} y={mainY + Math.round(24 * SCALE)} fontSize={Math.max(10, Math.round(14 * SCALE))} fill="#0ea5e9" fontWeight="700" textAnchor="middle">HỒ THỦY ĐIỆN</SvgText>
					<SvgText x={mainX + MAIN_W / 2} y={mainY + Math.round(40 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" textAnchor="middle">MNTL</SvgText>
					{/* Đường line trắng mờ dưới MNTL */}
					<Line
						x1={mainX + Math.round(12 * SCALE)}
						y1={mainY + Math.round(46 * SCALE)}
						x2={mainX + MAIN_W - Math.round(12 * SCALE)}
						y2={mainY + Math.round(46 * SCALE)}
						stroke="#ffffff"
						strokeOpacity={0.3}
						strokeWidth={1}
					/>
					<SvgText x={mainX + Math.round(12 * SCALE)} y={mainY + Math.round(64 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="start">HT</SvgText>
					<SvgText x={mainX + MAIN_W / 2} y={mainY + Math.round(64 * SCALE)} fontSize={Math.max(12, Math.round(18 * SCALE))} fill="#0ea5e9" fontWeight="700" textAnchor="middle">528.5</SvgText>
					<SvgText x={mainX + MAIN_W - Math.round(12 * SCALE)} y={mainY + Math.round(64 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="end">m</SvgText>
					<SvgText x={mainX + Math.round(12 * SCALE)} y={mainY + Math.round(82 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="start">CK</SvgText>
					<SvgText x={mainX + MAIN_W / 2} y={mainY + Math.round(82 * SCALE)} fontSize={Math.max(9, Math.round(13 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="middle">528.0</SvgText>
					<SvgText x={mainX + MAIN_W - Math.round(12 * SCALE)} y={mainY + Math.round(82 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="end">m</SvgText>
				</G>

				{/* Left L-connector: ngang ra rồi xuống dưới */}
				<G>
					{/* Đường ngang từ main box sang trái */}
					<Line
						x1={mainX}
						y1={lineStartY}
						x2={leftLineEndX}
						y2={lineStartY}
						stroke="#ef4444"
						strokeWidth={Math.max(1, Math.round(4 * SCALE))}
						strokeLinecap="round"
					/>
					{/* Đường dọc xuống dưới */}
					<Line
						x1={leftLineEndX}
						y1={lineStartY}
						x2={leftLineEndX}
						y2={verticalLineEndY}
						stroke="#ef4444"
						strokeWidth={Math.max(1, Math.round(4 * SCALE))}
						strokeLinecap="round"
					/>
					{/* Chấm trắng chạy trên đường đỏ - từ Hồ Thủy Điện sang trái xuống Qtf */}
					{(() => {
						const horizontalDistance = mainX - leftLineEndX
						const verticalDistance = leftBoxY - lineStartY // Kết thúc chạm cạnh trên Qtf
						const totalDistance = horizontalDistance + verticalDistance
						const numDots = 3
						const dotSpacing = 0.1
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
					})()}
				</G>

				{/* Right L-connector: ngang ra rồi xuống dưới */}
				<G>
					{/* Đường ngang từ main box sang phải */}
					<Line
						x1={mainX + MAIN_W}
						y1={lineStartY}
						x2={rightLineEndX}
						y2={lineStartY}
						stroke="#ef4444"
						strokeWidth={Math.max(1, Math.round(4 * SCALE))}
						strokeLinecap="round"
					/>
					{/* Đường dọc xuống dưới */}
					<Line
						x1={rightLineEndX}
						y1={lineStartY}
						x2={rightLineEndX}
						y2={verticalLineEndY}
						stroke="#ef4444"
						strokeWidth={Math.max(1, Math.round(4 * SCALE))}
						strokeLinecap="round"
					/>
					{/* Chấm trắng chạy trên đường đỏ - từ Hồ Thủy Điện sang phải xuống Qxt */}
					{(() => {
						const horizontalDistance = rightLineEndX - (mainX + MAIN_W)
						const verticalDistance = rightBoxY - lineStartY // Kết thúc chạm cạnh trên Qxt
						const totalDistance = horizontalDistance + verticalDistance
						const numDots = 3
						const dotSpacing = 0.1
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
					})()}
				</G>

				{/* Left side box (Qtf) - nằm dưới và căn giữa đường line */}
				<G>
					<Rect x={leftBoxX} y={leftBoxY} rx={Math.round(10 * SCALE)} ry={Math.round(10 * SCALE)} width={SIDE_W} height={SIDE_H} fill="#0a0a10" stroke="#ef4444" strokeWidth={Math.max(1, Math.round(3 * SCALE))} />
					<SvgText x={leftBoxX + SIDE_W / 2} y={leftBoxY + Math.round(24 * SCALE)} fontSize={Math.max(10, Math.round(14 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="middle">Qtf</SvgText>
					{/* Đường line dưới tiêu đề */}
					<Line
						x1={leftBoxX + Math.round(10 * SCALE)}
						y1={leftBoxY + Math.round(30 * SCALE)}
						x2={leftBoxX + SIDE_W - Math.round(10 * SCALE)}
						y2={leftBoxY + Math.round(30 * SCALE)}
						stroke="#ffffff"
						strokeOpacity={0.3}
						strokeWidth={1}
					/>
					<SvgText x={leftBoxX + Math.round(10 * SCALE)} y={leftBoxY + Math.round(50 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="start">HT</SvgText>
					<SvgText x={leftBoxX + SIDE_W / 2} y={leftBoxY + Math.round(50 * SCALE)} fontSize={Math.max(12, Math.round(18 * SCALE))} fill="#ef4444" fontWeight="700" textAnchor="middle">50</SvgText>
					<SvgText x={leftBoxX + SIDE_W - Math.round(10 * SCALE)} y={leftBoxY + Math.round(50 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="end">m³/s</SvgText>
					<SvgText x={leftBoxX + Math.round(10 * SCALE)} y={leftBoxY + Math.round(68 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="start">CK</SvgText>
					<SvgText x={leftBoxX + SIDE_W / 2} y={leftBoxY + Math.round(68 * SCALE)} fontSize={Math.max(9, Math.round(13 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="middle">50</SvgText>
					<SvgText x={leftBoxX + SIDE_W - Math.round(10 * SCALE)} y={leftBoxY + Math.round(68 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="end">m</SvgText>
				</G>

				{/* Right side box (Qxt) - nằm dưới và căn giữa đường line */}
				<G>
					<Rect x={rightBoxX} y={rightBoxY} rx={Math.round(10 * SCALE)} ry={Math.round(10 * SCALE)} width={SIDE_W} height={SIDE_H} fill="#0a0a10" stroke="#ef4444" strokeWidth={Math.max(1, Math.round(3 * SCALE))} />
					<SvgText x={rightBoxX + SIDE_W / 2} y={rightBoxY + Math.round(24 * SCALE)} fontSize={Math.max(10, Math.round(14 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="middle">Qxt</SvgText>
					{/* Đường line dưới tiêu đề */}
					<Line
						x1={rightBoxX + Math.round(10 * SCALE)}
						y1={rightBoxY + Math.round(30 * SCALE)}
						x2={rightBoxX + SIDE_W - Math.round(10 * SCALE)}
						y2={rightBoxY + Math.round(30 * SCALE)}
						stroke="#ffffff"
						strokeOpacity={0.3}
						strokeWidth={1}
					/>
					<SvgText x={rightBoxX + Math.round(10 * SCALE)} y={rightBoxY + Math.round(50 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="start">HT</SvgText>
					<SvgText x={rightBoxX + SIDE_W / 2} y={rightBoxY + Math.round(50 * SCALE)} fontSize={Math.max(12, Math.round(18 * SCALE))} fill="#ef4444" fontWeight="700" textAnchor="middle">150</SvgText>
					<SvgText x={rightBoxX + SIDE_W - Math.round(10 * SCALE)} y={rightBoxY + Math.round(50 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="end">m³/s</SvgText>
					<SvgText x={rightBoxX + Math.round(10 * SCALE)} y={rightBoxY + Math.round(68 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="start">CK</SvgText>
					<SvgText x={rightBoxX + SIDE_W / 2} y={rightBoxY + Math.round(68 * SCALE)} fontSize={Math.max(9, Math.round(13 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="middle">175</SvgText>
					<SvgText x={rightBoxX + SIDE_W - Math.round(10 * SCALE)} y={rightBoxY + Math.round(68 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="end">m</SvgText>
				</G>

				{/* Vertical line from Hồ Thủy Điện to Qcm - màu xanh lá */}
				<Line
					x1={CENTER_X}
					y1={mainY + MAIN_H}
					x2={CENTER_X}
					y2={bottomY}
					stroke="#00E676"
					strokeWidth={Math.max(2, Math.round(4 * SCALE))}
					strokeLinecap="round"
				/>
				{/* Chấm trắng chạy trên đường xanh lá - từ Hồ Thủy Điện xuống Qcem */}
				{(() => {
					const dotStartY = mainY + MAIN_H // Bắt đầu sát cạnh dưới Hồ Thủy Điện
					const dotEndY = bottomY // Kết thúc chạm cạnh trên Qcem
					const totalDistance = dotEndY - dotStartY
					const numDots = 3
					const dotSpacing = 0.1
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
				})()}

				{/* Bottom node (Qcem) */}
				<G>
					<Rect x={bottomX} y={bottomY} rx={Math.round(8 * SCALE)} ry={Math.round(8 * SCALE)} width={BOTTOM_W} height={BOTTOM_H} fill="#0a0a10" stroke="#3ea8d6" strokeWidth={Math.max(1, Math.round(2 * SCALE))} />
					<SvgText x={bottomX + BOTTOM_W / 2} y={bottomY + Math.round(20 * SCALE)} fontSize={Math.max(9, Math.round(13 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="middle">Qcem</SvgText>
					{/* Đường line dưới tiêu đề */}
					<Line
						x1={bottomX + Math.round(10 * SCALE)}
						y1={bottomY + Math.round(26 * SCALE)}
						x2={bottomX + BOTTOM_W - Math.round(10 * SCALE)}
						y2={bottomY + Math.round(26 * SCALE)}
						stroke="#ffffff"
						strokeOpacity={0.3}
						strokeWidth={1}
					/>
					<SvgText x={bottomX + Math.round(12 * SCALE)} y={bottomY + Math.round(44 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="start">HT</SvgText>
					<SvgText x={bottomX + BOTTOM_W / 2} y={bottomY + Math.round(44 * SCALE)} fontSize={Math.max(12, Math.round(18 * SCALE))} fill="#00E676" fontWeight="700" textAnchor="middle">650</SvgText>
					<SvgText x={bottomX + BOTTOM_W - Math.round(12 * SCALE)} y={bottomY + Math.round(44 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="end">m³/s</SvgText>
					<SvgText x={bottomX + Math.round(12 * SCALE)} y={bottomY + Math.round(60 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="start">CK</SvgText>
					<SvgText x={bottomX + BOTTOM_W / 2} y={bottomY + Math.round(60 * SCALE)} fontSize={Math.max(9, Math.round(13 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="middle">620</SvgText>
					<SvgText x={bottomX + BOTTOM_W - Math.round(12 * SCALE)} y={bottomY + Math.round(60 * SCALE)} fontSize={Math.max(9, Math.round(11 * SCALE))} fill="#ffffff" fontWeight="700" textAnchor="end">m</SvgText>
				</G>
			</Svg>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		width: SCREEN_WIDTH,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingVertical: 8,
		backgroundColor: 'transparent',
	},
})
