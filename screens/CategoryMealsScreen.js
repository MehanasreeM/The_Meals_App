import React from 'react';
import { View,Text,StyleSheet ,FlatList} from 'react-native';
import { useSelector } from 'react-redux';

import MealList from '../components/MealList';
const CategoryMealsScreen = props =>{
    const catId = props.route.params.categoryId;
  
    const availableMeals = useSelector(state => state.meals.filteredMeals);

    const displayedMeals = availableMeals.filter (meal => meal.categoryIds.indexOf(catId) >=0);

    if(displayedMeals.length==0){
      return(
         <View style={styles.content}>
           <Text>No more meals...Just check Filters...</Text>
         </View>
      );
    };
    
    return (
      <MealList 
        listData = {displayedMeals}
        navigation = {props.navigation}
      />
      
    );
};

const styles = StyleSheet.create({
  content:{
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  }
});
 


export default CategoryMealsScreen;