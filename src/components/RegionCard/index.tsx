import { ImageBackground, TouchableOpacity, View } from "react-native";
import React from "react";
import Alola from "../../assets/regions/alola.jpg";
import Galar from "../../assets/regions/galar.jpg";
import Hoenn from "../../assets/regions/hoenn.jpg";
import Kalos from "../../assets/regions/kalos.jpg";
import Johto from "../../assets/regions/johto.jpg";
import Kanto from "../../assets/regions/kanto.jpg";
import Paldea from "../../assets/regions/paldea.jpg";
import Unova from "../../assets/regions/unova.jpg";
import Sinnoh from "../../assets/regions/sinnoh.jpg";
import Text from "../Text";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../routes/AppRoutes";
import { LinearGradient } from "expo-linear-gradient";
import { rgba } from "polished";

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
      className="w-full h-36 items-center justify-center mb-4 rounded-2xl overflow-hidden relative "
      style={{
        elevation: 5,
      }}
    >
      <View className="w-full h-full inset-96 right-0 -rotate-90 absolute z-10 -left-28">
        <LinearGradient
          colors={[rgba(0, 0, 0, 1), "transparent"]}
          className="absolute top-0 left-0 h-full w-full flex-1 z-10"
        />
      </View>
      <ImageBackground
        source={handleBgImage(props.region.regionName)}
        resizeMode="stretch"
        className="w-full h-full items-start justify-center"
      >
        <View className="px-6 z-10">
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
