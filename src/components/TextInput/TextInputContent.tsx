import clsx from "clsx";
import { TextInputProps, TextInput } from "react-native";

interface IInputProps extends TextInputProps {}

export default function TextInputContent({
  placeholder,
  ...rest
}: IInputProps) {
  return (
    <TextInput
      placeholder={placeholder}
      className="w-full relative z-0 bg-zinc-100 rounded-full py-4 pl-6 pr-14 text-base z-1 placeholder:placeholder-zinc-900"
    {...rest}/>
  );
}
