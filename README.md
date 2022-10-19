<p>
  <img width="100%" src="https://assets.solidjs.com/banner?project=solid-turnstile" alt="solid-named-router">
</p>

# solid-turnstile

☘ A solidjs component of progress bar, the custom colors are supported. Inspired by [vue3-progress](https://github.com/tangyouge/vue3-progress) but for [Solidjs](https://solidjs.com).

[![release](https://github.com/Xhofe/solid-turnstile/actions/workflows/release.yml/badge.svg)](https://github.com/Xhofe/solid-turnstile/actions/workflows/release.yml)
[![npm](https://img.shields.io/npm/dm/solid-turnstile.svg)](https://www.npmjs.com/package/solid-turnstile)
[![npm](https://img.shields.io/npm/v/solid-turnstile.svg)](https://www.npmjs.com/package/solid-turnstile)
[![license](https://img.shields.io/github/license/Xhofe/solid-turnstile.svg)](https://github.com/Xhofe/solid-turnstile/blob/main/LICENSE)
[![sponsor](https://img.shields.io/badge/%24-sponsor-F87171.svg)](https://sp.nn.ci/)

## Installation

```bash
pnpm add solid-turnstile
```

## Demo

<https://xhofe.github.io/solid-turnstile/>

## Usage

```tsx
import { Component } from "solid-turnstile";

const App = () => {
  const [shown, setShown] = createSignal(true);
  return (
    <div>
      <Component />
    </div>
  );
};
export default App;
```
