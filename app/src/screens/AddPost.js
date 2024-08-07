import { useMutation } from "@apollo/client";
import { Box, Button, Center, HStack, Icon, Input, NativeBaseProvider, Text } from "native-base";
import { useState } from "react";
import { POST_ADDPOST, POST_REGISTER } from "./Query";
import { Alert, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function AddPost({navigation}) {
  const [doAdd, { loading }] = useMutation(POST_ADDPOST);
  const [content, setContent] = useState("")
  const [imgUrl, setImgUrl] = useState("")
  const [tags, setTags] = useState([])
  const handleAddPost = async () => {
    try {
        let splitTags = setTags(tags.split(","))
      // console.log("masukk handle login");
      console.log(content, imgUrl, tags);
      const result = await doAdd({
        variables: {
          addPosts: {
            content: content,
            imgUrl: imgUrl,
            tags: [tags],
          },
        },
      });
      console.log(result);
      if(result) Alert.alert("success add post");
      navigation.navigate("Home")
    } catch (error) {
      Alert.alert(error.message);
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
            onPress={() => navigation.navigate("Home")}
          />
        </HStack>
        <Text style={styles.headerText}>What's happening?</Text>
        <Center flex={1}>
          <Input
            mt={5}
            mx={8}
            placeholder="Enter content"
            placeholderTextColor="gray.500"
            variant="underlined"
            style={styles.input}
            value={content}
            onChangeText={setContent}
          />
          <Input
            mt={5}
            mx={8}
            placeholder="Enter imgUrl"
            placeholderTextColor="gray.500"
            variant="underlined"
            style={styles.input}
            value={imgUrl}
            onChangeText={setImgUrl}
          />
          <Input
            mt={5}
            mx={8}
            placeholder="Enter tags, separated by commas"
            placeholderTextColor="gray.500"
            variant="underlined"
            style={styles.input}
            value={tags}
            onChangeText={setTags}
          />
        </Center>
        <Box px={4} pb={6}>
          <Button
            colorScheme="gray"
            onPress={() => {
              handleAddPost();
            }}
            style={{ borderRadius: 20 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </NativeBaseProvider>
  )
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