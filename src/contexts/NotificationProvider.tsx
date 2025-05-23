import React, { createContext, useContext, useState, useCallback } from 'react';

type Notification = {
  id: number;
  message: string;
};

type NotificationContextType = {
  notify: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

let idCounter = 0;

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const remove = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const notify = useCallback((message: string) => {
    const id = idCounter++;
    setNotifications((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      remove(id);
    }, 3000); // Auto dismiss in 3s
  }, []);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {notifications.map(({ id, message }) => (
          <div
            key={id}
            className="bg-active/20 text-active px-4 py-2 rounded shadow-lg flex items-center justify-between min-w-[200px] border border-active"
          >
            <span>{message}</span>
            <button
              onClick={() => remove(id)}
              className="ml-4 text-navy/50 hover:text-navy/100"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotify = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error('useNotify must be used within a NotificationProvider');
  return ctx.notify;
};
