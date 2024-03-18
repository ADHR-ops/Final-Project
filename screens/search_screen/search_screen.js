import {
    View,
    Text,
    FlatList,
    TextInput,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Sizes } from '../../constants/sizes';
import { Colors } from '../../constants/colors';
import { TypeScale } from '../../constants/type_scale';
import RecipeCard from '../../components/recipe_card/recipe_card';
import useDebounce from '../../hooks/debounce';
import { TextStrings } from '../../constants/text_strings';
import { useSharedValue } from 'react-native-reanimated';
import { supabase } from '../../services/supabase/client';
import Loading from '../../components/loading/Loading';
import { merge, mergeSort } from '../../utils';
import InputField from '../../components/InputField';
import { SearchNormal1 } from 'iconsax-react-native';
import ScreenHead from '../../components/ScreenHead/ScreenHead';
const marginTop = 200;
export default function SearchScreen() {
    let ReciesInView = useSharedValue([])
    const [Meals, setMeals] = useState([]);
    const [filteredMeals, setFilteredMeals] = useState([])
    const [userSearch, setUserSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const debounceduserSearch = useDebounce(userSearch) //deBouncing the user input

    useEffect(() => {
        const getAllRecipes = async () => {
            setLoading(true)
            const { data } = await supabase.from('Recipes').select()
            //sorting the data
            // bubbleSortRecipesByName(data)
            let sortedData = mergeSort(data)
            setLoading(false)
            setMeals(sortedData)
            setFilteredMeals(sortedData)
        }
        getAllRecipes()
    }, [])
    useEffect(() => {
        const getMealsByuserSearch = async () => {
            const filteredRecipes = Meals?.filter((r) => {
                return r.strMeal.trim().toLowerCase().includes(userSearch.trim().toLowerCase())
            })
            if (filteredRecipes.length > 0) {
                setFilteredMeals(filteredRecipes)
            } else {
                setFilteredMeals([])
            }
        };
        getMealsByuserSearch()
    }, [debounceduserSearch]);
    const onViewableItemsChanged = (items) => {
        ReciesInView.value = items.viewableItems
    }
    const viewabilityConfigCallbackPairs = useRef([
        { onViewableItemsChanged },
    ]);

    return (
        <View style={{ padding: Sizes.screenPadding, flex: 1 }}>
            <View style={{ flex: 0.2, justifyContent: 'space-between', alignItems: 'start' }}>
                <ScreenHead title='Search Recipe' />
                {/* <View style={styles.search_field}>
                    <TextInput
                        placeholder={TextStrings.search_placeholder}
                        cursorColor={Colors.darkColor}
                        value={userSearch}
                        onChangeText={setUserSearch}
                    />
                    <AntDesign name="search1" size={Sizes.search_icon_size} color={Colors.accentColor} />
                </View> */}
                <View style={{ zIndex: 90, marginVertical: 10 }}>
                    <InputField type='search' value={userSearch} setValue={setUserSearch} placeholder={TextStrings.search_placeholder}>
                        <SearchNormal1
                            size={Sizes.search_icon_size}
                            color={Colors.accentColor}

                        />
                    </InputField>
                </View>
            </View>
            <View style={{ flex: 0.77, marginTop: 15 }}>
                {
                    loading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Loading size={Sizes.indicator_size} color={Colors.accentColor} />
                    </View> :
                        <FlatList
                            ListEmptyComponent={() => <Text>No Data Found</Text>}
                            data={filteredMeals}
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            viewabilityConfigCallbackPairs={
                                viewabilityConfigCallbackPairs.current
                            }
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            renderItem={({ item, index }) => {
                                const itemName = item.strMeal;
                                const itemImg = item.strMealThumb;
                                const itemId = item.idMeal;
                                return <View style={{ margin: 5 }}><RecipeCard RecipesInView={ReciesInView} index={index} itemName={itemName} itemImg={itemImg} itemId={itemId} /></View>
                            }}
                            keyExtractor={(item) => item.idMeal}
                        />
                }

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    search_field: {
        flexDirection: 'row',
        marginHorizontal: 'auto',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderColor: Colors.accentColor,
        backgroundColor: 'rgb(226 232 240)',
        borderWidth: 2,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
