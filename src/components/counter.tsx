import React, { ChangeEvent } from "react";
import { NewComponent } from "./inter";
import logo from "./logo.svg";
import { Gamer } from "./helpers/user";
import Button from "react-bootstrap/Button";
import { useState } from "react";

type inputProps = {
  id: number;
  name: string;
};

enum Upgrading {
  LevelUp = 0,
  LevelDown = 1,
  PowerUp = 2,
  PowerDown = 3,
}

const Counter: React.FC<NewComponent> = ({ message }) => {
  const [numberOfPlayer, setNumberOfPlayer] = useState<number>(0);

  const [inputsName, setInputsName] = useState<inputProps[]>([]);

  let empty: Gamer[] = [];
  const [gamers, setGamers] = useState<Gamer[]>(empty);
  const [isInput, setIsInput] = useState<boolean>(true);
  const [isGame, setIsGame] = useState<boolean>(false);

  const handleAdd = () => {
    setInputsName([...inputsName, { id: numberOfPlayer, name: "" }]);
    setNumberOfPlayer(numberOfPlayer + 1);
  };

  const handleDelete = (index: number) => {
    setNumberOfPlayer(numberOfPlayer - 1);
    const inputsTemp = [...inputsName];
    inputsTemp.splice(index, 1);
    setInputsName(inputsTemp);
    for (let i = 0; i < inputsTemp.length; i++) {
      inputsTemp[i].id = i;
    }
    setInputsName(inputsTemp);
  };

  const handleGamerName = (e: ChangeEvent<HTMLInputElement>, i: number) => {
    let arrTemp = [...inputsName];
    arrTemp[i].name = e.target.value;
    setInputsName(arrTemp);
  };

  const initializeGamers = () => {
    if (inputsName.length > 0) {
      let gamerTemp = [];
      for (let i = 0; i < inputsName.length; i++) {
        let newGamer: Gamer = new Gamer("");
        newGamer.name = inputsName[i].name;
        gamerTemp.push(newGamer);
      }
      setGamers(gamerTemp);
      setIsInput(false);
      setIsGame(true);
    } else {
      window.alert("PROSZE NAJPIERW DODAC GRACZY");
    }
  };

  const handleUpgrades = (mode: Upgrading, index: number) => {
    let indexTemp = index - 1;
    let arrTemp = [...gamers];

    switch (mode) {
      case Upgrading.LevelUp: {
        arrTemp[indexTemp].level = arrTemp[indexTemp].level + 1;
        setGamers(arrTemp);
        break;
      }
      case Upgrading.LevelDown: {
        arrTemp[indexTemp].level = arrTemp[indexTemp].level - 1;
        setGamers(arrTemp);
        break;
      }
      case Upgrading.PowerUp: {
        arrTemp[indexTemp].power = arrTemp[indexTemp].power + 1;
        setGamers(arrTemp);
        break;
      }
      case Upgrading.PowerDown: {
        arrTemp[indexTemp].power = arrTemp[indexTemp].power - 1;
        setGamers(arrTemp);
        break;
      }
    }
    isWinner(gamers[indexTemp].level, indexTemp);
  };

  const isWinner = (level: number, index: number) => {
    if (level == 10) {
      window.alert(`WYGRAŁ GRACZ ${gamers[index].name}`);
    }
  };

  return (
    <div>
      {isInput && (
        <div className=" d-flex justify-content-center m-3">
          <Button variant="secondary" onClick={() => handleAdd()}>
            Add Player
          </Button>
        </div>
      )}
      {isInput &&
        inputsName.map((inputField, i = 0) => (
          <div key={i + 1} className="d-flex justify-content-center m-3">
            <button
              type="button"
              className="btn btn-danger btn-sm mx-1"
              onClick={() => handleDelete(i)}
            >
              -
            </button>
            <input
              value={inputField.name}
              onChange={(event) => handleGamerName(event, i)}
            />
          </div>
        ))}
      {isInput && (
        <div className=" d-flex justify-content-center">
          <Button variant="warning" onClick={() => initializeGamers()}>
            INITIALIZE
          </Button>
        </div>
      )}

      <div className=" d-flex justify-content-center">
        {isGame &&
          gamers.map((gamer, i: number = 0) => (
            <div key={`${i}`} className="d-flex justify-content-center p-3">
              <tr>
                <div className="d-flex justify-content-center p-3">
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm mx-1"
                      onClick={() => handleUpgrades(Upgrading.LevelUp, i + 1)}
                    >
                      LevelUp
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className=" btn btn-secondary btn-sm mx-1"
                      onClick={() => handleUpgrades(Upgrading.PowerUp, i + 1)}
                    >
                      PowerUp
                    </button>
                  </td>
                </div>
                <td className="d-flex justify-content-center p-3">
                  NAME:{gamer.name}
                </td>
                <td className="d-flex justify-content-center p-3">
                  Power:{gamer.power}
                </td>
                <td className="d-flex justify-content-center p-3">
                  LEVEL:{gamer.level}
                </td>
                <div className="d-flex justify-content-center p-3">
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm mx-1"
                      onClick={() => handleUpgrades(Upgrading.LevelDown, i + 1)}
                    >
                      LevelDown
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm mx-1"
                      onClick={() => handleUpgrades(Upgrading.PowerDown, i + 1)}
                    >
                      PowerDown
                    </button>
                  </td>
                </div>
              </tr>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Counter;
