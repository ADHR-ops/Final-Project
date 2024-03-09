import { View, Text } from 'react-native'
import React from 'react'
import Button from '../../components/button/button'
import { Colors } from '../../constants/colors'
import { supabase } from '../../services/supabase/client'
export default function SettingsScreen({ navigation }) {
    const signOut = async () => {
        await supabase().auth.signOut()
        navigation.replace("Login")
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.lightColor }}>
            <Text>settings_screen</Text>
            <Button onButtonPress={() => signOut()} text={'logout'} />
        </View>
    )
}
