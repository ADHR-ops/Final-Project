import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  ScrollView

} from 'react-native';
import Toast from 'react-native-toast-message';
import { TextStrings } from "../../constants/text_strings";
import { Colors } from "../../constants/colors";
import { Sizes } from "../../constants/sizes";
import { TypeScale } from "../../constants/type_scale";
import { ImageStrings } from "../../constants/image_strings";
import { CustomStyles } from "../../constants/custom_styles";
import Button from '../../components/button/button';
import SocialMediaButton from "../../components/social_media_button/social_media_button";
import { supabase } from '../../services/supabase/client';
import InputField from '../../components/InputField';
import { Lock1, Subtitle } from 'iconsax-react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleLogin = async () => {

    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Email or Password cannot be empty',
        position: 'bottom'
      });
      return;
    }

    try {
      setIsSubmitting(true)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Toast.show({
          type: 'error',
          text1: 'Invalid Email!!!',
          position: 'bottom'
        });
        setIsSubmitting(false)
        return;
      }


      // User successfully authenticated
      setIsSubmitting(false)
      navigation.replace("Dashboard");
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.message,
        position: 'bottom'
      });

    }
    return;
  };

  const forgetPasswordHandle = () => {
    console.log('Taking user to forget password screen');
    navigation.navigate("ForgetPassword");
  };

  const goToRegisterScreen = () => {
    navigation.replace("SignUp");
  };
  const googleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (error) {
        console.error('Google Sign-In error:', error.message);
      } else {
        console.log('Google Sign-In success:', data);

        navigation.replace('Dashboard');
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error.message);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <StatusBar backgroundColor={Colors.backgroundColor} barStyle="light-content" />
        <Image style={styles.image} source={ImageStrings.mainLogo} />
        <Text style={styles.title}>{TextStrings.loginTitle}</Text>
        <Text style={styles.subtitle}>{TextStrings.loginSubtitle}</Text>

        <InputField value={email} setValue={setEmail} placeholder={TextStrings.email} type={'email'} >
          <Subtitle size="25" color={Colors.lightColor} />
        </InputField>
        <InputField value={password} setValue={setPassword} placeholder={TextStrings.password} type={'password'} >
          <Lock1 size="25" color={Colors.lightColor} />
        </InputField>

        <View style={styles.forgotPasswordView}>
          <TouchableOpacity onPress={forgetPasswordHandle}>
            <Text style={styles.forgotPasswordText}>{TextStrings.forgetPassword}</Text>
          </TouchableOpacity>
        </View>

        <Button disabled={isSubmitting ? true : false} onButtonPress={handleLogin} text={!isSubmitting ? TextStrings.login : 'Loading'} />

        <View style={styles.formHeight}></View>

        {/* <SocialMediaButton onButtonPress={googleSignUp} text={TextStrings.continueWithGoogle} source={ImageStrings.googleLogo} /> */}
        <TouchableOpacity onPress={goToRegisterScreen}>
          <Text style={styles.footerText}>{TextStrings.notRegistered}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: CustomStyles.screenScrollContainerStyle,
  container: CustomStyles.screenContainerStyle,
  title: CustomStyles.title,
  subtitle: CustomStyles.subtitle,
  image: {
    height: Dimensions.get('window').width * 0.45,
    width: Dimensions.get('window').width * 0.45,
    borderRadius: Dimensions.get("window").width * 0.45
  },
  input: {
    ...CustomStyles.input,
    width: '100%',
  },
  forgotPasswordView: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: Sizes.formHeight,
  },
  forgotPasswordText: TypeScale.button,
  button: {
    ...CustomStyles.button,
    width: '100%',
  },
  formHeight: {
    height: Sizes.formHeight,
  },
  footerText: {
    ...TypeScale.subtitle2,
    marginTop: Sizes.formHeight * 2,
  },
});

export default LoginScreen;
