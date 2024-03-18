import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Image, Dimensions, TextInput, Alert } from 'react-native';
import { Colors } from '../../constants/colors';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TextStrings } from "../../constants/text_strings";
import { CustomStyles } from "../../constants/custom_styles";
import { Icons } from "../../constants/icons";
import TextIconButtonView from "../../components/text_icon_button_view/text_icon_button_view";
import { ImageStrings } from "../../constants/image_strings";
import { supabase } from '../../services/supabase/client';
import Toast from 'react-native-toast-message'
createNativeStackNavigator();

const ForgetPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const continueButtonHandle = async () => {
        let { error } = await supabase.auth.resetPasswordForEmail(email)
        if (error) {
            Toast.show({
                type: 'error',
                text1: error.toString(),
                position: 'bottom'
            });
            return

        } else {

            Toast.show({
                type: 'success',
                text1: `Password reset link has been sent to ${email}`,
                position: 'bottom'
            });
            setEmail('')
        }
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

export default ForgetPasswordScreen;