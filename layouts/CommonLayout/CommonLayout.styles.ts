import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    layout: {
        width: '100%',
        marginBottom:25
        // height: '100%',
        // backgroundColor: "red",
        // displayflex:'flex',
        // justifyContent:'center',
        // alignItems:'center',
    },
    container: {
        width: '100%',
        // height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    title: {
        color: "white",
        fontSize: 20,
        fontWeight: 600,
    },
    mainContent: {
        marginTop: 15
    },
    gradientLine: {
        // height: 1,
        // marginVertical: 16,
        // width: '100%',
        borderRadius: 1,

    },
    lineContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default styles;