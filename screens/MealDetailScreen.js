import React from 'react';
import { View,Text,StyleSheet,Button,ScrollView ,Image} from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';

import DefaultText from '../components/DefaultText';
import CustomHeaderButton from '../components/HeaderButton';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = props =>{
  return(
      <View style = {styles.listItem}>
         <DefaultText>{props.children}</DefaultText>        
      </View>
  );
};


const MealDetailScreen = props =>{
    const mealId = props.route.params.mealId;
    const availableMeals = useSelector(state => state.meals.meals);
    const currentMealIsFavorite = useSelector(state => state.meals.favoriteMeals.some(meal=>meal.id===mealId))
    const dispatch = useDispatch();
    const toggleFavoriteHandler =  () => {
       // console.log(mealId);
        dispatch(toggleFavorite(mealId));//passing values to reducers
    };

    //default navigation options
    props.navigation.setOptions({
        headerRight : () =>(
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item  title = 'Favorite' iconName = {currentMealIsFavorite ? 'ios-star' : 'ios-star-outline'} onPress={toggleFavoriteHandler}/>
            </HeaderButtons>
         )
    });
    const seletedMeal = availableMeals.find(meal => meal.id === mealId);
    return (
    <ScrollView>
      <Image source = {{uri : seletedMeal.imageUrl}} style={styles.image}/>
      <View style={styles.detail}>
               <DefaultText>{seletedMeal.duration}m</DefaultText>
               <DefaultText>{seletedMeal.complexity.toUpperCase()}</DefaultText>
               <DefaultText>{seletedMeal.affordability.toUpperCase()}</DefaultText>
     </View>
     <Text style = {styles.title}>Ingredients</Text>
     {seletedMeal.ingredients.map(ingredients =>
         <ListItem key = {ingredients}>{ingredients}</ListItem>
        )}
     <Text style = {styles.title}>Steps</Text>
     {seletedMeal.steps.map(steps =>
         <ListItem key = {steps}>{steps}</ListItem>
        )}
    </ScrollView>
    );
};
 
const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : 200,
    },
    detail : {
        flexDirection : 'row',
        padding : 15,
        justifyContent : 'space-around',
    },
    title : {
        fontFamily : 'open-sans-bold',
        fontSize : 22,
        textAlign : 'center',
    },
    listItem : {
        marginHorizontal : 20,
        marginVertical : 10,
        borderColor : '#ccc',
        borderWidth : 1,
        padding : 10,
    },
});

export default MealDetailScreen;