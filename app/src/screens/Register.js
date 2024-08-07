
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
import * as SecureStore from "expo-secure-store";
import { POST_REGISTER } from "./Query";

export default function Register({ navigation }) {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [startRegis, { loading }] = useMutation(POST_REGISTER);
  // console.log(loading, "load pertama");
  const handleRegis = async () => {
    try {
      // console.log("masukk handle login");
      console.log(username, password);
      const result = await startRegis({
        variables: {
          user: {
            name: name,
            username: username,
            email: email,
            password: password,
          },
        },
      });
      setName("")
      setUsername("")
      setEmail("")
      setPassword("")
      setIsSignedIn(false)
      Alert.alert("Success Register")
    } catch (error) {
      Alert.alert(error.message);
      // console.log(error.message, error, "<<<<<<<<error handleRegis");
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
        <Text style={styles.headerText}>Create your account</Text>
        <Center flex={1}>
          <Input
            mt={5}
            mx={8}
            placeholder="name"
            placeholderTextColor="gray.500"
            variant="underlined"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
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
            placeholder="email"
            placeholderTextColor="gray.500"
            variant="underlined"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
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
              handleRegis();
            }}
            style={{ borderRadius: 20 }}
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
    paddingVertical: 10,
    marginTop: 20,
    marginLeft: 20,
  },
  input: {
    color: "white", // Warna teks input putih
    width: "90%",
  },
});
