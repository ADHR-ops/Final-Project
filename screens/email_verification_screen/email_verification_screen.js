import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { Colors } from '../../constants/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextStrings } from "../../constants/text_strings";
import { CustomStyles } from "../../constants/custom_styles";
import { Icons } from "../../constants/icons";
import TextIconButtonView from "../../components/text_icon_button_view/text_icon_button_view";
import { ImageStrings } from "../../constants/image_strings";
import { supabase } from '../../services/supabase/client';
createNativeStackNavigator();

const EmailVerificationScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const continueButtonHandle = async () => {

    };



    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.backgroundColor} barStyle="light-content" />
            <Image style={styles.image} source={ImageStrings.forgetPasswordImage} />
            <Text style={styles.title}>{TextStrings.forgetPasswordTitle}</Text>
            <Text style={styles.subtitle}>{TextStrings.forgetPasswordSubtitle}</Text>
            <TextInput
                style={styles.input}
                placeholder={TextStrings.email}
                placeholderTextColor={Colors.lightColor}
                cursorColor={Colors.lightColor}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardAppearance='light'
                keyboardType={'email-address'}
            />
            <TextInput
                style={styles.input}
                placeholder="Verification Token"
                placeholderTextColor={Colors.lightColor}
                cursorColor={Colors.lightColor}
                value={token}
                onChangeText={(text) => setToken(text)} // Update the token state
                keyboardAppearance="light"
                secureTextEntry={true} // You might want to make this secure if it's a sensitive input
            />
            <TouchableOpacity style={styles.button} onPress={continueButtonHandle}>
                <TextIconButtonView textString={TextStrings.continue} icon={Icons.rightArrowIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: CustomStyles.screenContainerStyle,
    title: CustomStyles.title,
    subtitle: CustomStyles.subtitle,
    image: {
        height: Dimensions.get('window').width * 0.45,
        width: Dimensions.get('window').width * 0.45,
    },
    input: {
        ...CustomStyles.input,
        width: '100%',
    },
    button: {
        ...CustomStyles.button,
        width: '100%'
    },
});

export default EmailVerificationScreen;