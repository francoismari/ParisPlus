import { useEffect, useState } from "react";
import * as Font from "expo-font";

const useAppInit = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Elegante-Classica": require("../../assets/fonts/Elegante-Classica.ttf"),
      });
      setLoadingComplete(true);
    };

    loadFonts();
  }, []);

  return { isLoadingComplete };
};

export default useAppInit;
