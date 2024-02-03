import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

export default function TextInputIcon({ icon }: { icon: "search" }) {
  return (
    <Feather
      name={icon}
      color={colors.zinc[400]}
      size={24}
      style={{ position: "absolute", zIndex: 10, right: 20 }}
    />
  );
}
