"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type OverlayActivityContextValue = {
  hasActiveOverlay: boolean;
  registerOverlay: () => () => void;
};

const OverlayActivityContext = createContext<OverlayActivityContextValue | null>(
  null
);

export const OverlayActivityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeOverlayCount, setActiveOverlayCount] = useState(0);

  const registerOverlay = useCallback(() => {
    setActiveOverlayCount((current) => current + 1);

    return () => {
      setActiveOverlayCount((current) => Math.max(0, current - 1));
    };
  }, []);

  const value = useMemo(
    () => ({
      hasActiveOverlay: activeOverlayCount > 0,
      registerOverlay,
    }),
    [activeOverlayCount, registerOverlay]
  );

  return (
    <OverlayActivityContext.Provider value={value}>
      {children}
    </OverlayActivityContext.Provider>
  );
};

export const useOverlayActivity = () => {
  const context = useContext(OverlayActivityContext);

  if (!context) {
    throw new Error(
      "useOverlayActivity must be used within an OverlayActivityProvider"
    );
  }

  return context;
};
