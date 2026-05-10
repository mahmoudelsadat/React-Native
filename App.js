import 'react-native-gesture-handler'; 
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import { FavoritesProvider } from './src/context/FavoritesContext';
import HomeScreen from './src/screens/HomeScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Drawer.Navigator 
          screenOptions={{ 
            headerStyle: { backgroundColor: '#121212' }, 
            headerTintColor: '#fff',
            drawerStyle: { backgroundColor: '#1a1a1a', paddingTop: 20 },
            drawerActiveTintColor: '#d9534f', 
            drawerInactiveTintColor: '#fff',  
          }}
        >
          <Drawer.Screen 
            name="Movies" 
            component={HomeScreen} 
            options={({ navigation }) => ({
              drawerIcon: ({ color, size }) => (
                <Ionicons name="film-outline" size={size} color={color} />
              ),
              headerRight: () => (
                <TouchableOpacity 
                  onPress={() => navigation.navigate('Favorites')} 
                  style={{ marginRight: 15 }}
                >
                  <Ionicons name="heart" size={24} color="#d9534f" />
                </TouchableOpacity>
              )
            })}
          />
          <Drawer.Screen 
            name="Favorites" 
            component={FavoritesScreen} 
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="heart-outline" size={size} color={color} />
              )
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}