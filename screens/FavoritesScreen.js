import React from 'react';
import { View,Text,StyleSheet,FlatList } from 'react-native';
import { useSelector } from 'react-redux';


import MealItem from '../components/MealItem';
import DefaultText from '../components/DefaultText';

//adding values to favorite screen
const FavoritesScreen = props =>{

  
  
    const favMeal = useSelector(state => state.meals.favoriteMeals);
    if(favMeal.length === 0 || !favMeal){
      return (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                 <DefaultText>No favorite meals...start adding some...</DefaultText>
                 </View> );
  }
  const renderMealItem = (itemData) => {
    return(
       
        <MealItem 
          title = {itemData.item.title}
          image = {itemData.item.imageUrl}
          duration = {itemData.item.duration}
          complexity = {itemData.item.complexity}
          affordability = {itemData.item.affordability}
          onSelectMeal = {() =>{
             props.navigation.navigate( 'Meal Receipe' ,
                 {
                    mealId : itemData.item.id,
                }
            );
          }}
        />
    );
};
     return (
     

      <View style = {styles.list}>
          <FlatList 
             data = {favMeal}
             keyExtractor = {(item,index) => item.id}
             renderItem = {renderMealItem}
             style = {{width : '100%'}}
          />
      </View>
    );
    
};
const styles = StyleSheet.create({
  list : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    padding : 15,
  },

});

 

export default FavoritesScreen;