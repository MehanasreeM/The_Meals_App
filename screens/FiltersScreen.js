import React,{useState,useEffect,useCallback} from 'react';
import { View,Text,StyleSheet , Switch} from 'react-native';
import { HeaderButtons,Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';


import Colors from '../constants/Colors';
import CustomHeaderButton from '../components/HeaderButton';
import { LogBox } from 'react-native';
import {setFilters} from '../store/actions/meals'

LogBox.ignoreLogs([
    'Cannot update a component from inside the function body of a different component',
]);



const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
                <Text>{props.label}</Text>
                <Switch 
                trackColor={{true: Colors.primaryColor}} 
                thumbColor={Colors.primaryColor}
                value={props.state} 
                onValueChange={props.onChange}/>
        </View>
    );  
};


const FiltersScreen = props =>{
    props.navigation.setOptions ({
        headerRight : () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item title = "Save" iconName = 'ios-save' onPress={
                SaveFilters
              } />
            </HeaderButtons>
          )
    });

    const dispatch = useDispatch();
   
    const {navigation} = props;

    const [isGlutenFree,setIsGlutenFree] = useState(false);
    const [isLactoseFree,setIsLactoseFree] = useState(false);
    const [isVegan,setIsVegan] = useState(false);
    const [isVegetarian,setIsVegetarian] = useState(false);

    const SaveFilters =  () => {
        const appliedFilters = {
            glutenFree : isGlutenFree,
            lactoseFree : isLactoseFree,
            vegan : isVegan,
            vegetarian : isVegetarian,
        };
        dispatch(setFilters(appliedFilters));
    };

  /* useEffect(() =>{
       props.navigation.setParams({
           save : SaveFilters,
       });
    },[SaveFilters]
    );
*/
    return (
        <View style={styles.screen}>
        <Text style={styles.title}>Available Filters</Text>
        <FilterSwitch label='Gluten-free' state={isGlutenFree} onChange={(newValue) => setIsGlutenFree(newValue)}/> 
        <FilterSwitch label='Lactose-free' state={isLactoseFree} onChange={(newValue) => setIsLactoseFree(newValue)}/> 
        <FilterSwitch label='Vegan' state={isVegan} onChange={(newValue) => setIsVegan(newValue)}/> 
        <FilterSwitch label='Vegetarian' state={isVegetarian} onChange={(newValue) => setIsVegetarian(newValue)}/> 
       </View>
    );
};
 
const styles = StyleSheet.create({
    screen : {
        flex : 1,
        alignItems : 'center',
    },
    title : {
        fontFamily : 'open-sans-bold',
        fontSize : 22,
        margin : 20,
        textAlign : 'center',
    },
    filterContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        width : '80%',
        marginVertical : 15,
    },
});

export default FiltersScreen;