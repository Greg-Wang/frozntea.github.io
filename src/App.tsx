import RankedLogo from "./components/RankedLogo";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import times from "../times.json";

function randomNormal(mean: number, stdDev: number) {
  var u1 = Math.random();
  var u2 = Math.random();
  var z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);

  // Scale and shift the generated random number to match the desired mean and standard deviation
  return z0 * stdDev + mean;
}

function calc_elo(win_loss: boolean, elo_player: number, elo_opponent: number) {
  let K = 32;
  let new_elo_player = 0;
  if (win_loss) {
    let expected = 1 / (1 + Math.pow(10, (elo_opponent - elo_player) / 400));
    let rating_diff = (1 - expected) * K;
    new_elo_player = elo_player + rating_diff;
  } else {
    let expected = 1 / (1 + Math.pow(10, (elo_opponent - elo_player) / 400));
    let rating_diff = (1 - expected) * K;
    new_elo_player = elo_player - rating_diff;
  }

  return new_elo_player;
}

function App() {
  let initial_opponent = Math.floor(Math.random() * times.players.length);
  let initial_elo = 705;
  let range = 320;
  const std_dev_rate = 0.7;

  let [elo, setElo] = useState(initial_elo);
  let [winFlag, setwinFlag] = useState(1);
  let [oppWins, setOppWins] = useState(0);
  console.log(winFlag);
  while (
    times.players[initial_opponent].elo > elo + range ||
    times.players[initial_opponent].elo < elo - range
  ) {
    initial_opponent = Math.floor(Math.random() * times.players.length);
  }
  let [randomOpp, setRandomOpp] = useState(initial_opponent);
  let [playerWins, setPlayerWins] = useState(0);
  console.log(randomOpp);
  const imagesArray = [
    "images/grey 3.png",
    "images/grey 2.png",
    "images/grey 1.png",
    "images/brown 3.png",
    "images/brown 2.png",
    "images/brown 1.png",
    "images/red 3.png",
    "images/red 2.png",
    "images/red 1.png",
    "images/light blue 3.png",
    "images/light blue 2.png",
    "images/light blue 1.png",
    "images/teal 3.png",
    "images/teal 2.png",
    "images/teal 1.png",
    "images/pink 3.png",
    "images/pink 2.png",
    "images/pink 1.png",
    "images/blue .png",
    "images/blue .png",
    "images/blue .png",

    "images/gold.png",
    "images/gold.png",
    "images/gold.png",
    "images/purple.png",
    "images/purple.png",
    "images/purple.png",
  ];
  const rankNameArray = [
    "Lost One",
    "Resident Functer",
    "True Functer",
    "Rising Star",
    "Speedrunning Elite",
    "Cube Legend",
    "Grandmaster",
    "Fucnt God",
    "The Abyssal Void",
  ];
  const messageArray = [
    "Everybody starts somewhere",
    "Remember, no reseting, it'll be better for your improvement",
    "You're keeping up pretty well, your dedication is paying off",
    "It's a long way up to the top, but if anyone could do it, it'd be you",
    "This isn't just a one time game you speedran, you're in it for the long haul",
    "A tournament threat to even some of the best players in the world",
    "One of the best to ever do it, welcome to the top, wins are hard to come by but that's makes them all the more worth it",
    "The best of the best, you're THE tournament favorite and in contention for if not already the best player in the world",
    "The end of time and functing of all kind, you are a transcendent talent, there may never be another like you but remember \n The end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never the end is never",
  ];
  let randomTime = randomNormal(
    times.players[randomOpp]["mean"],
    times.players[randomOpp]["standard dev"] * std_dev_rate
  );
  // console.log(randomOpponent);
  return (
    <div>
      <br />
      <RankedLogo
        image={imagesArray[elo < 580 ? 0 : Math.floor((elo - 500) / 80)]}
      />
      <br />

      <h1 className="center heading1" style={{ color: "white" }}>
        {rankNameArray[elo < 580 ? 0 : Math.floor((elo - 500) / (80 * 3))]}
      </h1>

      <h2 className="center heading2" style={{ color: "white" }}>
        Rank {elo < 500 ? 3 : 3 - (Math.floor((elo - 500) / 80) % 3)}
      </h2>
      <br />
      <h5 className="center" style={{ color: "white", whiteSpace: "pre-line" }}>
        "{messageArray[elo < 580 ? 0 : Math.floor((elo - 500) / (80 * 3))]}"
      </h5>
      <br />
      <br />
      <h4 className="center" style={{ color: "white" }}>
        Elo: {elo}
      </h4>

      <h4 className="center" style={{ color: "white" }}>
        Score: {playerWins} - {oppWins}
      </h4>

      <h4 className="center" style={{ color: "white" }}>
        Opponent: {times.players[randomOpp].player}(
        {times.players[randomOpp].elo})
      </h4>
      <br />

      <h4 className="center" style={{ color: "white" }}>
        Time To Beat: {"  "}
        {Math.floor(Math.round(randomTime * 100) / 100 / 60)}:
        {Math.floor((Math.round(randomTime * 100) / 100) % 60) >= 10
          ? ((Math.round(randomTime * 100) / 100) % 60).toFixed(2)
          : "0" + ((Math.round(randomTime * 100) / 100) % 60).toFixed(2)}
      </h4>

      <br />
      <div className="centerButton">
        <button
          style={{
            margin: 30,
            width: 90,
            height: 50,
            fontSize: 20,
            textAlign: "center",
          }}
          type="button"
          className="btn btn-success"
          onClick={() => {
            setPlayerWins(playerWins + 1);
            if (playerWins == 2) {
              setElo(
                Math.floor(calc_elo(true, elo, times.players[randomOpp].elo))
              );
              setPlayerWins(0);
              setOppWins(0);
              setwinFlag(1);
              let changed_opponent = Math.floor(
                Math.random() * times.players.length
              );
              while (
                times.players[changed_opponent].elo > elo + range ||
                times.players[changed_opponent].elo < elo - range
              ) {
                changed_opponent = Math.floor(
                  Math.random() * times.players.length
                );
              }
              setRandomOpp(changed_opponent);
            }
          }}
        >
          Win
        </button>{" "}
        <button
          style={{
            margin: 30,
            width: 90,
            height: 50,
            fontSize: 20,
            textAlign: "center",
          }}
          type="button"
          className="btn btn-danger"
          onClick={() => {
            setOppWins(oppWins + 1);
            if (oppWins == 2) {
              setElo(
                Math.floor(calc_elo(false, elo, times.players[randomOpp].elo))
              );
              setPlayerWins(0);
              setOppWins(0);
              setwinFlag(-1);
              let changed_opponent = Math.floor(
                Math.random() * times.players.length
              );
              while (
                times.players[changed_opponent].elo > elo + range ||
                times.players[changed_opponent].elo < elo - range
              ) {
                changed_opponent = Math.floor(
                  Math.random() * times.players.length
                );
              }
              setRandomOpp(changed_opponent);
            }
          }}
        >
          Loss
        </button>
      </div>
    </div>
  );
}
export default App;
