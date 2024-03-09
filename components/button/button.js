import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { CustomStyles } from '../../constants/custom_styles'
import { TypeScale } from '../../constants/type_scale'
export default function Button({ text, onButtonPress,disabled=false }) {
    return (
        <TouchableOpacity disabled={disabled} style={styles.button} onPress={onButtonPress}>
            <Text style={TypeScale.button}>{text}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        ...CustomStyles.button,
        width: '100%',
        marginVertical:10
    },
})