import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';
import AddStudentScreen from './src/AddStudentScreen';
import UpdateStudent from './src/UpdateStudent';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{title:'Students'}} />
        <Stack.Screen name="AddStudentScreen" component={AddStudentScreen} options={{title:'Add Student'}} />
        <Stack.Screen name="UpdateStudent" component={UpdateStudent} options={{title:'Update Student'}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App