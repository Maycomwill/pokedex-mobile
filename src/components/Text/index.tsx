import { Text as TextNative, TextProps } from "react-native";
import React from "react";
import clsx from "clsx";

export interface ITextProps extends TextProps {
  children: string | string[];
  className?: string;
  color?: "PRIMARY" | "SECONDARY" | "WHITE" | "BLACK" | "SUCCESS" | "ERROR";
  weight?: "REGULAR" | "SEMIBOLD" | "BOLD" | "EXTRABOLD";
  size?: "XS" | "SM" | "BASE" | "LG" | "XL" | "2XL" | "3XL" | "4XL";
  transform?: "UPP" | "LOW" | "CAP" | "";
  align?: "CENTER" | "LEFT" | "RIGHT" | "JUSTIFY";
}
const Text = ({
  className,
  color = "BLACK",
  weight = "REGULAR",
  size = "BASE",
  transform = "",
  align,
  children,
}: ITextProps) => {
  return (
    <TextNative
      className={clsx(
        {
          "text-primary-500": color === "PRIMARY",
          "text-secondary-500": color === "SECONDARY",
          "text-zinc-100": color === "WHITE",
          "text-zinc-900": color === "BLACK",
          "text-sucess": color === "SUCCESS",
          "text-alert": color === "ERROR",
        },
        {
          "font-regular": weight === "REGULAR",
          "font-semibold": weight === "SEMIBOLD",
          "font-bold": weight === "BOLD",
          "font-extrabold": weight === "EXTRABOLD",
        },
        {
          uppercase: transform === "UPP",
          capitalize: transform === "CAP",
          lowercase: transform === "LOW",
        },
        {
          "text-center": align === "CENTER",
          "text-left": align === "LEFT",
          "text-right": align === "RIGHT",
          "text-justify": align === "JUSTIFY",
        },
        {
          "text-xs": size === "XS",
          "text-sm": size === "SM",
          "text-base": size === "BASE",
          "text-lg": size === "LG",
          "text-xl": size === "XL",
          "text-2xl": size === "2XL",
          "text-3xl": size === "3XL",
          "text-4xl": size === "4XL",
        },

        className
      )}
    >
      {children}
    </TextNative>
  );
};

export default Text;
