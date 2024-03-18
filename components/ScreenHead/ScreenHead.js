import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/colors'
export default function ScreenHead({ title }) {
    return (
        <View style={styles.boxShaow}>
            <View style={[styles.mainScreenHeadingContainer]}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', color: Colors.lightColor }}>{title}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    mainScreenHeadingContainer: {
        backgroundColor: Colors.accentColor,
        borderRadius: 16,
        overflow: 'hidden',
        paddingVertical: 10,
    },
    boxShaow: {
        borderRadius: 16,
        backgroundColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    }
})