# Lettabot Plugins - Agent Instructions

This repository contains community plugins for [Lettabot](https://github.com/letta-ai/lettabot).

## Repository Structure

```
lettabot-plugins/
├── README.md           # User-facing documentation
├── AGENTS.md           # You are here
└── UserMod/            # Telegram MTProto plugin
    ├── README.md       # Plugin documentation
    ├── plugin.json     # Plugin manifest
    ├── index.ts        # Entry point (exports adapter)
    ├── adapter.ts      # Main implementation
    └── format.ts       # Message formatting utilities
```

## Important: Source Distribution

This repo contains **TypeScript source files**, not compiled JavaScript. Plugins are designed to be:

1. Copied into Lettabot's `plugins/` directory
2. Compiled alongside Lettabot via `npm run build`
3. The `plugin.json` references `index.js` which is generated during compilation

Do NOT try to build this repo standalone - it imports types from Lettabot core.

## Plugin Architecture

### Plugin Types

- `channel` - Messaging adapters (Telegram, Discord, etc.)
- `ui` - Web interface plugins

### Plugin Manifest (plugin.json)

```json
{
  "name": "Human-readable name",
  "id": "unique-kebab-case-id",
  "version": "1.0.0",
  "type": "channel",
  "main": "index.js",
  "requires": {
    "env": ["REQUIRED_ENV_VARS"]
  }
}
```

### Channel Adapter Interface

```typescript
interface ChannelAdapter {
  readonly id: string;
  readonly name: string;
  onMessage?: (msg: InboundMessage) => Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
  send(msg: OutboundMessage): Promise<void>;
}
```

## UserMod Plugin

Telegram MTProto client for AI agents. Key files:

- **adapter.ts** - TDLib client, authentication flow, message handling
- **format.ts** - Markdown to TDLib entity conversion (UTF-16 offsets)
- **index.ts** - Exports `createAdapter()` factory function

### Security Considerations

- 2FA passwords use hidden input (raw terminal mode)
- Chat IDs use BigInt for int64 safety
- Message IDs validated with Number.isSafeInteger()
- Session files should be gitignored

### DM Policies

- `pairing` - Users must complete pairing flow (default)
- `allowlist` - Only pre-approved user IDs
- `open` - Anyone can message (use with caution)

## Contributing

When adding new plugins:

1. Create `PluginName/` directory with plugin.json, index.ts, README.md
2. Export a factory function: `createAdapter(config): ChannelAdapter`
3. Use environment variables for secrets (document in plugin.json requires.env)
4. Add plugin to main README.md's Available Plugins section
5. Test by copying to a Lettabot instance and rebuilding

## Do Not

- Commit secrets, API keys, or session files
- Add compiled .js files (source only)
- Create standalone build configurations (plugins build with Lettabot)
