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

Copy the plugin folder to your Lettabot's `plugins/` directory:

```bash
# Clone this repo
git clone https://github.com/ghosttigerllc-bit/lettabot-plugins.git

# Copy desired plugin
cp -r lettabot-plugins/UserMod ~/.lettabot/plugins/
```

## Configuration

See each plugin's README for configuration details:
- [UserMod Configuration](./UserMod/README.md)

## Requirements

Requires Lettabot with plugin system support.

## License

Apache-2.0
