import { createNativeStackNavigator } from "@react-navigation/native-stack";
import colors from "tailwindcss/colors";
import { Feather } from "@expo/vector-icons";
import Home from "../screens/Home";
import Regions from "../screens/Regions";
import Types from "../screens/Types";
import MovesAndAbilities from "../screens/MovesAndAbilities";
import Favorites from "../screens/Favorites";
import Type from "../screens/Type";
import PokeList from "../screens/PokeList";
import { typesObjColors } from "../utils/typesArray";
import { shade } from "polished";
import Ability from "../screens/Ability";
import Pokemon from "../screens/Pokemon";

export type RootStackParamList = {
  Home: undefined;
  Regions: undefined;
  Types: undefined;
  MovesAndAbilities: undefined;
  Favorites: undefined;
  Type: { type: string };
  Pokelist: { region: string };
  Ability: { ability: string };
  Pokemon: { name: string; type: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const AppRoutes = () => {
  function handleWithCapitalizeTitle(string: string) {
    const cap = string.charAt(0).toUpperCase() + string.slice(1);
    const newName = cap.split("-").join(" ");
    return newName;
  }

  function handleWithTypeColor(type: string) {
    if (type in typesObjColors && type === typesObjColors[type])
      console.log("cor", typesObjColors[type]);
    return shade(0.1, typesObjColors[type]);
  }

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="Regions"
        component={Regions}
        options={({ navigation }) => ({
          headerTitle: "Regiões",
          headerTitleStyle: {
            color: `${colors.zinc[100]}`,
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: `${colors.orange[500]}`,
          },
          headerLeft: () => (
            <Feather
              name="chevron-left"
              size={32}
              color={colors.zinc[100]}
              onPress={() => navigation.goBack()}
            />
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Types"
        component={Types}
        options={({ navigation }) => ({
          headerTitle: "Tipos",
          headerTitleStyle: {
            color: `${colors.zinc[100]}`,
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: `${colors.green[500]}`,
          },
          headerLeft: () => (
            <Feather
              name="chevron-left"
              size={32}
              color={colors.zinc[100]}
              onPress={() => navigation.goBack()}
            />
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="MovesAndAbilities"
        component={MovesAndAbilities}
        options={({ navigation }) => ({
          headerTitle: "Golpes e Habilidades",
          headerTitleStyle: {
            color: `${colors.zinc[100]}`,
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: `${colors.sky[500]}`,
          },
          headerLeft: () => (
            <Feather
              name="chevron-left"
              size={32}
              color={colors.zinc[100]}
              onPress={() => navigation.goBack()}
            />
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Ability"
        component={Ability}
        options={({ route, navigation }) => ({
          headerTitle: handleWithCapitalizeTitle(route.params.ability),
          headerTitleStyle: {
            color: `${colors.zinc[100]}`,
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: `${colors.sky[500]}`,
          },
          headerLeft: () => (
            <Feather
              name="chevron-left"
              size={32}
              color={colors.zinc[100]}
              onPress={() => navigation.goBack()}
            />
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={({ navigation }) => ({
          headerTitle: "Favoritos",
          headerTitleStyle: {
            color: `${colors.zinc[100]}`,
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: `${colors.red[500]}`,
          },
          headerLeft: () => (
            <Feather
              name="chevron-left"
              size={32}
              color={colors.zinc[100]}
              onPress={() => navigation.goBack()}
            />
          ),
          headerShadowVisible: false,
        })}
      />

      <Stack.Screen
        name="Type"
        component={Type}
        options={({ route, navigation }) => ({
          headerTitle: `${handleWithCapitalizeTitle(route.params.type)}`,
          headerTitleStyle: {
            color: `${colors.zinc[100]}`,
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: `${handleWithTypeColor(route.params.type)}`,
          },
          headerLeft: () => (
            <Feather
              name="chevron-left"
              size={32}
              color={colors.zinc[100]}
              onPress={() => navigation.goBack()}
            />
          ),
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Pokelist"
        component={PokeList}
        options={({ route, navigation }) => ({
          headerTitle: handleWithCapitalizeTitle(route.params.region),
          headerTitleStyle: {
            color: `${colors.zinc[100]}`,
          },
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: `${colors.orange[500]}`,
          },
          headerLeft: () => (
            <Feather
              name="chevron-left"
              size={32}
              color={colors.zinc[100]}
              onPress={() => navigation.goBack()}
            />
          ),
          headerShadowVisible: false,
        })}
      />

      <Stack.Screen
        name="Pokemon"
        component={Pokemon}
        options={({ route, navigation }) => ({
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
};

export default AppRoutes;
