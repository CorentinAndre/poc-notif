import React, { useState, useRef, FunctionComponent } from "react";
import {
  AddNotificationContext,
  CurrentNotificationContext
} from "./NotificationContexts";

export type NotificationType = "success" | "error" | "warning";

export interface Notification {
  message: string;
  type: NotificationType;
  timeout: number;
  remove: () => void;
}

interface UniqueNotification extends Notification {
  id: number;
}

const NotificationProvider: FunctionComponent = ({ children }) => {
  const [displayedNotifications, setDisplayedNotifications] = useState<
    UniqueNotification[]
  >([]);

  const timeoutRefs = useRef(new Map<number, any>());
  const timeouts = timeoutRefs.current;

  const clearTimeoutByKey = (key: number): void => {
    const currentTimeoutId = timeoutRefs.current.get(key);
    if (currentTimeoutId) {
      clearTimeout(currentTimeoutId);
      timeoutRefs.current.delete(key);
    }
  };

  const add = (notificationProps: Notification) => {
    const notificationId = Math.round(Math.random() * 10000);

    const remove = () => {
      setDisplayedNotifications(currentNotifications => {
        clearTimeoutByKey(notificationId);
        return currentNotifications.filter(
          notif => notif.id !== notificationId
        );
      });
    };

    setDisplayedNotifications(prevState => {
      return [
        ...prevState,
        {
          ...notificationProps,
          remove,
          id: notificationId
        }
      ];
    });

    if (notificationProps.timeout) {
      const timeoutRef = setTimeout(remove, notificationProps.timeout);
      timeouts.set(notificationId, timeoutRef);
    }
    return remove;
  };
  console.log(displayedNotifications);
  return (
    <AddNotificationContext.Provider value={add}>
      <CurrentNotificationContext.Provider value={displayedNotifications}>
        {children}
      </CurrentNotificationContext.Provider>
    </AddNotificationContext.Provider>
  );
};

export default NotificationProvider;
