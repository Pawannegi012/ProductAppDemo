import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/screen/Login';
import Home from './src/screen/Home';
import AddProduct from './src/screen/ProductAdd';

const Stack = createStackNavigator();

const App = () => {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkToken();
  }, []);
  const checkToken = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      setToken(!!userToken);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return null;
  }     

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {!token ? (
          <Stack.Screen name="Login">
            {props => <Login {...props} setToken={setToken} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home">
              {props => <Home {...props} setToken={setToken} />}
            </Stack.Screen>

            <Stack.Screen name="AddProduct" component={AddProduct} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
