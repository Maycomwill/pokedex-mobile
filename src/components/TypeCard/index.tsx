import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import React from "react";
import Text from "../Text";
import clsx from "clsx";
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
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/AppRoutes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface TypeCardProps extends TouchableOpacityProps {
  type: string;
}

const TypeCard = ({ type }: TypeCardProps) => {
  function handleSvg(type: string) {
    switch (type) {
      case "bug":
        return <Bug width={64} height={64} />;
      case "dark":
        return <Dark width={64} height={64} />;
      case "dragon":
        return <Dragon width={64} height={64} />;
      case "electric":
        return <Electric width={64} height={64} />;
      case "fairy":
        return <Fairy width={64} height={64} />;
      case "fighting":
        return <Fighting width={64} height={64} />;
      case "fire":
        return <Fire width={64} height={64} />;
      case "flying":
        return <Flying width={64} height={64} />;
      case "ghost":
        return <Ghost width={64} height={64} />;
      case "grass":
        return <Grass width={64} height={64} />;
      case "ground":
        return <Ground width={64} height={64} />;
      case "ice":
        return <Ice width={64} height={64} />;
      case "normal":
        return <Normal width={64} height={64} />;
      case "poison":
        return <Poison width={64} height={64} />;
      case "psychic":
        return <Psychic width={64} height={64} />;
      case "rock":
        return <Rock width={64} height={64} />;
      case "steel":
        return <Steel width={64} height={64} />;
      case "water":
        return <Water width={64} height={64} />;
    }
  }

  type TypesScreenNavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    "Types"
  >;

  const navigation = useNavigation<TypesScreenNavigationProps>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Type", {
          type,
        })
      }
      activeOpacity={0.4}
      className={clsx(
        "w-[45%] bg-blue-500 p-4 items-start px-6 relative justify-center rounded-full overflow-hidden",
        {
          "bg-backgroundCard-fire": type === "fire",
          "bg-backgroundCard-normal": type === "normal",
          "bg-backgroundCard-water": type === "water",
          "bg-backgroundCard-electric": type === "electric",
          "bg-backgroundCard-grass": type === "grass",
          "bg-backgroundCard-ice": type === "ice",
          "bg-backgroundCard-fighting": type === "fighting",
          "bg-backgroundCard-poison": type === "poison",
          "bg-backgroundCard-ground": type === "ground",
          "bg-backgroundCard-flying": type === "flying",
          "bg-backgroundCard-psychic": type === "psychic",
          "bg-backgroundCard-bug": type === "bug",
          "bg-backgroundCard-rock": type === "rock",
          "bg-backgroundCard-steel": type === "steel",
          "bg-backgroundCard-ghost": type === "ghost",
          "bg-backgroundCard-dragon": type === "dragon",
          "bg-backgroundCard-dark": type === "dark",
          "bg-backgroundCard-fairy": type === "fairy",
        }
      )}
    >
      <Text color="WHITE" transform="CAP" align="LEFT">
        {type}
      </Text>
      <View className="absolute right-0 top-1 opacity-30">
        {handleSvg(type)}
      </View>
    </TouchableOpacity>
  );
};

export default TypeCard;
