import React, { createContext, useContext, useState, ReactNode } from "react";

// Configuration context for global settings
export interface SpindriftConfig {
  enabled: boolean;
  className?: string;
}

const SpindriftConfigContext = createContext<SpindriftConfig>({
  enabled: true,
  className: "spindrift",
});

export const useSpindriftConfig = () => useContext(SpindriftConfigContext);

// Border depth context for tracking nested from/to states
interface BorderDepthContextValue {
  depth: number;
  push: () => void;
  pop: () => void;
}

const BorderDepthContext = createContext<BorderDepthContextValue>({
  depth: 0,
  push: () => {},
  pop: () => {},
});

export const useBorderDepth = () => useContext(BorderDepthContext);

// Provider component for border depth tracking
export const BorderDepthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [depth, setDepth] = useState(0);

  const push = () => setDepth((prev) => prev + 1);
  const pop = () => setDepth((prev) => Math.max(0, prev - 1));

  return (
    <BorderDepthContext.Provider value={{ depth, push, pop }}>
      {children}
    </BorderDepthContext.Provider>
  );
};

// Main provider component
export interface SpindriftProviderProps {
  enabled?: boolean;
  className?: string;
  children: ReactNode;
}

export const SpindriftProvider: React.FC<SpindriftProviderProps> = ({
  enabled = process.env.NODE_ENV !== "production",
  className = "spindrift",
  children,
}) => {
  return (
    <SpindriftConfigContext.Provider value={{ enabled, className }}>
      <BorderDepthProvider>{children}</BorderDepthProvider>
    </SpindriftConfigContext.Provider>
  );
};
