import { createContext, useContext, useEffect, useState } from "react";

interface ScreenSizeContextProps {
  isSmallScreen: boolean;
  isMediumScreen: boolean;
  isSplitColumn: boolean;
}

const ScreenSizeContext = createContext<ScreenSizeContextProps | undefined>(undefined);

const ScreenSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [isSmallScreen, setIsSmallScreen] = useState<boolean>(window.innerWidth < 500);

  const [screenSize, setScreenSize] = useState({
    isSmallScreen: window.innerWidth < 500,
    isMediumScreen: window.innerWidth >= 500 && window.innerWidth <= 1000,
    isSplitColumn: window.innerWidth > 550
  });

  useEffect(() => {
    // const handleResize = () => {
    //   const currentSmallScreen = window.innerWidth < 500;
    //   if (currentSmallScreen !== isSmallScreen) {
    //     setIsSmallScreen(currentSmallScreen)
    //   }
    // };
    const handleResize = () => {
      setScreenSize({
        isSmallScreen: window.innerWidth < 500,
        isMediumScreen: window.innerWidth >= 500 && window.innerWidth < 1000,
        isSplitColumn: window.innerWidth > 550
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // }, [isSmallScreen]);

  const { isSmallScreen, isMediumScreen, isSplitColumn } = screenSize;

  return (
    <ScreenSizeContext.Provider value={{ isSmallScreen, isMediumScreen, isSplitColumn }}>
      {children}
    </ScreenSizeContext.Provider>
  )
}

const useScreenSize = (): ScreenSizeContextProps => {
  const context = useContext(ScreenSizeContext);
  if (context === undefined) {
    throw new Error("useScreeSize must be used within a ScreenSizeProvider");
  }
  return context;
}

export { ScreenSizeProvider, useScreenSize};
