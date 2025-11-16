import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styles from './CommonCard.styles'

type Props = {
    children?: React.ReactNode;
};


function CommonCard({ children }: Props) {

    return (
        <LinearGradient
            colors={['rgba(26, 35, 50, 0.7)', 'rgba(42, 53, 68, 0.7)', 'rgba(26, 35, 50, 0.7)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            {children}
        </LinearGradient>
    )
}

export default CommonCard
