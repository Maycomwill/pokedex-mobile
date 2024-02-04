import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import Routes from "./src/routes/index.routes";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";
import Loading from "./src/components/Loading";
import { StatusBarHeight } from "./src/utils/StatusBarHeight";
import AppProvider from "./src/hooks";

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
      <SafeAreaView className="flex-1">
        <AppProvider>
          <Routes />
          <StatusBar style="light" translucent backgroundColor="transparent" />
        </AppProvider>
      </SafeAreaView>
    );
  }
}
