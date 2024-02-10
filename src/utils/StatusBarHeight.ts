import { StatusBar } from "react-native";

const height = StatusBar.currentHeight;

function handleWithStatusBarHeight(height: number | undefined) {
  if (height !== undefined) {
    return StatusBar.currentHeight;
  } else {
    return 64;
  }
}

export const StatusBarHeight = handleWithStatusBarHeight(height);
