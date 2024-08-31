import { StatusBar, Dimensions } from "react-native";

const height = StatusBar.currentHeight;

function handleWithStatusBarHeight(height: number | undefined) {
  if (height !== undefined) {
    return StatusBar.currentHeight;
  } else {
    return 64;
  }
}
export const ScreenWidth = Dimensions.get("window").width;
export const ScreenHeight = Dimensions.get("window").height;
export const StatusBarHeight = handleWithStatusBarHeight(height);
