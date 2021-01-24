import { ObjectId } from "../../index.js";
import CountersDAO from "./countersDAO.js";

export default class OrdersDAO {
  static async injectDB(conn) {
    if (this.collection) {
      return;
    }
    try {
      this.collection = await conn.db(process.env.DINNER_IN_THE_SKY_NS).collection("orders");
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in OrdersDAO: ${e}`,
      );
    }
  }

  static async addActiveOrder(orderId, waiterId, tableNumber, guestsCount) {
    try {
      return await this.collection.insertOne({
        _id: orderId,
        table_number: tableNumber, 
        guests_count: guestsCount, 
        waiter_id: ObjectId(waiterId),
        date_start: new Date(),
        date_close: null,
        order_list: [],
        history_order: []
      })
    } catch (error) {
      console.error(`Something went wrong in addActiveOrder: ${e}`);
      throw e;
    }
  }

  static async getActiveOrdersByUserId(id) {
    try {
      const cursor = await this.collection.find({ waiter_id: ObjectId(id), date_close: {"$eq": null} }, { projected: { waiter_id: 0 } });
      return await cursor.toArray();
    } catch (error) {
      console.error(`Something went wrong in getOrdersByUserId: ${e}`);
      throw e;
    }
  }

  static async getOrderById(id) {
    try {
      return await this.collection.findOne({_id: id});
    } catch (error) {
      console.error(`Something went wrong in getOrderById: ${e}`);
      throw e;
    }
  }

  static async updateOrderById(id, orderList, historyOrder) {
    try {
      return await this.collection.updateOne({ _id: id}, {"$set": {"order_list": orderList, "history_order": historyOrder} })
    } catch (error) {
      console.error(`Unable to update order: ${e}`)
      return { error: e }
    }
  }
}