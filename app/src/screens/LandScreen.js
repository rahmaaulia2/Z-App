import React from "react";
import {
  NativeBaseProvider,
  Box,
  Button,
  Center,
  Text,
  VStack,
  HStack,
  Image,
  Link,
} from "native-base";
import { StyleSheet } from "react-native";

export default function LandScreen({ navigation }) {
  return (
    <NativeBaseProvider>
      <Box style={styles.container}>
        <Center flex={1}>
          <Image
            source={require("../image/z_logo.png")} // Ganti dengan URL logo Anda
            alt="Logo"
            size="lg"
            mb={5}
          />
          <Text style={styles.headerText}>
            See what's happening in the world right now.
          </Text>
          <VStack space={3} mt={5} width="80%">
            <Button
              leftIcon={
                <Image
                  source={{ uri: "https://your-google-icon-url.com/icon.png" }}
                  alt="Google"
                  size="sm"
                />
              }
              style={styles.button}
            >
              Lanjutkan dengan Google
            </Button>
            <Button
              leftIcon={
                <Image
                  source={{ uri: "https://your-apple-icon-url.com/icon.png" }}
                  alt="Apple"
                  size="sm"
                />
              }
              style={styles.button}
            >
              Lanjutkan dengan Apple
            </Button>
            <HStack alignItems="center" justifyContent="center">
              <Box width="45%" height={1} bg="gray.300" />
              <Text mx={2} color={"grey"}>or</Text>
              <Box width="45%" height={1} bg="gray.300" />
            </HStack>
            <Button
              style={styles.createAccountButton}
              onPress={() => navigation.navigate("Register")}
            >
             Create Account
            </Button>
          </VStack>
          <Text style={styles.footerText}>
            By signing up, you agree to our{" "}
            <Link
              _text={{ color: "blue.500" }}
            >
              Terms
            </Link>
            ,{" "}
            <Link
              _text={{ color: "blue.500" }}
            >
              Privacy Policy
            </Link>
            , and{" "}
            <Link
              _text={{ color: "blue.500" }}
            >
              Cookie Use.
            </Link>
            .
          </Text>
          <Text style={styles.signInText}>
            Have an account already?{" "}
            <Link
              onPress={() => navigation.navigate("Login")}
              _text={{ color: "blue.500" }}
            >
              Log in
            </Link>
          </Text>
        </Center>
      </Box>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black", // Background hitam
    padding: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white", // Warna teks putih
    textAlign: "left",
    margin:30,
    marginBottom: 180,
    marginTop: 150
  },
  button: {
    backgroundColor: "white", // Background putih untuk tombol
    justifyContent: "flex-start", // Untuk mengatur ikon di sebelah kiri teks
    _text: {
      color: "black", // Warna teks hitam
    },
    borderRadius: 20,
  },
  createAccountButton: {
    backgroundColor: "grey", // Background abu-abu untuk tombol buat akun
    _text: {
      color: "#000", // Warna teks hitam
    },
    borderRadius: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#fff", // Warna teks putih
    textAlign: "left",
    marginTop: 8,
    marginRight: 30,
    marginLeft : 30
    // margin:38
  },
  signInText: {
    fontSize: 14,
    color: "#fff", // Warna teks putih
    textAlign: "left",
    marginTop: 8,
  },
});
