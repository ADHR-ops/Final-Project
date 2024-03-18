import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import NavigationService from './services/navigation_service/navigation_service';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from 'expo-navigation-bar';
import { Colors } from "./constants/colors";
import Loading from "./components/loading/Loading";
import { PaperProvider } from 'react-native-paper';
import { lightTheme } from './colors';
import { UserProvider } from './services/context/usercontext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
export default function App() {

  const [fontsLoaded] = useFonts({
    'eczar-regular': require('./assets/fonts/Eczar-Regular.ttf'),
    'eczar-bold': require('./assets/fonts/Eczar-Bold.ttf'),
    'roboto-condensed-light': require('./assets/fonts/RobotoCondensed-Light.ttf'),
    'roboto-condensed-regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
    'roboto-condensed-medium': require('./assets/fonts/RobotoCondensed-Medium.ttf'),
    'roboto-condensed-bold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      try {
        await NavigationBar.setBackgroundColorAsync(Colors.backgroundColor);
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    };

    if (fontsLoaded) {
      hideSplashScreen().then(() => null);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style='dark' />
        <BottomSheetModalProvider>
          <PaperProvider theme={lightTheme}>
            <UserProvider>
              <NavigationService />
              <Toast />
            </UserProvider>
          </PaperProvider>
        </BottomSheetModalProvider >
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}
