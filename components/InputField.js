import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { CustomStyles } from '../constants/custom_styles'
import { Colors } from '../constants/colors'
import { Eye, EyeSlash } from 'iconsax-react-native'
const InputField = ({ placeholder, type, value, setValue, children }) => {
    const [showPassword, setShowPassword] = useState(true)
    return (
        <View style={[styles.input]}>
            {children}
            <TextInput style={[{ width: '75%' }, type == 'search' ? { color: Colors.darkColor } : { color: Colors.lightColor }]} value={value} selectionColor={type == 'search' ? Colors.darkColor : Colors.lightColor} onChangeText={setValue} placeholder={placeholder} placeholderTextColor={type == 'search' ? Colors.darkColor : Colors.lightColor} secureTextEntry={type.toLowerCase().trim() == 'password' && !showPassword} />
            <View style={styles.eye}>
                {type.toLowerCase().trim() == 'password' && (
                    !showPassword ? <Eye size="23" color={Colors.lightColor} onPress={() => setShowPassword(true)} /> : <EyeSlash size="23" color={Colors.lightColor} onPress={() => setShowPassword(false)} />
                )}
            </View>
        </View>
    )
}

export default InputField

const styles = StyleSheet.create({

    input: {
        ...CustomStyles.input,
    },
    eye: {
        width: 30
    }
})