import React from "react";
import cx from "classnames";
import {
  Notification as NotificationProps,
  NotificationType
} from "../NotificationProvider";
import styles from "./styles.module.css";

const getNotificationStyle = (type: NotificationType) => {
  switch (type) {
    case "success":
      return styles.Success;
    case "warning":
      return styles.Warning;
    case "error":
      return styles.Error;
    default:
      throw new Error("error");
  }
};

const Notification = ({
  message,
  type,
  remove
}: Pick<NotificationProps, "type" | "message" | "remove">) => {
  return (
    <div className={cx(styles.Notification, getNotificationStyle(type))}>
      <div>{message}</div>
      <button
        className={styles.Remove}
        type="button"
        onClick={() => {
          remove();
        }}
      >
        x
      </button>
    </div>
  );
};

export default Notification;
