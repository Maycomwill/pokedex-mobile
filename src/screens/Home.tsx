import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../routes/AppRoutes";
import { StatusBarHeight } from "../utils/StatusBarHeight";
import Pokeball from "../assets/pokeball.svg";
import { Button } from "../components/Button";
import HomeSearch from "../components/HomeSearch";

type HomeScreenNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  "Home"
>;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
        style={{ paddingTop: Number(StatusBarHeight) + 32 }}
        className="flex-1 relative z-10 items-center justify-start bg-red-500 pt-2"
      >
        <View className="absolute z-0 w-full items-center justify-center top-24">
          <Pokeball width={300} height={300} opacity={0.2} rotation={-45} />
        </View>
        <HomeSearch />
        <View className="flex-1 items-center justify-center rounded-t-3xl bg-zinc-100 w-full px-12 space-y-8">
          <Button.Root
            className="bg-green-400"
            onPress={() => navigation.navigate("Types")}
          >
            <Button.Content size="XL" transform="CAP" children="Tipos" />
            <Button.Icon icon={"pokeball"} />
          </Button.Root>
          <Button.Root
            className="bg-orange-400"
            onPress={() => navigation.navigate("Regions")}
          >
            <Button.Content size="XL" transform="CAP" children="Regiões" />
            <Button.Icon icon={"map-marker"} />
          </Button.Root>
          <Button.Root
            className="bg-sky-400"
            onPress={() => navigation.navigate("MovesAndAbilities")}
          >
            <Button.Content
              size="XL"
              transform="CAP"
              children="Golpes e Habilidades"
            />
            <Button.Icon icon={"star"} />
          </Button.Root>
          <Button.Root
            className="bg-red-400"
            onPress={() => navigation.navigate("Favorites")}
          >
            <Button.Content size="XL" transform="CAP" children="Favoritos" />
            <Button.Icon icon={"heart"} />
          </Button.Root>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Home;
