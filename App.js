import React from 'react';
import { LogBox } from 'react-native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { NavigationContainer } from '@react-navigation/native';
import { ListPost, DetailPost, DetailUser, DetailPhoto } from './screens';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/rootReducer';

const Stack = createSharedElementStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'ListPost'}
          detachInactiveScreens={false}
        >
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
              headerStyle: {
                borderBottomWidth: .5,
                borderBottomColor: "#D5D4D4",
                height: 60
              },
            })}
          />
          <Stack.Screen
            name="DetailUser"
            component={DetailUser}
            options={({ route }) => ({
              title: route.params.currentUser.username,
              headerStyle: {
                borderBottomWidth: .5,
                borderBottomColor: "#D5D4D4",
                height: 60
              },
              headerTintColor: '#1C335E',
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
