import { StatusBar } from "expo-status-bar";
import Routes from "./src/routes/index.routes";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import Loading from "./src/components/Loading";

import AppProvider from "./src/hooks";
import { ToastProvider } from "./src/components/Toast";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded) {
    return <Loading />;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ToastProvider position="bottom">
          <AppProvider>
            <Routes />
            <StatusBar
              style="light"
              translucent
              backgroundColor="transparent"
            />
          </AppProvider>
        </ToastProvider>
      </GestureHandlerRootView>
    );
  }
}
