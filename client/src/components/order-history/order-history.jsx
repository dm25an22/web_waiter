import React, { Fragment } from "react";
import { getTime } from "../../utils/date-helper";
import OrderSpreadsheet from "../order-spreadsheet/order-spreadsheet";
import style from "./order-history.module.css";

export default function OrderHistory({ historyOrder }) {
  return (
    <Fragment>
      {historyOrder.map((it, index) => {
        const {timeOrder, order, price} = it;
        return (
          <div key={timeOrder + index} className={style.orderContainer}>
            <header className={style.orderHeader}>
              <div className={style.orderTitle}>Order №{index + 1}</div>
              <div className={style.timeOrder}>{getTime(timeOrder)}</div>
            </header>
            <OrderSpreadsheet orderList={order} />
            <footer className={style.orderFooter}>
              <div className={style.orderAmountTitle}>Order price</div>
              <div className={style.orderAmount}>${price.toFixed(2)}</div>
            </footer>
          </div>
        );
      })}
    </Fragment>
  );
};

