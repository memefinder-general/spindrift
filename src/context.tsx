import React, { createContext, useContext, ReactNode } from "react";

export interface SpindriftConfig {
  enabled: boolean;
  className?: string;
}

const SpindriftConfigContext = createContext<SpindriftConfig>({
  enabled: true,
  className: "spindrift",
});
export const useSpindriftConfig = () => useContext(SpindriftConfigContext);

const DepthContext = createContext<number>(0);

export const useBorderDepth = () => useContext(DepthContext);

export interface SpindriftProviderProps extends Partial<SpindriftConfig> {
  children: ReactNode;
}

export const SpindriftProvider = ({
  enabled = process.env.NODE_ENV !== "production",
  className = "spindrift",
  children,
}: SpindriftProviderProps) => (
  <SpindriftConfigContext.Provider value={{ enabled, className }}>
    {/* depth starts at 0 for the whole subtree */}
    <DepthContext.Provider value={0}>{children}</DepthContext.Provider>
  </SpindriftConfigContext.Provider>
);
