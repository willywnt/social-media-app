import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Home, DetailPost, DetailUser} from './screens';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/rootReducer';

import Tabs from './navigation/tabs';

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Home'}>
          {/* <Stack.Screen
            name="MainLayout"
            component={Tabs}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="DetailPost"
            component={DetailPost}
            options={() => ({
              title: 'Comments',
            })}
          />
          <Stack.Screen
            name="DetailUser"
            component={DetailUser}
            options={({route}) => ({
              title: route.params.currentUser.username,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
