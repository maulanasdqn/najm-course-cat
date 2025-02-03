import React from "react";

export interface FullscreenProvider {
  isFullscreen?: boolean;
  setIsFullscreen?: (isFullscreen: boolean) => void;
}

export const FullscreenContext = React.createContext<FullscreenProvider>({});

export const useFullscreen = () => React.useContext(FullscreenContext);

export const FullscreenProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const handleFullscreenChange = (value: boolean) => {
    setIsFullscreen(value);
  };

  return (
    <FullscreenContext.Provider
      value={{
        isFullscreen,
        setIsFullscreen: handleFullscreenChange,
      }}
    >
      {children}
    </FullscreenContext.Provider>
  );
};
