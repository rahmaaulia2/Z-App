import React, { useContext, useState } from "react";
import {
  NativeBaseProvider,
  Box,
  Button,
  Center,
  Text,
  VStack,
  Input,
  Link,
  HStack,
  IconButton,
  Icon,
  Image,
} from "native-base";
import { StyleSheet, Alert } from "react-native";
import { AuthContext } from "../../App";
import { MaterialIcons } from "@expo/vector-icons"; // Anda mungkin perlu menginstal @expo/vector-icons
import { useMutation } from "@apollo/client";
import { POST_LOGIN } from "./Query";
import * as SecureStore from "expo-secure-store";

export default function Login({ navigation }) {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [startLogin, { loading }] = useMutation(POST_LOGIN);
  // console.log(loading, "load pertama");
  const handleLogin = async () => {
    try {
      // console.log("masukk handle login");
      console.log(username, password);
      const result = await startLogin({
        variables: {
          login: {
            password: password,
            username: username,
          },
        },
      });

      // console.log(result, "<<<<<<<<result handleLogin");
      await SecureStore.setItemAsync(
        "access_token",
        result.data?.login?.access_token
      );
      setIsSignedIn(true);
      // console.log(loading, "load kedua");
    } catch (error) {
      Alert.alert(error.message);
      // console.log(error.message, "<<<<<<<<error handleLogin");
    }
  };
  return (
    <NativeBaseProvider>
      <Box style={styles.container}>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          px={4}
          py={2}
        >
          <Icon
            mt={8}
            as={MaterialIcons}
            name="close"
            size="lg"
            color="white"
            onPress={() => navigation.navigate("LandScreen")}
          />
        </HStack>
        <Text style={styles.headerText}>
          To get started, enter your @username and password
        </Text>
        <Center flex={1}>
          <Input
            mt={5}
            mx={8}
            placeholder="username"
            placeholderTextColor="gray.500"
            variant="underlined"
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />
          <Input
            mt={5}
            mx={8}
            placeholder="password"
            placeholderTextColor="gray.500"
            variant="underlined"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </Center>
        <Box px={4} pb={6}>
          <Button
            colorScheme="gray"
            onPress={() => {
              handleLogin();
            }}
            style={{borderRadius:20}}
          >
            Next
          </Button>
        </Box>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Background hitam
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // Warna teks putih
    textAlign: "left",
    paddingHorizontal: 16,
    paddingVertical:10,
    marginTop: 20,
    marginLeft: 20
  },
  input: {
    color: "white", // Warna teks input putih
    width: "90%",
  },
});
