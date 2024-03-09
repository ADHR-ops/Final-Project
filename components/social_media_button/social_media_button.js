import {Text, StyleSheet, TouchableOpacity, Image, View} from 'react-native'
import React from 'react'
import { CustomStyles } from '../../constants/custom_styles'
import { TypeScale } from '../../constants/type_scale'
import {Colors} from "../../constants/colors";

export default function SocialMediaButton({ text, onButtonPress, source }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
            <View style={styles.buttonView}>
                <Image source={source} style={CustomStyles.socialMediaButtonImage}/>
                <Text style={styles.buttonText}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    button: {
        ...CustomStyles.socialMediaButton,
        width: '100%',
    },
    buttonView: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        ...TypeScale.button,
        color: Colors.lightColor,
        marginLeft: 5.0,
    },
})