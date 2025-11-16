import { View, Text } from 'react-native'
import styles from "./CommonLayout.styles"

interface CommonLayoutInterface {
    title: string;
    children?: React.ReactNode;
}
function CommonLayout(props: CommonLayoutInterface) {
    const { title, children } = props
    return (
        <View style={styles.layout}>
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.mainContent}>
                    {children}
                </View>
            </View>
        </View>
    )
}


export default CommonLayout
