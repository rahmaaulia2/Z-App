import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  Input,
  Icon,
  ScrollView,
  Avatar,
  Divider,
  Heading,
  Button,
} from "native-base";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { QUERY_SEARCH_USERNAME } from "./Query";
import { Alert } from "react-native";

export default function Search() {
  const [search, setSearch] = useState("");
  let { error, loading, data } = useQuery(QUERY_SEARCH_USERNAME, {
    variables : {
      username : search
    }
  });
  async function handleSearch() {
    try {
      // let searchYa = useQuery(QUERY_SEARCH_USERNAME);
      console.log(data, "<<<<<<<<<<data search");
      console.log(search);
    } catch (error) {
      Alert.alert(error.message);
      // console.log(error.message, "<<<<<<<<error handleLogin");
    }
  };
  return (
    <Box flex={1} bg="black">
      <Box bg="black" px="4" py="2">
        <HStack justifyContent="space-between" alignItems="center">
          <HStack alignItems="center" space={2}>
            <VStack
              my="4"
              space={5}
              w="100%"
              maxW="300px"
              divider={
                <Box px="2">
                  <Divider />
                </Box>
              }
            >
              <VStack w="100%" space={5} alignSelf="center">
                <Heading fontSize="lg" color={"white"}>
                  Search User
                </Heading>
                <Input
                color={"white"}
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search"
                  placeholderTextColor="gray.500"
                  variant="filled"
                  width="120%"
                  borderRadius="10"
                  py="1"
                  px="2"
                  InputLeftElement={
                    <Icon
                      ml="2"
                      size="4"
                      color="gray.400"
                      as={<Ionicons name="search" size={24} color="black" />}
                    />
                  }
                />
              </VStack>
            </VStack>
          </HStack>
        </HStack>
      </Box>

      <ScrollView>
        {data?.users.map((user, index) => (
          <HStack key={index} alignItems="center" space={3} px="4" py="2">
            <Avatar source={{ uri: "https://picsum.photos/200" }} size="sm" />
            <VStack>
              <Text color="white" fontSize="16" fontWeight="bold">
                {user.name}
              </Text>
              <HStack alignItems="center" space={1}>
                <Text color="gray.500" fontSize="14">
                  {user.username}
                </Text>
                {/* {user.verified && (
                  <Icon
                    as={<FontAwesome name="check-circle" />}
                    size="xs"
                    color="blue.500"
                  />
                )} */}
              </HStack>
            </VStack>
          </HStack>
        ))}
      </ScrollView>
    </Box>
  );
}
