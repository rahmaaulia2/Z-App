import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query Posts {
    posts {
      _id
      content
      tags
      imgUrl
      author {
        _id
        name
        username
        email
        follower {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        followerDetail {
          _id
          name
          username
        }
        following {
          _id
          followingId
          followerId
          createdAt
          updatedAt
        }
        followingDetail {
          _id
          name
          username
        }
      }
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const POST_LOGIN = gql`
  mutation Login($login: Login) {
    login(login: $login) {
      access_token
    }
  }
`;

export const POST_REGISTER = gql`
  mutation Register($user: NewUser) {
    register(user: $user)
  }
`;

export const QUERY_SEARCH_USERNAME = gql`
  query Search($username: String) {
    users(username: $username) {
      name
      username
      _id
    }
  }
`;

export const POST_ADDPOST = gql`
  mutation addPost($addPosts: AddPosts) {
    addPosts(addPosts: $addPosts) {
      content
      imgUrl
      tags
    }
  }
`;

export const GET_USERBYID = gql`
  query profilDetail($userByIdId: String) {
    userById(id: $userByIdId) {
      _id
      name
      username
      email
      follower {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      followerDetail {
        _id
        name
        username
      }
      following {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
      followingDetail {
        _id
        name
        username
      }
    }
  }
`;

export const ADD_LIKES = gql`
  mutation Likes($postId: ID) {
    addLikes(postId: $postId)
  }
`;
