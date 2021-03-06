import React from 'react';
import { View,Text,StyleSheet,FlatList,TouchableOpacity} from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';

//screen to display Meal Categories
const CategoriesScreen = props =>{
    const renderGridItem = (itemData)=>{
       return(
        <CategoryGridTile title = {itemData.item.title} 
        color = {itemData.item.color} 
        onSelect = {() => {
            props.navigation.navigate({name : 'Meals Detail',
            params : {
                categoryId : itemData.item.id
            }
        });
        }}/>
       );
    };
    return (
      <FlatList 
           data = {CATEGORIES}
           keyExtractor = {(item,index) => item.id}
           renderItem = {renderGridItem}
           numColumns={2}
      />
    );
};

 
const styles = StyleSheet.create({
    screen : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
   
});

export default CategoriesScreen;