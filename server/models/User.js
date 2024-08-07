const database = require("../config/mongodb");
const bcrypt = require("bcryptjs");
const validateEmail = require("../helpers/validateEmail");
const { ObjectId } = require("mongodb");

class User {
  static collection() {
    return database.collection("users");
  }
  static async getAllUser() {
    let data = await this.collection().find().toArray();
    return data;
  }
  static async createUser(newUser) {
    if (!newUser.username) {
      throw new Error("username is required");
    }
    if (!newUser.email) {
      throw new Error("email is required");
    }
    if (!newUser.password) {
      throw new Error("password is required");
    }
    if (newUser.password.length < 5) {
      throw new Error("Password must be more than 5 characters");
    }
    newUser.password = bcrypt.hashSync(
      newUser.password,
      bcrypt.genSaltSync(10)
    );
    newUser.createdAt = newUser.updatedAt = new Date();
    const dataByEmail = await this.getByEmail(newUser);
    if (dataByEmail) {
      throw new Error("Email must be unique");
    }
    const dataByUsername = await this.getByUsername(newUser);
    if (dataByUsername) {
      throw new Error("Username must be unique");
    }
    if (!validateEmail(newUser.email)) {
      throw new Error("Email must be Email format");
    }
    let data = await this.collection().insertOne(newUser);
    return data;
  }
  static async getByEmail(newUser) {
    let data = await this.collection().findOne({ email: newUser.email });
    return data;
  }
  static async getByUsername(newUser) {
    let data = await this.collection().findOne({ username: newUser.username });
    return data;
  }
  static async search(name, username) {
    let dataUser;
    if (name) {
      // console.log(name, "<<name model");
      dataUser = await this.collection().find({ name: name }).toArray();
    } else if (username) {
      // console.log(username, "<<< username model");
      dataUser = await this.collection().find({ username: username }).toArray();
    }
    // console.log(dataUser, "<<<<<<<<<<<<<<<<<< data userr");
    return dataUser;
  }
  static async getUserById(id) {
    // console.log(id);
    const agg = [
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followerId",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "follows",
          localField: "_id",
          foreignField: "followingId",
          as: "follower",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "follower.followerId",
          foreignField: "_id",
          as: "followerDetail",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "following.followingId",
          foreignField: "_id",
          as: "followingDetail",
        },
      }
    ];
    let data = await this.collection().aggregate(agg).toArray();
    return data[0];
  }
}

module.exports = User;
