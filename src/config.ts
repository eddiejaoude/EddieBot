import { AxiosRequestConfig } from 'axios';
import { MessageEmbed } from 'discord.js';
import * as dotenv from 'dotenv';

// Use dotenv to find system variables or a .env file.
dotenv.config();

export default {
  BIO: [
    'description',
    'github',
    'twitter',
    'youtube',
    'instagram',
    'linkedin',
    'location',
    'timezone',
    'delete',
  ],
  COMMAND_PREFIX: process.env.COMMAND_PREFIX || '$',
  COOLDOWN_SECONDS: 2,
  INTRO_CHANNEL: 'introductions',
  GENERAL_CHANNEL: 'general',
  BOT_CHANNEL_ID: process.env.DISCORD_BOT_CHANNEL_ID,
  REACTIONS_COUNT: 5,
  ROLE: {
    HIGH_VALUE: {
      name: 'high value',
      description:
        'Members with this role have access to more commands to moderate the server (e.g. ban). You get assigned this role if you have a message with +5 reactions',
    },
    BIO: {
      name: 'bio',
      description:
        'You get assigned this role once you set a biography with the "bio" command',
    },
    OPEN_SOURCE: {
      name: 'opensource',
      description:
        'You can assign this role to yourself to subscribe to get open-source reminders and if you like contributing to open-source software',
    },
  },
  defaultEmbed: () => {
    return new MessageEmbed()
      .setColor('#0099ff')
      .setTimestamp()
      .setFooter(
        'Our bot is Open Source, you can find it here https://github.com/EddieJaoudeCommunity/EddieBot'
      );
  },
  TIMEZONES: [
    { abbr: 'PDT', zone: 'America/Los_Angeles' },
    { abbr: 'AEST', zone: 'Australia/Brisbane' },
    { abbr: 'KST', zone: 'Asia/Seoul' },
    { abbr: 'EEST', zone: 'Asia/Beirut' },
    { abbr: 'UTC', zone: 'Europe/London' },
    { abbr: 'UK', zone: 'Europe/London' },
    { abbr: 'CEST', zone: 'Europe/Stockholm' },
    // winter timezone of Finland +1h
    { abbr: 'EET', zone: 'Europe/Finland' },
    // summer timezone of Finland -1h
    { abbr: 'EEST', zone: 'Europe/Finland' },
    { abbr: 'IST', zone: 'Asia/Kolkata' },
  ],
  OPENSOURCE_JOB_CRON_TIME:
    process.env.OPENSOURCE_JOB_CRON_TIME || '0 14 * * *', // Default time is everyday at 2pm
  TIPS: {
    directory: './tips',
    tips: ['openSourceTips.md', 'githubTips.md'],
    resources: ['openSourceResources.md'],
  },
};

// Possible values for user subscriptions
export enum UserSubscriptions {
  OPEN_SOURCE = 'OPENSOURCE',
}

export const selfAssignableRoles = [
  'php',
  'laravel',
  'javascript',
  'angular',
  'react',
  'vue',
  'java',
  'ruby',
  'python',
  'ops',
  'fullstack',
  'flutter',
  'typescript',
  'opensource',
  'svelte',
];

export const issueRequestConfig: AxiosRequestConfig = {
  url: `https://api.github.com/search/repositories`,
};

if (process.env.GITHUB_TOKEN) {
  issueRequestConfig.headers = {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  };
}
