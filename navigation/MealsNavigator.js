import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';
import { Platform , StyleSheet,Text} from 'react-native';
import { CATEGORIES , MEALS} from '../data/dummy-data';
import CustomHeaderButton from '../components/HeaderButton';

const Stack = createStackNavigator();

const StackNavigator = () => (
    <Stack.Navigator
       screenOptions = {{
        headerStyle : {
            backgroundColor : Platform.OS==='android'? Colors.primaryColor : '',
          },
        headerTitleStyle : {
            fontFamily : 'open-sans-bold',
        },
        headerTintColor : Platform.OS==='android'? 'white' : Colors.accentColor,
       }}
    >
        
        <Stack.Screen name="Meal Categories" component={CategoriesScreen}
          options = {({navigation})=>{
            return {
              title : 'Meals Categories',
              headerLeft : () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item title = "Menu" iconName = 'ios-menu' onPress={() =>{
                    navigation.toggleDrawer();
                  }} />
                </HeaderButtons>
              )
            };
           }
          }
        
        />
        <Stack.Screen name="Meals Detail" component={CategoryMealsScreen} 
          options = {({route}) =>{
            const catId = route.params.categoryId;
            const selectedId = CATEGORIES.find(cat => cat.id === catId);
             return {
                 title : selectedId.title,
             };

          }}
        
        />
        <Stack.Screen name="Meal Receipe" component={MealDetailScreen}
          options = {({route})=>{
            const mealId = route.params.mealId;
            const seletedMeal = MEALS.find(meal => meal.id === mealId);
            return {
                title : seletedMeal.title,
                
            };
          }}
        />
    </Stack.Navigator>
);

const FavStack = createStackNavigator();
const FavNavigator = ()=>(
  <FavStack.Navigator
  screenOptions = {{
    headerStyle : {
        backgroundColor : Platform.OS==='android'? Colors.primaryColor : '',
      },
    headerTitleStyle : {
        fontFamily : 'open-sans-bold',
    },
    headerTintColor : Platform.OS==='android'? 'white' : Colors.accentColor,
   }}
  >
    <FavStack.Screen name="Favorites" component={FavoritesScreen} 
      options = {({navigation}) => {
        return {
        title : "Your Favorites",
        headerLeft : () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title = "Menu" iconName = 'ios-menu' onPress={() =>{
              navigation.toggleDrawer();
            }} />
          </HeaderButtons>
        )
          };
      }}
    />
  </FavStack.Navigator>
);


const Tab = createBottomTabNavigator();
const Mtab = createMaterialBottomTabNavigator();
const TabNavigator =Platform.OS==='android' ? () =>(
  <Mtab.Navigator 
    activeColor = 'white'
    shifting = {true}
  >
    <Mtab.Screen name="Meals" component={StackNavigator} 
       options = {{
         tabBarIcon : (tabInfo) => {
           return (
             <Ionicons name='ios-restaurant' size ={25} color = {tabInfo.color}  />
           );
         },
         tabBarColor : Colors.primaryColor,
         tabBarLabel : <Text style = {{fontFamily:'open-sans-bold'}}>Meals</Text>
       }}
    />
    <Mtab.Screen name="Favorites" component={FavNavigator}
        options = {{
          tabBarIcon : (tabInfo) => {
            return (
              <Ionicons name='ios-star' size ={25} color = {tabInfo.color}  />
            );
          },
          tabBarColor : Colors.accentColor,
          tabBarLabel : <Text style = {{fontFamily:'open-sans-bold'}}>Favorites</Text>
        }}
    />
  </Mtab.Navigator>
)
:() =>(
  <Tab.Navigator 
    tabBarOptions = {{
       activeTintColor : Colors.accentColor,
    }}
  >
    <Tab.Screen name="Meals" component={StackNavigator} 
       options = {{
         tabBarIcon : (tabInfo) => {
           return (
             <Ionicons name='ios-restaurant' size ={25} color = {tabInfo.color}  />
           );
         }
       }}
    />
    <Tab.Screen name="Favorites" component={FavNavigator} 
        options = {{
          tabBarIcon : (tabInfo) => {
            return (
              <Ionicons name='ios-star' size ={25} color = {tabInfo.color}  />
            );
          }
        }}
    />
  </Tab.Navigator>
);
const FilterStack = createStackNavigator();
const FilterNavigator = () => (
  <FilterStack.Navigator
  screenOptions = {{
    headerStyle : {
        backgroundColor : Platform.OS==='android'? Colors.primaryColor : '',
      },
    headerTitleStyle : {
        fontFamily : 'open-sans-bold',
    },
    headerTintColor : Platform.OS==='android'? 'white' : Colors.accentColor,
   }}
  >
    <FilterStack.Screen name="Filters" component={FiltersScreen} 
     options = {({navigation})=>{
       return{
        title : 'Filter Meals',
        headerLeft : () => (
          <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title = "Menu" iconName = 'ios-menu' onPress={() =>{
              navigation.toggleDrawer();
            }} />
          </HeaderButtons>
        ),
       
       };
     }}
    />
  </FilterStack.Navigator>
);

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContentOptions = {{
      activeTintColor : Colors.accentColor,
      labelStyle : {
        fontFamily : 'open-sans-bold',
      }
    }}
  >
    <Drawer.Screen name ="Meals" component={TabNavigator}
      options = {{
        drawerLabel : 'Meals',
      }}
    />
    <Drawer.Screen name ="Filters" component={FilterNavigator}
      options = {{
        drawerLabel : 'Filters',
      }}
    />
  </Drawer.Navigator>
);

const MealsNavigator = () => (
    <NavigationContainer>
        <DrawerNavigator/>
    </NavigationContainer>

);

export default MealsNavigator;
