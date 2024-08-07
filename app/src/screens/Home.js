import { Alert, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { ADD_LIKES, GET_POSTS } from "./Query";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FlatList,
  HStack,
  Image,
  StatusBar,
  Text,
  View,
  VStack,
  Fab,
  Icon
} from "native-base";
import TweetCard from "../components/Card";
import { FontAwesome } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";

export default function Home({ navigation }) {
  const { loading, error, data, refetch } = useQuery(GET_POSTS);
  
  useFocusEffect(
    useCallback(() => {
      refetch();
      // console.log(loading, error, data);
    }, [refetch])
  );
  
  if (loading) {
    return (
      <View>
        <Text color={"white"}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Box bg="black" px="6">
      <HStack alignItems="center" p={1} justifyContent={"space-between"}>
        <Avatar
          source={{ uri: "https://picsum.photos/200/300?random=1"  }}
          size="sm"
        />
        <VStack w={"100%"} p={2} alignItems={"self-end"}>
          {/* <HStack alignItems="center"> */}
          <Image
            source={require("../image/z_logo.png")} // Ganti dengan URL logo Anda
            alt="Logo"
            size="sm"
          />
          {/* </HStack> */}
        </VStack>
      </HStack>
      </Box>
      <Box bg="black" py="2">
        <HStack justifyContent="space-around">
          <Text color="white" fontSize="16" fontWeight="bold">
            Untuk Anda
          </Text>
          <Text color="gray.500" fontSize="16" fontWeight="bold">
            Mengikuti
          </Text>
        </HStack>
      </Box>
      <Divider />
      <FlatList
        data={data?.posts}
        renderItem={({ item }) => <TweetCard el={item} />}
        keyExtractor={(item, idx) => idx}
      />
      <Fab
        position="absolute"
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={<FontAwesome name="plus" />} size="sm" />}
        bg="blue.500"
        onPress={() => navigation.navigate("AddPost")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
