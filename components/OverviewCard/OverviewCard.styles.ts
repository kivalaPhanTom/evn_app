// import { StyleSheet } from 'react-native'
// export const styles = StyleSheet.create({
//     card: {

//         borderRadius: 12,
//         backgroundColor: '#101726',
//         paddingVertical: 12,
//         paddingHorizontal: 16,
//         shadowColor: '#000',
//         shadowOpacity: 0.3,
//         shadowOffset: { width: 0, height: 4 },
//         shadowRadius: 8,
//         elevation: 5,
//         width:'100%'
//     },
//     title: {
//         color: '#A9B3C1',
//         fontSize: 13,
//         fontWeight: '500',
//         marginBottom: 4,
//     },
//     totalPower: {
//         color: '#4A6BFF',
//         fontSize: 48,
//         fontWeight: '700',
//         lineHeight: 54,
//     },
//     unit: {
//         color: '#A9B3C1',
//         fontSize: 18,
//         fontWeight: '600',
//     },
//     avg: {
//         color: '#A9B3C1',
//         fontSize: 13,
//         fontWeight: '500',
//         marginTop: 6,
//     },
//     list: {
//         marginTop: 10,
//     },
//     item: {
//         fontSize: 14,
//         marginBottom: 3,
//         fontWeight: '500',
//     },
//     value: {
//         color: '#FFFFFF',
//         fontWeight: '700',
//     },
// });
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    numberText: {
        fontSize: 64,
        fontWeight: 'bold',
        // Các style khác cho chữ...
    },
    maskText: {
        backgroundColor: 'transparent',
        color: 'black',
    },
    gradientOverlay: {
        flex: 1,
        // Hoặc sử dụng: ...StyleSheet.absoluteFillObject
    },
    container: {
        padding: 2,

    },
    container1: {
        height: 60, // Phải đủ lớn hơn fontSize của Text
        width: 300,
        
    },
    card: {
        // backgroundColor: "red",
    },

    title: {
        color: "white"
    },
    gradientBorder: {
        borderRadius: 20,
        padding: 1.5,
    },
    mainContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        textAlign: 'left',
        padding: 20
    },
    leftColumn: {
        flexShrink: 0,
        // display: 'flex',
        flexDirection: 'column',
        gap: 4,
    },
    rightColumn: {
        flex: 1,
        // display: 'flex',
        flexDirection: 'column',
        gap: 10,
    },
    totalPower: {
        color: 'yellow',
        fontSize: 64,
        fontWeight: 300,
        // lineHeight: 1,
        letterSpacing: -2,
        opacity: 0.6,
    },
    unit: {
        color: 'white',
        fontSize: 20,
        fontWeight: 400,
        opacity: 0.6,
    },
    avg: {
        fontSize: 14,
        opacity: 0.5,
    },


    stationRow: {

    },
    stationLeft: {

    },
    bullet: {

    },
    stationName: {

    },
    stationPower: {

    }
    // card: {
    //     borderRadius: 19,
    //     backgroundColor: 'rgba(20, 28, 45, 0.9)',
    //     paddingVertical: 18,
    //     paddingHorizontal: 20,
    //     minWidth: 340,
    // },
    // title: {
    //     color: '#7B8394',
    //     fontSize: 11,
    //     fontWeight: '600',
    //     letterSpacing: 1.5,
    //     marginBottom: 12,
    // },
    // mainContent: {
    //     flexDirection: 'row',
    //     gap: 24,
    // },
    // leftColumn: {
    //     flex: 1,
    //     justifyContent: 'flex-start',
    // },
    // totalPower: {
    //     fontSize: 64,
    //     fontWeight: 300,
    //     lineHeight: 1,
    //     letterSpacing:-2,
    //     // fontSize: 80,
    //     // fontWeight: '700',
    //     color: '#4A7FFF',
    //     // lineHeight: 85,
    //     textShadowColor: 'rgba(74, 127, 255, 0.5)',
    //     textShadowOffset: { width: 0, height: 0 },
    //     textShadowRadius: 15,
    // },
    // unit: {
    //     color: '#7B8394',
    //     fontSize: 18,
    //     fontWeight: '600',
    //     marginTop: -8,
    //     marginBottom: 8,
    // },
    // avg: {
    //     color: '#7B8394',
    //     fontSize: 13,
    //     fontWeight: '500',
    // },
    // rightColumn: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     gap: 10,
    // },
    // stationRow: {
    //     flexDirection: 'column',
    //     gap: 2,
    // },
    // stationLeft: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     gap: 8,
    // },
    // bullet: {
    //     width: 6,
    //     height: 6,
    //     borderRadius: 3,
    // },
    // stationName: {
    //     color: '#C5CAD6',
    //     fontSize: 13,
    //     fontWeight: '500',
    // },
    // stationPower: {
    //     fontSize: 16,
    //     fontWeight: '700',
    //     marginLeft: 14,
    // },
});