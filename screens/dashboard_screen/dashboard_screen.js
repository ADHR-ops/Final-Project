import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from "../home_screen/home_screen";
import DrinkScreen from "../drink_screen/drink_screen";
import SearchScreen from "../search_screen/search_screen";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import UserProfileScreen from "../profile_screen/profile_screen";
import { Colors } from "../../constants/colors";
import { Sizes } from '../../constants/sizes';
import RecipesRecommendation from '../recipes_recommendation/recipes_recommendation';

const Tab = createMaterialBottomTabNavigator();

const DashboardScreen = () => {
    return (
        <Tab.Navigator
            theme={{ colors: { primary: 'red' } }}
            shifting={true}
            initialRouteName="HomeScreen"
            backBehavior='initialRoute'
            activeColor={Colors.lightColor}
            inactiveColor={Colors.lightColor}
            barStyle={{
                backgroundColor: Colors.backgroundColor,
            }}
        >
            <Tab.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    // tabBarColor: 'red',
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color }) => (
                        <AntDesign name="home" color={focused ? 'black' : color} size={Sizes.icon_size} />
                    ),
                }}
            />
            {/*<Tab.Screen*/}
            {/*    name="DrinkScreen"*/}
            {/*    component={DrinkScreen}*/}
            {/*    options={{*/}
            {/*        tabBarColor: 'red',*/}
            {/*        tabBarLabel: 'Drink',*/}
            {/*        tabBarIcon: ({ focused, color }) => (*/}
            {/*            <FontAwesome5 name="wine-bottle" color={focused ? 'black' : color} size={Sizes.icon_size} />*/}
            {/*        ),*/}
            {/*    }}*/}
            {/*/>*/}
            <Tab.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ focused, color }) => (
                        <AntDesign name="search1" color={focused ? 'black' : color} size={Sizes.icon_size} />
                    ),
                }}
            />
            <Tab.Screen
                name="RecipesRecommendation"
                component={RecipesRecommendation}
                options={{
                    tabBarLabel: 'Recommendation',
                    tabBarIcon: ({ focused, color }) => (
                        <FontAwesome5 name="fire" color={focused ? 'black' : color} size={Sizes.icon_size} />
                    ),
                }}
            />
            <Tab.Screen
                name="UserProfileScreen"
                component={UserProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused, color }) => (
                        <AntDesign name="user" color={focused ? 'black' : color} size={Sizes.icon_size} />
                    ),
                }}
            />

        </Tab.Navigator>
    );
}

export default DashboardScreen;