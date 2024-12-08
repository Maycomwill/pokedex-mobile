import { Image, View } from "react-native";
import Text from "../components/Text";
import { Feather } from "@expo/vector-icons";
import { Evolution } from "../interfaces/evolutionInterface";
import handleTrigger from "./handleTrigger";
import clsx from "clsx";

export default function handleWithRenderEvolutionChain(
  evolution: Evolution[],
  shiny: boolean
) {
  return evolution.map((e, i) => {
    return (
      <View className="flex flex-row items-center justify-center" key={e.name}>
        <View className="flex flex-row items-center justify-center space-y-2">
          {evolution[0].details[0] !== undefined && (
            <View className="flex items-center justify-center flex-col space-y-2 w-14">
              {handleTrigger(evolution[i], e.trigger)}
              <Feather name="chevrons-right" size={24} color="black" />
            </View>
          )}
          <View className="flex flex-col items-center justify-center">
            <Image
              width={70}
              height={70}
              key={e.name}
              source={{
                uri: `${shiny ? e.sprites.shiny : e.sprites.default}`,
              }}
            />
            <Text
              className={clsx("capitalize", {
                "pt-2": evolution[0].details[0] === undefined,
              })}
              size="XS"
            >
              {e.name}
            </Text>
          </View>
        </View>
      </View>
    );
  });
}
