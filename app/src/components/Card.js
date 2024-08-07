import React, { useState } from "react";
import {
  Box,
  Text,
  HStack,
  VStack,
  IconButton,
  Icon,
  Avatar,
  Image,
} from "native-base";
import { FontAwesome } from "@expo/vector-icons";

const TweetCard = ({ el, initialLikes = 0, initialComments = 0 }) => {
//   console.log(el, "<<<<<<<<<<<<<<<<<<<<<");
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  

  const toggleLike = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  const handleComment = () => {
    console.log("Comment button pressed");
  };

  return (
    <Box
      bg="black"
      p={2}
      //   flex={"revert-layer"}
      //   mb={4}
      //   mx={4}
      //   rounded="lg"
      borderColor="coolGray.200"
      justifyContent={"center"}
      borderWidth={1}
    >
      <HStack alignItems="center" mb={2} p={1}>
        <Avatar
          source={{ uri: "https://picsum.photos/200/300?random=" + el._id }}
          size="sm"
        />
        <VStack w={"100%"} p={2}>
          <HStack alignItems="center">
            <Text fontWeight="bold" color={"white"}>{el.author?.name}</Text>
            <Text color="coolGray.500" ml={1}>
              {el.author?.username} · {el.createdAt}
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <Text mb={4} ml={19} color={"white"}>{el.content}</Text>

      <Box
        mb={4}
        ml={45}
        bg="coolGray.100"
        rounded="lg"
        overflow="hidden"
        width="79%"
        height={200}
        //   justifyItems={"center"}
      >
        <Image
          source={{ uri: "https://picsum.photos/200/300?random=" + el._id }}
          alt="tweet image"
          width="100%"
          height="100%"
          resizeMode="cover"
          // onError={(e) => console.log(e.nativeEvent.error)}
        />
      </Box>

      <HStack alignItems="center" ml={140}>
        <IconButton
          icon={
            <Icon
              as={FontAwesome}
              name={liked ? "heart" : "heart-o"}
              color={liked ? "red.500" : "coolGray.500"}
            />
          }
          onPress={toggleLike}
        />
        <Text ml={1} color={liked ? "red.500" : "coolGray.500"}>
          {likes}
        </Text>
        <IconButton
          icon={<Icon as={FontAwesome} name="comment-o" color="coolGray.500" />}
          onPress={handleComment}
          ml={4}
        />
        <Text ml={1} color="coolGray.500">
          {comments}
        </Text>
      </HStack>
    </Box>
  );
};

export default TweetCard;
