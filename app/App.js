import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./src/screens/Login";
import * as SecureStore from "expo-secure-store";
import { ApolloProvider } from "@apollo/client";
import client from "./config/apollo";
import UserNavigator from "./src/screens/UserNavigator";
import Register from "./src/screens/Register";
import { NativeBaseProvider } from "native-base";
import LandScreen from "./src/screens/LandScreen";
import { createContext, useEffect, useState } from "react";
import AddPost from "./src/screens/AddPost";

const Stack = createNativeStackNavigator();
export const  AuthContext  = createContext(null);

export default function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  async function checkToken() {
    const result = await SecureStore.getItemAsync("access_token");
    if (result) setIsSignedIn(true);
  }
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
        <NavigationContainer>
          <NativeBaseProvider>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {isSignedIn ? (
                <>
                  <Stack.Screen
                    name="UserNavigator"
                    component={UserNavigator}
                  />
                  <Stack.Screen name="AddPost" component={AddPost} />
                </>
              ) : (
                <>
                  <Stack.Screen name="LandScreen" component={LandScreen} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Register" component={Register} />
                </>
              )}
            </Stack.Navigator>
          </NativeBaseProvider>
        </NavigationContainer>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
