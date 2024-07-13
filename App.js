import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigation";
import useAppInit from "./src/hooks/useAppInit";
import * as SplashScreen from "expo-splash-screen";
import { useCallback } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const { isLoadingComplete } = useAppInit();

  const onLayoutRootView = useCallback(async () => {
    if (isLoadingComplete) {
      await SplashScreen.hideAsync();
    }
  }, [isLoadingComplete]);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StackNavigator />
      </View>
    </NavigationContainer>
  );
}
