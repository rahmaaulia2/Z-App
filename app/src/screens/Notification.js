import React from 'react';
import { Box, VStack, HStack, Text, Image, ScrollView, Divider } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

const Notification = () => {
  return (
    <ScrollView>
      <Box bg="black" px="4" py="2">
        <HStack justifyContent="space-between" alignItems="center">
          <Image
            // source={{ uri: 'https://path/to/profile/image' }}
            alt="Profile Image"
            size="xs"
            borderRadius="full"
          />
          <Text color="white" fontSize="20" fontWeight="bold">
            X
          </Text>
          <FontAwesome name="bell" color="white" size={24} />
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

      <VStack space="4" px="4" py="2" bg="black">
        {/* Elon Musk Post */}
        <HStack space="3">
          <Image
            source={{ uri: 'https://path/to/elon/musk/image' }}
            alt="Elon Musk"
            size="xs"
            borderRadius="full"
          />
          <VStack space="1">
            <Text color="white" fontSize="14" fontWeight="bold">
              Elon Musk
            </Text>
            <Text color="gray.500" fontSize="12">
              @elonmusk · 9 jam
            </Text>
            <Text color="white" fontSize="14">
              The Olympics laser show was amazing!
            </Text>
            <Image
              source={{ uri: 'https://path/to/laser/show/image' }}
              alt="Laser Show"
              height="200"
              borderRadius="10"
            />
            <HStack justifyContent="space-between" width="70%">
              <FontAwesome name="comment-o" color="gray" size={16} />
              <FontAwesome name="retweet" color="gray" size={16} />
              <FontAwesome name="heart-o" color="gray" size={16} />
              <FontAwesome name="bar-chart" color="gray" size={16} />
            </HStack>
          </VStack>
        </HStack>

        <Divider />

        {/* Vidio Sports Post */}
        <HStack space="3">
          <Image
            source={{ uri: 'https://path/to/vidio/sports/logo' }}
            alt="Vidio Sports"
            size="xs"
            borderRadius="full"
          />
          <VStack space="1">
            <Text color="white" fontSize="14" fontWeight="bold">
              Vidio Sports
            </Text>
            <Text color="gray.500" fontSize="12">
              @VidioSports · Iklan
            </Text>
            <Text color="white" fontSize="14">
              🥇 Ayo Dukung Olympian Kebanggaan Indonesia di Vidio! 🥇
            </Text>
            <Text color="white" fontSize="14">
              Ayo dukung dan saksikan putra & putri terbaik Indonesia berjuang #BawaPulangMedali di Olympic Games Paris 2024 pada 26 Juli - 11 Agustus 2024 dari mana pun dengan tayangan jernih.
            </Text>
            <Text color="white" fontSize="14" fontWeight="bold">
              Saksikan hanya di Vidio!
            </Text>
            <Image
              source={{ uri: 'https://path/to/vidio/ad/image' }}
              alt="Vidio Ad"
              height="200"
              borderRadius="10"
            />
          </VStack>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default Notification;
