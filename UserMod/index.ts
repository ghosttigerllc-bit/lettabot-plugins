/**
 * Telegram MTProto Plugin Entry Point
 *
 * This is the plugin entry point that exports the createAdapter factory function.
 * The plugin loader will call this function with resolved configuration.
 */

import { TelegramMTProtoAdapter } from './adapter.js';
import type { ChannelAdapter } from '../../src/channels/types.js';

export interface PluginConfig {
  phoneNumber: string;
  apiId: number;
  apiHash: string;
  databaseDirectory?: string;
  dmPolicy?: 'pairing' | 'allowlist' | 'open';
  allowedUsers?: number[];
  groupPolicy?: 'mention' | 'reply' | 'both' | 'off';
  adminChatId?: number;
}

/**
 * Create the Telegram MTProto adapter
 *
 * This function is called by the plugin loader with resolved configuration.
 */
export function createAdapter(config: Record<string, unknown>): ChannelAdapter {
  // Validate required config
  if (!config.phoneNumber) {
    throw new Error('TELEGRAM_PHONE_NUMBER is required');
  }
  if (!config.apiId) {
    throw new Error('TELEGRAM_API_ID is required');
  }
  if (!config.apiHash) {
    throw new Error('TELEGRAM_API_HASH is required');
  }

  // Convert allowedUsers from string array to number array if needed
  let allowedUsers: number[] | undefined;
  if (config.allowedUsers) {
    if (Array.isArray(config.allowedUsers)) {
      allowedUsers = config.allowedUsers.map((id: string | number) =>
        typeof id === 'string' ? parseInt(id, 10) : id
      ).filter((id: number) => !isNaN(id));
    }
  }

  return new TelegramMTProtoAdapter({
    phoneNumber: config.phoneNumber as string,
    apiId: typeof config.apiId === 'string' ? parseInt(config.apiId as string, 10) : config.apiId as number,
    apiHash: config.apiHash as string,
    databaseDirectory: config.databaseDirectory as string | undefined,
    dmPolicy: config.dmPolicy as 'pairing' | 'allowlist' | 'open' | undefined,
    allowedUsers,
    groupPolicy: config.groupPolicy as 'mention' | 'reply' | 'both' | 'off' | undefined,
    adminChatId: typeof config.adminChatId === 'string'
      ? parseInt(config.adminChatId as string, 10)
      : config.adminChatId as number | undefined,
  });
}

// Default export for plugin loader
export default createAdapter;

// Re-export types for consumers
export { TelegramMTProtoAdapter } from './adapter.js';
export type { GroupPolicy, TelegramMTProtoConfig } from './adapter.js';
