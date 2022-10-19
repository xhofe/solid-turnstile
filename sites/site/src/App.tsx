import { Component, createSignal, For } from "solid-js";
import Turnstile, { TurnstileProps } from "solid-turnstile";

const App: Component = () => {
  const [theme, setTheme] = createSignal<TurnstileProps["theme"]>("auto");
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        "flex-direction": "column",
        "row-gap": "4px",
        "justify-content": "center",
        "align-items": "center",
      }}
    >
      <Turnstile
        sitekey="1x00000000000000000000AA"
        onVerify={(token) => alert(token)}
        theme={theme()}
      />
      <div>
        <select
          onChange={(e) => {
            setTheme(e.currentTarget.value as TurnstileProps["theme"]);
          }}
          style={{
            "font-family": "sans-serif",
            padding: "4px",
            "border-radius": "4px",
          }}
        >
          <For each={["auto", "light", "dark"]}>
            {(item) => {
              return <option value={item}>{item}</option>;
            }}
          </For>
        </select>
      </div>
    </div>
  );
};

export default App;
