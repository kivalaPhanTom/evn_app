import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    layout: {
        width: '100%',
        height: '100%',
    //    backgroundColor: '#020b1a'
        backgroundColor: 'transparent' // Transparent để hiển thị TwinkleStars
        // backgroundColor: "red",
        // displayflex:'flex',
        // justifyContent:'center',
        // alignItems:'center',
    },
    container: {
        width: '93%',
        // height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'transparent', // Thêm transparent cho container
    }
});
export default styles;