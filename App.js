import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold
} from '@expo-google-fonts/inter';

import Loading from './src/pages/Loading';
import ProductInfo from './src/pages/ProductInfo';
import MainTab from './src/pages/MainTab';
import About from  './src/pages/MainTab/About';
import SignUp from './src/pages/SignUp';
import Home from './src/pages/MainTab/Home';
import EditUser from './src/pages/EditUser';
import RecoverPass from './src/pages/RecoverPass';
import ResetPass from './src/pages/ResetPass';


const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    InterLight:Inter_300Light,
    InterRegular:Inter_400Regular,
    InterMedium:Inter_500Medium,
    InterSemiBold:Inter_600SemiBold
  });

if (!fontsLoaded) {
    return <Loading/>
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="MainTab" component={MainTab} />
          <Stack.Screen name="ProductInfo" component={ProductInfo} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="EditUser" component={EditUser} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RecoverPass" component={RecoverPass} />
          <Stack.Screen name="ResetPass" component={ResetPass} />

        </Stack.Navigator>
    </NavigationContainer>
    );
  }
}

