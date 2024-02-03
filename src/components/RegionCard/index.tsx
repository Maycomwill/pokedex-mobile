import { ImageBackground, TouchableOpacity, View } from "react-native";
import React from "react";
import Alola from "../../assets/regions/alola.png";
import Galar from "../../assets/regions/galar.png";
import Hoenn from "../../assets/regions/hoenn.png";
import Kalos from "../../assets/regions/kalos.png";
import Johto from "../../assets/regions/johto.png";
import Kanto from "../../assets/regions/kanto.png";
import Paldea from "../../assets/regions/paldea.png";
import Unova from "../../assets/regions/unova.png";
import Sinnoh from "../../assets/regions/sinnoh.png";
import Text from "../Text";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/AppRoutes";

interface RegionCardProps {
  region: { regionName: string; generation: number };
}

type RegionScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Regions"
>;

const RegionCard = (props: RegionCardProps) => {
  const navigation = useNavigation<RegionScreenNavigationProps>();
  function handleBgImage(regionName: string) {
    switch (regionName) {
      case "alola":
        return Alola;
      case "hoenn":
        return Hoenn;
      case "kalos":
        return Kalos;
      case "johto":
        return Johto;
      case "kanto":
        return Kanto;
      case "paldea":
        return Paldea;
      case "unova":
        return Unova;
      case "galar":
        return Galar;
      case "sinnoh":
        return Sinnoh;
      default:
        return Kanto;
    }
  }
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onPress={() =>
        navigation.navigate("Pokelist", {
          region: props.region.regionName,
        })
      }
      className="w-full h-36 items-center justify-center mb-4 rounded-lg overflow-hidden relative "
      style={{
        elevation: 3,
      }}
    >
      <ImageBackground
        source={handleBgImage(props.region.regionName)}
        resizeMode="stretch"
        className="w-full h-full items-start justify-center"
      >
        <View className="px-4">
          <Text color="WHITE" size="2XL" weight="BOLD" transform="CAP">
            {props.region.regionName}
          </Text>
          <Text color="WHITE" size="LG" weight="BOLD" transform="CAP">
            {props.region.generation.toString()}° geração
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default RegionCard;
