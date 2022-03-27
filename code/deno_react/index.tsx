import React from "https://esm.sh/react@17";
import ReactDOM from "https://esm.sh/react-dom@17";

const App: React.FC = () => {
  const [counter, setCounter] = React.useState(0);

  return (
    <>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter - 1)}>Decrease</button>
      <button onClick={() => setCounter(counter + 1)}>Increase</button>
    </>
  );
};

const app = document.getElementById("app");
ReactDOM.render(<App />, app);
