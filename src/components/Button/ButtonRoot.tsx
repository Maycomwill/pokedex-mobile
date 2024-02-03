import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { ReactNode } from "react";
import clsx from "clsx";
import colors from "tailwindcss/colors";

interface IButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  backgroundColor?: "PRIMARY" | "SECONDARY" | "GRAY" | "DELETE";
  className?: string
}

const ButtonRoot = ({
  children,
  backgroundColor = "PRIMARY",
  className,
  ...rest
}: IButtonProps) => {
  return (
    <TouchableOpacity
      className={clsx(
        " rounded-full w-full py-3 items-start justify-center relative px-8 pr-12",
        {
          "bg-primary-500": backgroundColor === "PRIMARY",
          "bg-secondary-500": backgroundColor === "SECONDARY",
          "bg-zinc-900": backgroundColor === "GRAY",
          "bg-alert": backgroundColor === "DELETE",
        },
        className
      )}
      activeOpacity={0.4}
      style={{
        elevation: 5,
      }}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

export default ButtonRoot;
