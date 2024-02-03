import Text, { ITextProps } from "../Text";
import React from "react";

interface ButtonContentProps extends ITextProps {
  children: string;
}

const ButtonContent = ({
  children,
  size = "BASE",
  color = "WHITE",
  weight = "BOLD",
  transform = "UPP"
}: ButtonContentProps) => {
  return (
    <Text transform={transform} size={size} weight={weight} color={color}>
      {children}
    </Text>
  );
};

export default ButtonContent;
