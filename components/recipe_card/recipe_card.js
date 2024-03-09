import { Text, Image, TouchableOpacity } from 'react-native'
import React, { memo } from 'react'
import { Sizes } from '../../constants/sizes'
import { useNavigation } from '@react-navigation/native'
import { Dimensions } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
function RecipeCard({ itemName, itemImg, itemId, RecipesInView }) {


  const aStyle = useAnimatedStyle(() => {
    let isVisible = Boolean(RecipesInView.value.find(viewable => {

      return viewable.item.idMeal == itemId
    }))
    return {
      opacity: isVisible ? 1 : 0,
      transform: [{
        scale: withTiming(isVisible ? 1 : 0.8)
      }]
    }
  })


  const navigation = useNavigation()
  const windowWidth = Dimensions.get('window').width;

  return <>
    <Animated.View style={[{
      flex: 1, width: windowWidth / 2 - 20, shadowColor: "#000", height: 200, backgroundColor: 'white',
      borderRadius: 20,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
    }, aStyle]}>

      <Image borderTopRightRadius={20} borderTopLeftRadius={20} fadeDuration={200} resizeMode='cover' source={{ uri: itemImg }} style={{ width: '100%', height: '80%' }} />
      <TouchableOpacity onPress={() => navigation.navigate("RecipeDetailScreen", { itemId })} >
        <Text style={{ color: "black", opacity: 0.6, fontSize: Sizes.caption, textAlign: 'center', marginTop: 10 }}>{itemName.slice(0, 20) + '...'}</Text>
      </TouchableOpacity>
    </Animated.View >

  </>
}
export default memo(RecipeCard)
