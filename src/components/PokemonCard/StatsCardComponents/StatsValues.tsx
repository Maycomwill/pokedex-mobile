import { View } from "react-native";
import React from "react";
import Text from "../../Text";
import clsx from "clsx";

interface StatsValuesProps {
  name: string;
  value: number;
}

function handleWidth(stat: number) {
  const total = 256;
  const newValue = (stat * 100) / total;
  return newValue;
}

const StatsValues = ({ name, value }: StatsValuesProps) => {
  const handleName = (name: string) => {
    switch (name) {
      case "hp":
        return "HP";
      case "attack":
        return "Ataque";
      case "defense":
        return "Defesa";
      case "special-attack":
        return "Ataque sp.";
      case "special-defense":
        return "Defesa sp.";
      case "speed":
        return "Velocidade";
      default:
        return name;
    }
  };
  return (
    <View className="w-full flex-row items-center justify-start mb-2">
      <View className="w-[28%]">
        <Text color="BLACK" size="SM" transform="CAP">
          {handleName(name)}
        </Text>
      </View>
      <View className="flex-row items-center justify-between space-x-2 w-[72%]">
        <Text color="BLACK" weight="BOLD">
          {value.toString()}
        </Text>
        <View className="w-[80%] h-4 bg-zinc-200 rounded-full relative">
          <View
            style={{ width: `${handleWidth(value)}%` }}
            className={clsx(
              "absolute w-1/2 h-4 rounded-full bg-green-400 left-0 top-0 bottom-0",
              {
                "bg-red-400": name === "Defesa",
              },
              {
                "bg-red-400": name === "Defesa sp.",
              },
              {
                "bg-red-400": name === "HP",
              }
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default StatsValues;
