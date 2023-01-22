<p>
  <img width="100%" src="https://assets.solidjs.com/banner?project=solid-turnstile" alt="solid-turnstile">
</p>

# solid-turnstile

🔐 A very simple Solid library for [Cloudflare Turnstile](https://challenges.cloudflare.com). Inspired by [react-turnstile](https://www.npmjs.com/package/react-turnstile)

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
import Turnstile from "solid-turnstile";

function TurnstileWidget() {
  return (
    <Turnstile
      sitekey="1x00000000000000000000AA"
      onVerify={(token) => alert(token)}
    />
  );
}
```

## Documentation

Turnstile takes the following arguments:

| name              | type    | description                                   |
| ----------------- | ------- | --------------------------------------------- |
| sitekey           | string  | sitekey of your website (REQUIRED)            |
| action            | string  | -                                             |
| cData             | string  | -                                             |
| theme             | string  | one of "light", "dark", "auto"                |
| tabIndex          | number  | -                                             |
| responseField     | boolean | controls generation of `<input />` element \* |
| responseFieldName | string  | changes the name of `<input />` element \*    |

Add others props to `<div />` element.

And the following callbacks:

| name     | arguments | description                                |
| -------- | --------- | ------------------------------------------ |
| onVerify | token     | called when challenge is passed (REQUIRED) |
| onLoad   | -         | called when the widget is loaded           |
| onError  | error     | called when an error occurs                |
| onExpire | -         | called when the challenge expires \*\*     |

\* responseField and responseFieldName are experimental and not yet documented.

\*\* `onExpire` is called when the Turnstile challenge expires without creating a token.

For more details on what each argument does, see the [Cloudflare Documentation](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations).
