import { useState } from "react";

import "./styles.css";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const [myFeedback, setmyFeedback] = useState("0");
  const [friendFeedback, setFriendFeedback] = useState("0");
  const [tip, setTip] = useState("0");

  console.log(
    `myFeedback is ${myFeedback}\nfriendFeedback is ${friendFeedback}`
  );
  return (
    <div className="App">
      <BillAmmount inputValue={inputValue} setInputValue={setInputValue} />
      <Feedback myFeedback={myFeedback} setmyFeedback={setmyFeedback}>
        Did you liked the service ?
      </Feedback>
      <FeedbackFriends
        friendFeedback={friendFeedback}
        setFriendFeedback={setFriendFeedback}
      >
        Did your friends liked the service ?
      </FeedbackFriends>
      <Result
        toPay={inputValue}
        myFeedback={myFeedback}
        friendFeedback={friendFeedback}
      />
    </div>
  );
}

function Result({ toPay, myFeedback, friendFeedback }) {
  const tip = Math.round(+toPay * ((+myFeedback + +friendFeedback) / 200));
  console.log(`topay is : ${toPay}, tip is : ${tip}`);
  return (
    <div className="result">
      {toPay ? `You pay ${+tip + +toPay}$ (${toPay}$ + ${tip}$ tip)` : ""}
    </div>
  );
}

function FeedbackFriends({ friendFeedback, setFriendFeedback, children }) {
  return (
    <div className="bill">
      <h3>{children}</h3>
      <select
        value={friendFeedback}
        onChange={(e) => {
          setFriendFeedback(e.target.value);
        }}
      >
        <option value="0">Desatisfied (0% Tip)</option>
        <option value="10">It Was Okay ! (10% Tip)</option>
        <option value="15">It Was Good !! (15% Tip)</option>
        <option value="20">It Was Amazig !!! (20% Tip)</option>
      </select>
    </div>
  );
}

function Feedback({ myFeedback, setmyFeedback, children }) {
  return (
    <div className="bill">
      <h3>{children}</h3>
      <select
        value={myFeedback}
        onChange={(e) => {
          setmyFeedback(e.target.value);
        }}
      >
        <option value="0">Desatisfied (0% Tip)</option>
        <option value="10">It Was Okay ! (10% Tip)</option>
        <option value="15">It Was Good !! (15% Tip)</option>
        <option value="20">It Was Amazig !!! (20% Tip)</option>
      </select>
    </div>
  );
}

function BillAmmount({ inputValue, setInputValue }) {
  const [warning, setWarning] = useState("");
  return (
    <div className="bill">
      <h3>How Much The Bill Was ?</h3>
      <input
        type="text"
        placeholder="Bill amount $"
        value={inputValue}
        onChange={(e) => {
          const inputValue = e.target.value;
          const numbersOnly = /^[1-9]\d*$/;

          if (!inputValue.match(numbersOnly) && inputValue !== "") {
            if (inputValue[0] === "0") setWarning("Nice try 😎 hhhhhhhhhhh.");
            else setWarning("Please enter numbers only 🤌.");
          } else {
            setInputValue(inputValue);
            setWarning(
              inputValue !== "" ? `The Bill Was : ${inputValue}$ 💸` : ""
            );
            // setWarning("");
          }
        }}
      ></input>
      <div style={{ color: "red" }}>{warning}</div>
    </div>
  );
}
