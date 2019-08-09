import React, { useContext } from "react";
import { CurrentNotificationContext } from "../NotificationContexts";
import { Notification as NotificationProps } from "../NotificationProvider";
import Notification from "../Notification";
import styles from "./styles.module.css";

const NotificationCenter = () => {
  const notifications = useContext(CurrentNotificationContext);
  return (
    <div className={styles.Container}>
      {notifications.map(
        (
          notification: Pick<NotificationProps, "type" | "message" | "remove">
        ) => (
          <Notification {...notification} />
        )
      )}
    </div>
  );
};

export default NotificationCenter;
