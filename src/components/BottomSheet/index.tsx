import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  SlideInDown,
  SlideOutDown,
} from "react-native-reanimated";
import Text from "../Text";
import { useFavorites } from "../../hooks/useFavorites";

interface BottomSheetProps {
  onClose: () => void;
}
const BottomSheet = ({ onClose }: BottomSheetProps) => {
  const SHEET_HEIGHT = 224;
  const DIMENSION = Dimensions.get("window");
  const SHEET_OVER_DRAG = 20;
  const offset = useSharedValue(0);
  const isClosed = useSharedValue(false);
  const { clearFavorites } = useFavorites();

  const closeSheet = () => {
    isClosed.value = true; // Atualiza o estado como fechado
    runOnJS(onClose)?.(); // Garante que onClose seja chamado no lado JS
  };

  const clear = () => {
    clearFavorites();
    closeSheet();
  };

  const pan = Gesture.Pan()
    .onChange((e) => {
      const offsetDelta = e.translationY + offset.value;
      const clamp = Math.max(-SHEET_OVER_DRAG, offsetDelta);
      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < SHEET_HEIGHT / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withTiming(SHEET_HEIGHT, {}, () => {
          runOnJS(closeSheet)();
        });
      }
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  useEffect(() => {
    if (isClosed.value) {
      console.log("Sheet closed");
      onClose?.();
    }
  }, [isClosed.value]);

  const styles = StyleSheet.create({
    container: {
      height: SHEET_HEIGHT,
      width: DIMENSION.width,
      position: "absolute",
      bottom: -SHEET_OVER_DRAG * 1.3,
    },
  });

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        entering={SlideInDown.springify().damping(15)}
        exiting={SlideOutDown}
        className="w-full items-center bg-gray-700"
        style={[styles.container, translateY]}
      >
        <MaterialCommunityIcons
          name="drag-horizontal"
          size={24}
          color={"white"}
        />
        <Text size="LG" weight="SEMIBOLD" color="WHITE">
          Limpar favoritos
        </Text>
        <View className="w-full space-y-4 pt-2">
          <Text align="CENTER" color="WHITE">
            Você deseja limpar a sua lista de favoritos?
          </Text>
          <View className="flex-row w-full space-x-4 items-center justify-center">
            <TouchableOpacity
              onPress={clear}
              activeOpacity={0.7}
              className="bg-emerald-400 p-2 px-4 rounded-lg"
            >
              <Text color="WHITE" weight="SEMIBOLD">
                Confirmar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={closeSheet}
              className="bg-gray-100 p-2 px-4 rounded-lg"
            >
              <Text weight="SEMIBOLD">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default BottomSheet;
