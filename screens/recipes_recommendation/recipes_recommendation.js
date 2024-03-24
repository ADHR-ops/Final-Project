import React, { useState, useEffect } from 'react';
import * as Network from 'expo-network';
import Toast from 'react-native-toast-message';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { TextStrings } from "../../constants/text_strings";
import { Colors } from "../../constants/colors";
import { Sizes } from "../../constants/sizes";
import { TypeScale } from "../../constants/type_scale";
import { ImageStrings } from "../../constants/image_strings";
import { CustomStyles } from "../../constants/custom_styles";

import axios from 'axios';
import { tryEach } from 'async';
import ScreenHead from '../../components/ScreenHead/ScreenHead';



const RecipesRecommendation = ({ navigation }) => {
    const [ipAddr, setIpAddr] = useState(null)
    const [ingredients, setIngredients] = useState("")
    const [recommendedRecipes, setRecommendedRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getIpAddress = async () => {
            const ip = await Network.getIpAddressAsync();
            setIpAddr(ip)
        }

        getIpAddress()
    }, [])

    let getRecipeRecommendations = async () => {
        setLoading(true)
        setRecommendedRecipes([])
        try {
            const res = await axios.post(`http://192.168.1.105:5000/recommend`, {
                ingredients: ingredients
            });
            setRecommendedRecipes(res.data)

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'The server hosting the ML model is not yet working',
                position: 'bottom'
            });
        } finally {

            setLoading(false)
        }
    };

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <View style={{ marginVertical: 20 }}>
                <ScreenHead title='Recipe Recommendations' />
            </View>
            <TextInput
                style={styles.input}
                placeholder={TextStrings.ingredients}
                placeholderTextColor={Colors.accentColor}
                cursorColor={Colors.accentColor}
                value={ingredients}
                onChangeText={(text) => setIngredients(text)}
            // keyboardType={'Recipe_Recommend'}
            />

            <TouchableOpacity disabled={loading ? true : false} style={styles.button} onPress={getRecipeRecommendations}>
                <Text style={TypeScale.button}>{!loading ? "Recommend Recipe" : 'Loading'}</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 30 }}>
                <FlatList
                    data={recommendedRecipes}
                    renderItem={({ item }) => {
                        return <Text style={{ color: 'white' }}>{item}</Text>
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        width: '100%',
    },

});

export default RecipesRecommendation;
