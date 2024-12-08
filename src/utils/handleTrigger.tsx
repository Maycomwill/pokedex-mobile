import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { Evolution } from "../interfaces/evolutionInterface";
import { Image, View } from "react-native";
import Text from "../components/Text";

export default function handleTrigger(
  evolution: Evolution,
  trigger: { name: string; sprite?: string }
) {
  switch (trigger.name) {
    case "level-up":
      // console.log("level-up evolutions: ", evolution.name);
      return (
        <View className="flex items-center justify-center flex-row">
          {evolution.details[0].min_level && (
            <View className="items-center">
              <Feather name="chevron-up" size={18} color="#141292" />
              <Text className="text-xs mx-1">
                {evolution.details[0].min_level.toString()}
              </Text>
              {evolution.details[0].time_of_day === "day" && (
                <Ionicons name="sunny" size={16} color={"#ffdc17"} />
              )}
              {evolution.details[0].time_of_day === "night" && (
                <Ionicons name="moon" size={16} color={"#1b1b1b"} />
              )}
            </View>
          )}
          {evolution.details[0].min_beauty && (
            <Ionicons name="sparkles" size={16} color={"#ffdc17"} />
          )}
          {evolution.details[0].min_affection && (
            <>
              <Ionicons name="heart" size={16} color={"#ff1f17"} />
              <Text className="mx-1 text-xs">
                {evolution.details[0].min_affection.toString()}
              </Text>
              {evolution.details[0].time_of_day === "day" && (
                <Ionicons name="sunny" size={16} color={"#ffdc17"} />
              )}
              {evolution.details[0].time_of_day === "night" && (
                <Ionicons name="moon" size={16} color={"#1b1b1b"} />
              )}
            </>
          )}
          {evolution.details[0].min_happiness && (
            <View className="justify-center flex-row items-center">
              <Ionicons name="happy-outline" size={16} color={"#1b1b1b"} />
              <Text className="text-xs mx-1">
                {evolution.details[0].min_happiness.toString()}
              </Text>
              {evolution.details[0].time_of_day === "day" && (
                <Ionicons name="sunny" size={16} color={"#ffdc17"} />
              )}
              {evolution.details[0].time_of_day === "night" && (
                <Ionicons name="moon" size={16} color={"#1b1b1b"} />
              )}
            </View>
          )}
        </View>
      );
    case "trade":
      return (
        <View className="flex rotate-90 items-center justify-center flex-row">
          <AntDesign name="swap" size={18} color="#141292" />
        </View>
      );
    case "use-item":
      if (evolution.name === "glaceon" || evolution.name === "leafeon") {
        return (
          <View>
            {trigger.sprite && (
              <Image
                alt={evolution.details[3].item.name.split("-").join(" ")}
                source={{ uri: trigger.sprite }}
                width={32}
                height={32}
              />
            )}
          </View>
        );
      }
      return (
        <View className="flex items-center justify-center flex-row">
          {trigger.sprite && (
            <Image
              alt={evolution.details[0].item.name.split("-").join(" ")}
              source={{ uri: trigger.sprite }}
              width={32}
              height={32}
            />
          )}
        </View>
      );
    default:
      return null;
  }
}
