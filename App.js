import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ListPost, DetailPost, DetailUser, DetailPhoto } from './screens';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/rootReducer';

// import Tabs from './navigation/tabs';

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'ListPost'}>
          {/* <Stack.Screen
            name="MainLayout"
            component={Tabs}
            options={{headerShown: false}}
          /> */}
          <Stack.Screen
            name="ListPost"
            component={ListPost}
            options={{ headerShown: false }}
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
            options={({ route }) => ({
              title: route.params.currentUser.username,
            })}
          />
          <Stack.Screen
            name="DetailPhoto"
            component={DetailPhoto}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider >
  );
};

export default App;
