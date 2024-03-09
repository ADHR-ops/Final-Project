import {Text, View, StyleSheet} from "react-native";
import {TypeScale} from "../../constants/type_scale";
import React from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import {Sizes} from "../../constants/sizes";
import {Colors} from "../../constants/colors";

const TextIconButtonView = ({textString, icon}) => {
    return (
        <View style={styles.buttonView}>
            <Text style={styles.text}>{textString}</Text>
            <Icon name={icon} size={styles.icon.size} color={styles.icon.color}/>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        ...TypeScale.button,
        marginRight: 10,
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        size: Sizes.button * 0.85,
        color: Colors.buttonTextColor,
    }
});

export default TextIconButtonView;