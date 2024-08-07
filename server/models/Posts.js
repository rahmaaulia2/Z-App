const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");

class Posts {
  static collection() {
    return database.collection("posts");
  }
  static async getAllPosts(id) {
    let agg;
    if (id) {
      agg = [
        {
          $match: {
            _id: new ObjectId(id),
          },
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unset: "author.password",
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ];
    } else {
      agg = [
        {
          $lookup: {
            from: "users", 
            localField: "authorId",
            foreignField: "_id",
            as: "author",
          },
        },
        {
          $unwind: {
            path: "$author",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $unset: "author.password",
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ];
    }
    let data = await this.collection().aggregate(agg).toArray();
    // console.log(data);
    return data;
  }
  static async addNewPosts(content, tags, imgUrl, authorId) {
    content.createdAt = content.updatedAt = new Date();
    let data = await this.collection().insertOne(
      content,
      tags,
      imgUrl,
      authorId
    );
    return data;
  }
  static async addComments(data, postId) {
    data.createdAt = data.updatedAt = new Date();
    await this.collection().updateOne(
      {
        _id: new ObjectId(String(postId)),
      },
      {
        $push: {
          comments: data,
        },
      }
    );
    return "Success add comment";
  }
  static async addLikes(data, postId) {
    data.createdAt = data.updatedAt = new Date();
    await this.collection().updateOne(
      {
        _id: new ObjectId(String(postId)),
      },
      {
        $push: {
          likes: data,
        },
      }
    );
    return "Success add comment";
  }
}
module.exports = Posts;
