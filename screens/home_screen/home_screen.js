import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, View, StyleSheet, Alert } from 'react-native'
import Animated, { FadeInLeft, useSharedValue } from 'react-native-reanimated'
import RecipeCard from "../../components/recipe_card/recipe_card";
import CategoryCircularCard from '../../components/category_circular_card/category_circular_card'
import { Colors } from '../../constants/colors'
import { Sizes } from '../../constants/sizes'
import { TypeScale } from '../../constants/type_scale'
import { ImageStrings } from "../../constants/image_strings";
import { supabase } from '../../services/supabase/client'
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native"
import Loading from "../../components/loading/Loading";
import { Dimensions } from 'react-native'
import { useRef } from 'react';
import { mergeSort } from '../../utils';

export default function HomeScreen() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
    const [categories, setCategories] = useState([])
    const [Recipes, setRecipes] = useState([])
    const [activeCategory, setActiveCategory] = useState('Beef')
    const [loading, setLoading] = useState(false);
    const [viewAble, setViewAble] = useState([])
    let ReciesInView = useSharedValue(viewAble)


    useEffect(() => {
        const getCategories = async () => {
            try {
                setRecipes([])
                const { data } = await supabase.from('categories').select()
                // const data = await getData(mealdb_category_api)
                if (data) {
                    setCategories(data)
                }
            } catch (error) {
                Alert.alert("Something went wrong", error)
            }
        }
        getCategories()
    }, [])

    // fetch the data from api whenever category changes
    useEffect(() => {
        const getRecipeByCategory = async () => {
            try {
                setLoading(true)
                setRecipes([])
                const { data } = await supabase.from('RecipesByCategory').select().ilike('strCategory', activeCategory)
                const sortedData = mergeSort(data)
                setRecipes(sortedData)
                setLoading(false)

            } catch (error) {
                Alert.alert("Something went wrong")
            }
        }
        getRecipeByCategory()
    }, [activeCategory])
    const onViewableItemsChanged = (items) => {
        ReciesInView.value = items.viewableItems
        setViewAble(ReciesInView.value)
    }
    const viewabilityConfigCallbackPairs = useRef([
        { onViewableItemsChanged },
    ]);

    return (
        <View style={styles.mainView}>
            <View style={styles.headerView}>
                <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Text style={{ ...TypeScale.h4Headline, color: Colors.accentColor, fontWeight: 'bold' }}>Recipe At Door</Text>
                    <Image style={{ width: Sizes.homeScreenMainLogoSize, height: Sizes.homeScreenMainLogoSize, borderRadius: Sizes.homeScreenMainLogoSize }} source={ImageStrings.mainLogo} />
                </View>
                <Text style={[TypeScale.h2Headline, { color: Colors.darkColor }]}>Lets Explore the Recipes of your <Text style={{ color: Colors.accentColor }}>Taste</Text></Text>
                <FlatList
                    data={categories}
                    horizontal={true}
                    ListEmptyComponent={() => {
                        return <ContentLoader
                            speed={1}
                            width={windowWidth - 30}
                            height={windowHeight}
                            backgroundColor="#bdbdbd"
                            foregroundColor="#707070"
                            style={{ width: '100%' }}
                        >
                            <Circle cx="50" cy="50" r="33" />
                            <Circle cx="130" cy="50" r="33" />
                            <Circle cx="210" cy="50" r="33" />
                            <Circle cx="290" cy="50" r="33" />
                        </ContentLoader>
                    }}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        const categoryName = item.strCategory.toLowerCase()
                        const categoryImg = item.strCategoryThumb
                        return <Animated.View entering={FadeInLeft.delay(100 + (index * 100))}>
                            <CategoryCircularCard categoryName={categoryName} categoryImg={categoryImg} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                        </Animated.View>
                    }}
                />
            </View>
            <View style={styles.footerView}>
                {
                    <FlatList
                        ListEmptyComponent={() => {
                            return <ContentLoader
                                speed={1}
                                width={windowWidth - 30}
                                height={windowHeight}
                                backgroundColor="#bdbdbd"
                                foregroundColor="#707070"
                                style={{ width: '100%' }}
                            >
                                <Rect x='10' y='10' rx="18" ry="18" width={(windowWidth / 2) - 30} height="215" />
                                <Rect x={(windowWidth / 2) - 5} y='10' rx="18" ry="18" width={(windowWidth / 2) - 30} height="215" />
                                <Rect x='10' y='240' rx="18" ry="18" width={(windowWidth / 2) - 30} height="215" />
                                <Rect x={(windowWidth / 2) - 5} y='240' rx="18" ry="18" width={(windowWidth / 2) - 30} height="215" />
                            </ContentLoader>
                        }}

                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        data={Recipes}
                        showsVerticalScrollIndicator={false}
                        numColumns={2}
                        viewabilityConfigCallbackPairs={
                            viewabilityConfigCallbackPairs.current
                        }
                        renderItem={({ item, index }) => {
                            const itemName = item.strMeal
                            const itemImg = item.strMealThumb
                            const itemId = item.idMeal
                            return <View style={{ marginTop: 10 }}><RecipeCard RecipesInView={ReciesInView} index={index} itemName={itemName} itemImg={itemImg} itemId={itemId} /></View>
                        }}
                        keyExtractor={(item) => item.idMeal}
                    />
                }
            </View>
        </View >
    )
}


const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        padding: Sizes.screenPadding,
    },
    headerView: {
        flex: 0.35,
        width: '100%',
    },
    footerView: {

        flex: 0.7,
    },
});