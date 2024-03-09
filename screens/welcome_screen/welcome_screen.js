import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Colors } from '../../constants/colors';
import { TextStrings } from "../../constants/text_strings";
import { CustomStyles } from "../../constants/custom_styles";
import { Icons } from "../../constants/icons";
import TextIconButtonView from "../../components/text_icon_button_view/text_icon_button_view";
import Animated, { useSharedValue, withSpring, withDelay } from 'react-native-reanimated'
import { ImageStrings } from "../../constants/image_strings";


const WelcomeScreen = ({ navigation }) => {
    const outerRingPadding = useSharedValue(0)
    const innerRingPadding = useSharedValue(0)
    const buttonOpacity = useSharedValue(0)
    useEffect(() => {
        outerRingPadding.value = 0
        innerRingPadding.value = 0
        buttonOpacity.value = 0
        innerRingPadding.value = withDelay(600, withSpring(innerRingPadding.value + 40))
        outerRingPadding.value = withDelay(800, withSpring(outerRingPadding.value + 50))
        buttonOpacity.value = withDelay(1600, withSpring(buttonOpacity.value + 1))
    })
    const continueButtonHandle = () => {
        console.log("Taking user to Registration Screen");
        navigation.replace("Dashboard");
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.backgroundColor} barStyle="light-content" />
            <View style={styles.container}>
                <Animated.View
                    style={{ padding: outerRingPadding, backgroundColor: 'rgba(255, 255, 255,0.2)', borderRadius: 200 }}>
                    <Animated.View style={{
                        padding: innerRingPadding,
                        backgroundColor: 'rgba(255, 255, 255,0.2)',
                        borderRadius: 200,
                    }}>
                        <Image style={styles.image} source={ImageStrings.mainLogo} />
                    </Animated.View>
                </Animated.View>
            </View>
            <View style={{ marginBottom: 30, width: '100%' }}>
                <Text style={styles.title}>{TextStrings.welcomeTitle}</Text>
                <Text style={styles.subtitle}>{TextStrings.welcomeSubtitle}</Text>
                <TouchableOpacity onPress={continueButtonHandle}>
                    <Animated.View style={[styles.button, { opacity: buttonOpacity }]}>
                        <TextIconButtonView textString={TextStrings.continue} icon={Icons.rightArrowIcon} />
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: CustomStyles.screenContainerStyle,
    title: CustomStyles.title,
    subtitle: CustomStyles.subtitle,
    image: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.3,
        borderRadius: Dimensions.get('window').width * 0.3
    },
    button: {
        ...CustomStyles.button,
        width: '100%'
    },
});

export default WelcomeScreen;