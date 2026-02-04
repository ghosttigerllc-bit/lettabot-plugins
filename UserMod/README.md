# Telegram UserMod

A production-ready Telegram client built specifically for AI agents. Uses MTProto/TDLib to give agents full capabilities as regular Telegram users.

## Why UserMod?

| Feature | Bot API | UserMod (MTProto) |
|---------|---------|-------------------|
| DM anyone first | No | Yes |
| Join groups/channels | Invite only | Yes |
| Read message history | Limited | Full |
| File size limit | 50MB | 2GB |
| Privacy mode in groups | Yes | No |
| Rate limits | Strict | Relaxed |

## Requirements

- Node.js 18+
- Telegram account (phone number)
- API credentials from [my.telegram.org](https://my.telegram.org)

> **Note:** This repo contains TypeScript source files. The `plugin.json` references `index.js` which is generated when you build Lettabot with the plugin installed. See [Installation](../README.md#installation).

## Getting API Credentials

1. Go to [my.telegram.org](https://my.telegram.org)
2. Log in with your phone number
3. Click "API development tools"
4. Create a new application (any name/platform)
5. Copy your `api_id` and `api_hash`

## Configuration

Add to your `.env` file:

```bash
# Required
TELEGRAM_PHONE_NUMBER=+1234567890    # E.164 format
TELEGRAM_API_ID=12345678
TELEGRAM_API_HASH=abcdef1234567890abcdef1234567890

# Optional
TELEGRAM_DM_POLICY=pairing           # pairing (default), allowlist, or open
TELEGRAM_GROUP_POLICY=both           # mention, reply, both (default), or off
TELEGRAM_ADMIN_CHAT_ID=123456789     # For pairing request notifications
TELEGRAM_MTPROTO_DB_DIR=./data/telegram-mtproto
```

## DM Policies

Control who can message your agent:

| Policy | Behavior |
|--------|----------|
| `pairing` | Users must complete pairing flow (default, recommended) |
| `allowlist` | Only users in `TELEGRAM_ALLOWED_USERS` can message |
| `open` | Anyone can message (use with caution) |

### Pairing Flow

When `dmPolicy=pairing`, new users receive:

```
Hi! I don't recognize you yet. Send me a pairing code to connect.
Reply with: PAIR <code>
```

Generate codes via Lettabot CLI:
```bash
lettabot pairing generate --tier friend
```

### Allowlist

Set allowed Telegram user IDs (comma-separated):
```bash
TELEGRAM_ALLOWED_USERS=123456789,987654321
```

## Group Policies

Control when the agent responds in groups:

| Policy | Responds to |
|--------|-------------|
| `mention` | @mentions only |
| `reply` | Replies to agent's messages only |
| `both` | Both mentions and replies (default) |
| `off` | Never responds in groups |

## First Run

On first run, you'll be prompted to authenticate:

1. **Phone verification**: Enter the code sent to your Telegram
2. **2FA password**: If enabled, enter your password (hidden input)

Session is persisted in `TELEGRAM_MTPROTO_DB_DIR` - you won't need to re-authenticate unless the session expires.

## Trust Tiers

UserMod integrates with Lettabot's trust tier system:

| Tier | Level | Description |
|------|-------|-------------|
| `owner` | 100 | Full control |
| `special` | 90 | Privileged access |
| `besties` | 80 | Close friends |
| `admin` | 70 | Administrative access |
| `trusted` | 50 | Verified users |
| `friend` | 30 | Known users |
| `acquaintance` | 20 | Met before |
| `stranger` | 10 | Unknown (default) |

Tiers affect tool permissions and response behavior.

## Security Notes

- **Session files** (`data/telegram-mtproto/`) contain auth credentials - add to `.gitignore`
- **2FA passwords** are entered via hidden input (not echoed to terminal)
- **API credentials** should never be committed - use environment variables
- **Pairing codes** are single-use and expire

## Limitations

Current version does not support:
- Message editing (planned)
- Media attachments (planned)
- Voice messages
- Stickers/GIFs

## License

Apache-2.0
