import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../../screens/login_screen/login_screen";
import SignUpScreen from "../../screens/sign_up_screen/sign_up_screen";
import DashboardScreen from "../../screens/dashboard_screen/dashboard_screen";
import WelcomeScreen from "../../screens/welcome_screen/welcome_screen";
import ForgetPasswordScreen from "../../screens/forget_password_screen/forget_password_screen";
import RecipeDetailScreen from "../../screens/recepie_detail/recepie_detail";
import Youtube_Screen from "../../screens/youtube_screen/youtube_screen";
import UpdatePassword from "../../screens/update_password/UpdatePassword";
import SavedRecipes from "../../screens/saved_recipes/saved_recipes";
const Stack = createNativeStackNavigator();

export default function NavigationService() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="RecipeDetailScreen"
                    component={RecipeDetailScreen}

                />
                <Stack.Screen
                    name="youtube_screen"
                    component={Youtube_Screen}

                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ForgetPassword"
                    component={ForgetPasswordScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUpScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Dashboard"
                    component={DashboardScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="UpdatePassword"
                    component={UpdatePassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SavedRecipes"
                    component={SavedRecipes}

                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}