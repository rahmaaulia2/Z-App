// import { StatusBar, StyleSheet, Text, View } from "react-native";
// import { Button, FlatList } from "native-base";
import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import { AuthContext } from "../../App";

// export default function DM({ navigation }) {
  
//   return (
//     <View style={styles.container}>
//       <StatusBar style="light" />
//       <Text>Screen DM</Text>
      
//       </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import React from "react";
import { SafeAreaView, StyleSheet, Image, ScrollView } from "react-native";
import { Box, Text, Button, HStack, VStack, Divider, View, FlatList } from "native-base";
import { useQuery } from "@apollo/client";
import { GET_USERBYID } from "./Query";
import TweetCard from "../components/Card";

const ProfileDetail = () => {
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);
  async function handleLogout() {
    try {
      await SecureStore.deleteItemAsync("access_token");
      setIsSignedIn(false);
    } catch (error) {
      console.log(error);
    }
  }
  const { loading, error, data, refetch } = useQuery(GET_USERBYID);
  // useFocusEffect(
  //   useCallback(() => {
  //     refetch();
  //     // console.log(loading, error, data);
  //   }, [refetch])
  // );
  console.log(loading, error, data);
  if (loading) {
    return (
      <View>
        <Text color={"white"}>Loading...</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
        <Box style={styles.header}>
          <Image
            source={{ uri: "https://picsum.photos/200/300?random=1" }}
            style={styles.headerImage}
          />
          
          <Image
            source={{ uri: "https://picsum.photos/200/300?random=12" }}
            style={styles.profileImage}
          />
        </Box>

        <Box style={styles.profileDetails}>
          <Text style={styles.username}>{data?.userById?.name}</Text>
          <Text style={styles.userHandle}>{data?.userById?.username}</Text>
          <HStack space={3} style={styles.userInfo}>
            {/* <Text>{data?.userById?.createdAt}</Text> */}
            {/* <Text>{data?.userById?.following}</Text> */}
            {/* <Text>{data?.userById?.followers}</Text> */}
          </HStack>
        </Box>

        <Divider />

        <VStack space={3} style={styles.posts}>
          <FlatList
            data={data?.posts}
            renderItem={({ item }) => <TweetCard el={item} />}
            keyExtractor={(item, idx) => idx}
          />
        </VStack>
      {/* </ScrollView> */}

      <Button
        onPress={() => handleLogout()}
        colorScheme={"dark"}
        style={{ borderRadius: 20 }}
      >
        Logout
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: "relative",
    height: 200,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  searchButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  profileImage: {
    position: "absolute",
    bottom: -50,
    left: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileDetails: {
    marginTop: 60,
    paddingHorizontal: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
  },
  userHandle: {
    color: "gray",
  },
  userInfo: {
    marginTop: 10,
  },
  editProfileButton: {
    marginTop: 10,
  },
  tabs: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  posts: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  postImage: {
    width: "100%",
    height: 150,
    marginTop: 10,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 25,
    backgroundColor: "#1DA1F2",
  },
});

export default ProfileDetail;
