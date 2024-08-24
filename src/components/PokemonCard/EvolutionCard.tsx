import { View, Image } from "react-native";
import React from "react";
import { Evolution } from "../../interfaces/evolutionInterface";
import Text from "../Text";

interface EvolutionCardProps {
  data: Evolution;
  shiny: boolean;
}
const EvolutionCard = ({ data, shiny }: EvolutionCardProps) => {
  return (
    <View key={data.name} className="items-center flex-1 justify-center">
      <Text weight="BOLD" size="BASE" transform="CAP">
        {data.name}
      </Text>
      {/* <Text size="XS">#{item.id.toString().padStart(3, "0")}</Text> */}
      <Image
        width={200}
        height={200}
        source={{
          uri: shiny ? data.sprites.shiny : data.sprites.default,
        }}
      />
    </View>
  );
};

export default EvolutionCard;
