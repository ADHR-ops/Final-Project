import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { TextStrings } from "../../constants/text_strings";
import { Colors } from "../../constants/colors";
import { Sizes } from "../../constants/sizes";
import { TypeScale } from "../../constants/type_scale";
import { ImageStrings } from "../../constants/image_strings";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomStyles } from "../../constants/custom_styles";
import SocialMediaButton from "../../components/social_media_button/social_media_button";
import Button from "../../components/button/button";
import { supabase } from "../../services/supabase/client";
import InputField from "../../components/InputField";
import { Lock1, Subtitle, User } from "iconsax-react-native";

createNativeStackNavigator();

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSignUp = async () => {
    if (!username) {
      alert("Please enter a username");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    if (!email) {
      alert("Please enter an email address");
      return;
    }

    if (!password) {
      alert("Please enter a password");
      return;
    }

    if (!confirmPassword) {
      alert("Please confirm your password");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setIsSubmitting(true)
      const { data } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
          },
        },
      });

      await supabase.from('Users').insert({ email: email, username: username, uid: data.user.id, avatar: null })
      setIsSubmitting(false)
      navigation.replace("Login");
    } catch (error) {
      console.error("Error signing up:", error.message);
      setIsSubmitting(false)
      return;
    }
  };

  const goToLoginScreen = () => {
    navigation.replace("Login");
  };
  const googleSignUp = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.error("Google Sign-In error:", error.message);
      } else {
        console.log("Google Sign-In success:", data);
        navigation.replace("Dashboard");
      }
    } catch (error) {
      console.error("Error during Google Sign-In:", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Colors.backgroundColor}
          barStyle="light-content"
        />
        <Image style={styles.image} source={ImageStrings.mainLogo} />
        <Text style={styles.title}>{TextStrings.signUpTitle}</Text>
        <Text style={styles.subtitle}>{TextStrings.signUpSubtitle}</Text>
        <InputField value={username} setValue={setUsername} placeholder={TextStrings.username} type={'text'} >
          <User size="25" color={Colors.lightColor} />
        </InputField>
        <InputField value={email} setValue={setEmail} placeholder={TextStrings.email} type={'email'} >
          <Subtitle size="25" color={Colors.lightColor} />
        </InputField>
        <InputField value={password} setValue={setPassword} placeholder={TextStrings.password} type={'password'} >
          <Lock1 size="25" color={Colors.lightColor} />
        </InputField>
        <InputField value={confirmPassword} setValue={setConfirmPassword} placeholder={TextStrings.confirmPassword} type={'password'} >
          <Lock1 size="25" color={Colors.lightColor} />
        </InputField>
        <Button text={!isSubmitting ? TextStrings.signUp : 'Loading'} disabled={isSubmitting ? true : false} onButtonPress={handleSignUp} />
        <View style={styles.formHeight}></View>
        {/* <SocialMediaButton
          onButtonPress={googleSignUp}
          text={TextStrings.continueWithGoogle}
          source={ImageStrings.googleLogo}
        /> */}
        <TouchableOpacity onPress={goToLoginScreen}>
          <Text style={styles.footerText}>{TextStrings.alreadyRegistered}</Text>
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
    height: Dimensions.get("window").width * 0.45,
    width: Dimensions.get("window").width * 0.45,
    borderRadius: Dimensions.get("window").width * 0.45
  },
  input: {
    ...CustomStyles.input,
    width: "100%",
  },
  formHeight: {
    height: Sizes.formHeight,
  },
  footerText: {
    ...TypeScale.subtitle2,
    marginTop: Sizes.formHeight * 2,
  },
});

export default SignUpScreen;
