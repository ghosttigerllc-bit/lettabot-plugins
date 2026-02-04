# Lettabot Plugins

Community plugins for [Lettabot](https://github.com/letta-ai/lettabot).

## Available Plugins

### UserMod (Telegram MTProto)
Full Telegram user capabilities via MTProto/TDLib. Act as a real Telegram user, not just a bot.

**Features:**
- Join groups and channels
- Read message history
- Reply to any message
- Full user presence
- Pairing system for DM access control

## Installation

Plugins are source files that get compiled with Lettabot:

```bash
# Clone lettabot (if you haven't already)
git clone https://github.com/letta-ai/lettabot.git
cd lettabot

# Clone plugins repo
git clone https://github.com/ghosttigerllc-bit/lettabot-plugins.git

# Copy plugin to lettabot's plugins directory
cp -r lettabot-plugins/UserMod plugins/

# Install plugin dependencies
npm install tdl prebuilt-tdlib

# Rebuild lettabot (compiles plugins)
npm run build
```

## Configuration

See each plugin's README for configuration details:
- [UserMod Configuration](./UserMod/README.md)

## Plugin Development

Plugins are TypeScript modules that import from Lettabot's core:

```typescript
import type { ChannelAdapter } from '../../src/channels/types.js';
```

They get compiled alongside Lettabot when you run `npm run build`.

### Plugin Structure

```
plugins/
└── YourPlugin/
    ├── plugin.json    # Manifest (name, version, type, main)
    ├── index.ts       # Entry point (exports adapter/plugin)
    └── *.ts           # Implementation files
```

### Plugin Types

- `channel` - Messaging channel adapters (Telegram, Discord, etc.)
- `ui` - Web interface plugins (The Bridge, dashboards)

## Requirements

Requires Lettabot with plugin system support (PR pending upstream).

## License

Apache-2.0
