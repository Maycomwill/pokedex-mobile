import Bug from "../../assets/TypesSvg/Bug.svg";
import Dark from "../../assets/TypesSvg/Dark.svg";
import Dragon from "../../assets/TypesSvg/Dragon.svg";
import Electric from "../../assets/TypesSvg/Electric.svg";
import Fairy from "../../assets/TypesSvg/Fairy.svg";
import Fighting from "../../assets/TypesSvg/Fighting.svg";
import Fire from "../../assets/TypesSvg/Fire.svg";
import Flying from "../../assets/TypesSvg/Flying.svg";
import Ghost from "../../assets/TypesSvg/Ghost.svg";
import Grass from "../../assets/TypesSvg/Grass.svg";
import Ground from "../../assets/TypesSvg/Ground.svg";
import Ice from "../../assets/TypesSvg/Ice.svg";
import Normal from "../../assets/TypesSvg/Normal.svg";
import Poison from "../../assets/TypesSvg/Poison.svg";
import Psychic from "../../assets/TypesSvg/Psychic.svg";
import Rock from "../../assets/TypesSvg/Rock.svg";
import Steel from "../../assets/TypesSvg/Steel.svg";
import Water from "../../assets/TypesSvg/Water.svg";

interface SvgCardProps {
  type: string;
}

export const SvgTypeCard = ({ type }: SvgCardProps) => {
  switch (type) {
    case "bug":
      return <Bug width={64} height={64} />;
    case "dark":
      return <Dark width={64} height={64} />;
    case "dragon":
      return <Dragon width={64} height={64} />;
    case "electric":
      return <Electric width={64} height={64} />;
    case "fairy":
      return <Fairy width={64} height={64} />;
    case "fighting":
      return <Fighting width={64} height={64} />;
    case "fire":
      return <Fire width={64} height={64} />;
    case "flying":
      return <Flying width={64} height={64} />;
    case "ghost":
      return <Ghost width={64} height={64} />;
    case "grass":
      return <Grass width={64} height={64} />;
    case "ground":
      return <Ground width={64} height={64} />;
    case "ice":
      return <Ice width={64} height={64} />;
    case "normal":
      return <Normal width={64} height={64} />;
    case "poison":
      return <Poison width={64} height={64} />;
    case "psychic":
      return <Psychic width={64} height={64} />;
    case "rock":
      return <Rock width={64} height={64} />;
    case "steel":
      return <Steel width={64} height={64} />;
    case "water":
      return <Water width={64} height={64} />;
  }
};

export const SvgSymbolCard = ({ type }: SvgCardProps) => {
  switch (type) {
    case "bug":
      return <Bug width={32} height={32} />;
    case "dark":
      return <Dark width={32} height={32} />;
    case "dragon":
      return <Dragon width={32} height={32} />;
    case "electric":
      return <Electric width={32} height={32} />;
    case "fairy":
      return <Fairy width={32} height={32} />;
    case "fighting":
      return <Fighting width={32} height={32} />;
    case "fire":
      return <Fire width={32} height={32} />;
    case "flying":
      return <Flying width={32} height={32} />;
    case "ghost":
      return <Ghost width={32} height={32} />;
    case "grass":
      return <Grass width={32} height={32} />;
    case "ground":
      return <Ground width={32} height={32} />;
    case "ice":
      return <Ice width={32} height={32} />;
    case "normal":
      return <Normal width={32} height={32} />;
    case "poison":
      return <Poison width={32} height={32} />;
    case "psychic":
      return <Psychic width={32} height={32} />;
    case "rock":
      return <Rock width={32} height={32} />;
    case "steel":
      return <Steel width={32} height={32} />;
    case "water":
      return <Water width={32} height={32} />;
      default:
        return <Water width={32} height={32} />;
  }
};
