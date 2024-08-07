const { ObjectId } = require("mongodb");
const database = require("../config/mongodb");

class Follow {
  static collection() {
    return database.collection("follows");
  }
  static async getAllFollowing() {
    return await this.collection().find().toArray();
  }
  static async addFollow(followingId, id) {
    await this.collection().insertOne({
      folowerId: new ObjectId(String(id)),
      followingId: new ObjectId(String(followingId)),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}

module.exports = Follow;
