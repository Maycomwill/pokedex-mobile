import { View, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import Bug from "../../assets/TypesSvg/Bug.svg";
import Dark from "../../assets/TypesSvg/Dark.svg";
import Dragon from "../../assets/TypesSvg/Dragon.svg";
import Electric from "../../assets/TypesSvg/Electric.svg";
import Fairy from "../../assets/TypesSvg/Fairy.svg";
import Fighting from "../../assets/TypesSvg/Fighting.svg";
import Fire from "../../assets/TypesSvg/Fire.svg";
import Flying from "../../assets/TypesSvg/Flying.svg";
import Ghost from "../../assets/TypesSvg/Ghost.svg";
import Grass from "../../assets/TypesSvg/Grass.svg";
import Ground from "../../assets/TypesSvg/Ground.svg";
import Ice from "../../assets/TypesSvg/Ice.svg";
import Normal from "../../assets/TypesSvg/Normal.svg";
import Poison from "../../assets/TypesSvg/Poison.svg";
import Psychic from "../../assets/TypesSvg/Psychic.svg";
import Rock from "../../assets/TypesSvg/Rock.svg";
import Steel from "../../assets/TypesSvg/Steel.svg";
import Water from "../../assets/TypesSvg/Water.svg";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";

function handleSvg(type: string) {
  switch (type) {
    case "bug":
      return <Bug width={256} height={256} />;
    case "dark":
      return <Dark width={256} height={256} />;
    case "dragon":
      return <Dragon width={256} height={256} />;
    case "electric":
      return <Electric width={256} height={256} />;
    case "fairy":
      return <Fairy width={256} height={256} />;
    case "fighting":
      return <Fighting width={256} height={256} />;
    case "fire":
      return <Fire width={256} height={256} />;
    case "flying":
      return <Flying width={256} height={256} />;
    case "ghost":
      return <Ghost width={256} height={256} />;
    case "grass":
      return <Grass width={256} height={256} />;
    case "ground":
      return <Ground width={256} height={256} />;
    case "ice":
      return <Ice width={256} height={256} />;
    case "normal":
      return <Normal width={256} height={256} />;
    case "poison":
      return <Poison width={256} height={256} />;
    case "psychic":
      return <Psychic width={256} height={256} />;
    case "rock":
      return <Rock width={256} height={256} />;
    case "steel":
      return <Steel width={256} height={256} />;
    case "water":
      return <Water width={256} height={256} />;
  }
}

const colors = {
  primary: "#673ab7",
  secondary: "#03dac6",
};

interface LoadingProps {
  type?: string;
}

const Loading = ({ type }: LoadingProps) => {
  const defaultOpacity = useSharedValue(0.5);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: defaultOpacity.value,
    };
  }, []);
  useEffect(() => {
    defaultOpacity.value = withRepeat(
      withSpring(1, { duration: 1000 }),
      5,
      true
    );
  }, []);

  return (
    <View className="flex-1 bg-transparent items-center justify-center">
      {type ? (
        <Animated.View
          style={[{}, reanimatedStyle]}
          className="w-full flex-1 items-center justify-center"
        >
          {handleSvg(type)}
        </Animated.View>
      ) : (
        <ActivityIndicator size={128} color={colors.secondary} />
      )}
    </View>
  );
};

export default Loading;
