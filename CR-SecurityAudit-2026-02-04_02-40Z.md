# Lettabot Plugins — Code Review & Security Audit (UserMod / Telegram MTProto)

- Repo: "/data/workspaces/aoshi/lettabot-plugins"
- Audit time (UTC): 2026-02-04_02-40Z
- HEAD: 064a87468be09b2425372c3e8fdf061106f3fe66 2026-02-03 18:40:52 -0800

## Scope

- Reviewed `UserMod/*` for the previously identified security blockers:
  - 2FA password echo on terminal
  - TDLib int64 ID safety
- Ran targeted secret scan for common token/key patterns.

## Security Findings

### 1) 2FA password echo to terminal (FIXED)

- File: `UserMod/adapter.ts`
- Password prompt now uses a raw-mode hidden input path (`promptHiddenInput`) rather than `readline.question`.
- Relevant entry points:
  - `promptForInput('password')`
  - `promptHiddenInput()`

### 2) TDLib int64 chat ID safety (FIXED)

- File: `UserMod/adapter.ts`
- `safeChatId()` now uses `BigInt(chatId)` and throws on invalid input.
- `safeMessageId()` throws if the ID exceeds JS safe integer bounds.

## Packaging / Production Readiness (BLOCKER TO VERIFY BEFORE PR)

- `UserMod/plugin.json` declares `"main": "index.js"`.
- In this checkout, there is **no** `index.js` present under `UserMod/`.

Detected `index.js` paths:

```
<none>
```

**Action:** ensure the PR includes a build step that produces the JS entrypoint (or ships compiled artifacts) consistent with `plugin.json`.

## Secret / Credential Hygiene

- Targeted scan did not find real-looking keys/tokens in this repo.

## Bottom Line

- The two previously-blocking security issues (2FA password echo + int64 safety) appear fixed.
- Verify production packaging: `plugin.json` must match shipped artifacts (`index.js`).
