import { URL } from 'url';
import { TailRecord } from '../models/tail/record';

const categories = [
    'gaming',
    'event',
    'education',
    'meme',
    'stablecoin',
    'wrapped',
    'platform',
];

const validateUrl = (name: string, url: string | undefined) => {
    if (url) {
        if (url.length > 200) {
            throw new Error(`${name} URL must be <= 200 characters`);
        }

        try {
            new URL(url);
        } catch (err) {
            throw new Error(`${name} URL is invalid`);
        }
    }
};

// Rules for validating a TailRecord
export const validateTailRecord = (tailRecord: TailRecord) => {
    if (tailRecord.hash.length !== 64) {
        throw new Error('Hash must be 64 characters')
    }

    if (tailRecord.name.length < 1 || tailRecord.name.length > 100) {
        throw new Error('Name must have length between 1 and 100');
    }

    if (tailRecord.code.length < 1 || tailRecord.code.length > 5) {
        throw new Error('Currency code must have length between 1 and 5');
    }

    if (tailRecord.description.length < 20 || tailRecord.description.length > 5000) {
        throw new Error('Description must have length between 20 and 5000');
    }

    if (!categories.includes(tailRecord.category)) {
        throw new Error(`Invalid category. Must be one of: ${categories.join(',')}`);
    }

    if (tailRecord.launcherId.length !== 64) {
        throw new Error('Launcher ID must be 64 characters')
    }

    if (tailRecord.eveCoinId.length !== 64) {
        throw new Error('Eve Coin ID must be 64 characters')
    }

    validateUrl('Website', tailRecord.website_url);
    validateUrl('Discord', tailRecord.discord_url);
    validateUrl('Twitter', tailRecord.twitter_url);
}

/**
 * Parses array of TailRecords in line with "Tail Database Standard". Discards any invalid data.
 *
 * - Only one entry per TAIL hash is allowed
 * - First instance of currency code is the valid entry
 */
export const parseTailRecords = (tailRecords: TailRecord[]) => {};