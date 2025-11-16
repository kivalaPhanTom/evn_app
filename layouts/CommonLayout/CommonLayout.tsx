import { View, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import styles from "./CommonLayout.styles"

interface CommonLayoutInterface {
    title: string;
    children?: React.ReactNode;
}
function CommonLayout(props: CommonLayoutInterface) {
    const { title, children } = props
    const width = 300
    const height = 1
    const color = "#7a8596"
    const style = { 'marginVertical': 10 }

return (
    <View style={styles.layout}>
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.mainContent}>
                {children}
            </View>
            <View  style={[styles.lineContainer, style]}>
                <LinearGradient
                    colors={[
                        `${color}00`, // Trong suốt ở đầu
                        `${color}AA`, // Đậm ở giữa
                        `${color}00`, // Trong suốt ở cuối
                    ]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0, 0.5, 1]}
                    style={[styles.gradientLine, { width, height }]}
                />
            </View>

        </View>
    </View>
)
}


export default CommonLayout
