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
        "bg-boxType-fire-default": type === "fire",
        "bg-boxType-normal-default": type === "normal",
        "bg-boxType-water-default": type === "water",
        "bg-boxType-electric-default": type === "electric",
        "bg-boxType-grass-default": type === "grass",
        "bg-boxType-ice-default": type === "ice",
        "bg-boxType-fighting-default": type === "fighting",
        "bg-boxType-poison-default": type === "poison",
        "bg-boxType-ground-default": type === "ground",
        "bg-boxType-flying-default": type === "flying",
        "bg-boxType-psychic-default": type === "psychic",
        "bg-boxType-bug-default": type === "bug",
        "bg-boxType-rock-default": type === "rock",
        "bg-boxType-steel-default": type === "steel",
        "bg-boxType-ghost-default": type === "ghost",
        "bg-boxType-dragon-default": type === "dragon",
        "bg-boxType-dark-default": type === "dark",
        "bg-boxType-fairy-default": type === "fairy",
      })}
      {...rest}
    >
      {symbol}
    </TouchableOpacity>
  );
};

export default SymbolTypeCard;
