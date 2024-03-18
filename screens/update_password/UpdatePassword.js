import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, Text, TouchableOpacity, Image, Dimensions, TextInput, Alert } from 'react-native';
import { Colors } from '../../constants/colors';
import { TextStrings } from "../../constants/text_strings";
import { CustomStyles } from "../../constants/custom_styles";
import { Icons } from "../../constants/icons";
import TextIconButtonView from "../../components/text_icon_button_view/text_icon_button_view";
import { ImageStrings } from "../../constants/image_strings";
import { supabase } from '../../services/supabase/client';;
import Toast from 'react-native-toast-message';
import { Lock1, PasswordCheck } from 'iconsax-react-native';
import InputField from '../../components/InputField';
const UpdatePassword = ({ route, navigation }) => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const updatePasswordHandle = async () => {
    if (!password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        console.error('Error updating password:', error.message);
        Alert.alert('Error', 'An error occurred while updating the password. Please try again.');
        return;
      }

      // Password updated successfully
      Alert.alert('Success', 'Password updated successfully.');
      navigation.replace('Login');
    } catch (error) {
      console.error('Error during password update:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.backgroundColor} barStyle="light-content" />
      <Image style={styles.image} source={ImageStrings.forgetPasswordImage} />
      <Text style={styles.title}>{TextStrings.updatePasswordTitle}</Text>
      <Text style={styles.subtitle}>{TextStrings.updatePasswordSubtitle}</Text>
      <InputField value={password} setValue={setPassword} placeholder={TextStrings.password} type={'password'} >
        <Lock1 size="25" color={Colors.lightColor} />
      </InputField>
      <InputField value={confirmPassword} setValue={setConfirmPassword} placeholder={TextStrings.confirmPassword} type={'password'} >
        <PasswordCheck size="25" color={Colors.lightColor} />
      </InputField>
      <TouchableOpacity style={styles.button} onPress={updatePasswordHandle}>
        <TextIconButtonView textString={TextStrings.updatePassword} icon={Icons.rightArrowIcon} />
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

export default UpdatePassword;
