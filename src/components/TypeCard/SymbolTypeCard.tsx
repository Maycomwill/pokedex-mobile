import {
  View,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { SvgSymbolCard } from "./SvgObjReturn";
import clsx from "clsx";

interface SymbolTypeCardProps extends TouchableOpacityProps {
  type: string;
}

const SymbolTypeCard = ({ type, ...rest }: SymbolTypeCardProps) => {
  const symbol = SvgSymbolCard({ type });
  return (
    <TouchableOpacity
      activeOpacity={0.2}
      className={clsx("bg-red-400 rounded-full p-2 mr-2", {
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
      })}
      {...rest}
    >
      {symbol}
    </TouchableOpacity>
  );
};

export default SymbolTypeCard;
