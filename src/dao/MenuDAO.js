export default class MenuDAO {
  constructor() {
    this.collection = null;
  }

  static async injectDB(conn) {
    if (this.collection) {
      return;
    }
    try {
      this.collection = conn.db(process.env.DINER_IN_THE_SKY_NS).collection("menu");
    } catch (e) {
      `Unable to establish a collection handle in CatalogsDAO: ${e}`
    }
  }

  static async getCatalogs() {
    try {
      return await this.collection.find({}).toArray();
    } catch (e) {
      console.error(`Something went wrong in getCatalogs: ${e}`);
      throw e;
    }
  }
}