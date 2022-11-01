import { TailRecord } from '../models/tail/record';
import { validateTailRecord } from './data_validation';

describe('Tail Database Data Validation', () => {
    describe('validateTailRecord', () => {
        const validTailRecord: TailRecord = {
            hash: '7108b478ac51f79b6ebf8ce40fa695e6eb6bef654a657d2694f1183deb78cc02',
            name: 'Green App Development',
            code: 'GAD',
            category: 'platform',
            description: 'Ecosystem of products for Chia network.',
            launcherId: '5178fee53abdb8a54b43d0018ee399cb815f4198440d6ecd2bc11991e136c011',
            eveCoinId: '434f9c949ac6a6e314d44d17238664bf190cabc8dfea0d33cf3e8914300ffbc3',
            website_url: 'https://www.bbc.co.uk/news',
            discord_url: 'https://discord.com/channels/876447283271569428/947543800891473940',
            twitter_url: 'https://twitter.com/RishiSunak',
        };

        it('doesn\'t throw error when TailRecord is valid', () => {
            expect(validateTailRecord(validTailRecord)).toBe(undefined);
        });

        it('rejects hash that is less than 64 characters in length', () => {
            expect(() => validateTailRecord({
                ...validTailRecord,
                hash: 'a'
            })).toThrowError('Hash must be 64 characters');
        });

        it('rejects hash that is over 64 characters in length', () => {
            expect(() => validateTailRecord({
                ...validTailRecord,
                hash: validTailRecord.hash + 'a'
            })).toThrowError('Hash must be 64 characters');
        });

        it('rejects empty name', () => {
            expect(() => validateTailRecord({
                ...validTailRecord,
                name: ''
            })).toThrowError('Name must have length between 1 and 100');
        });

        it('rejects name that is greater than 100 characters in length', () => {
            expect(() => validateTailRecord({
                ...validTailRecord,
                name:  new Array(102).join('.')
            })).toThrowError('Name must have length between 1 and 100');
        });

        it('rejects empty code', () => {
            expect(() => validateTailRecord({
                ...validTailRecord,
                code: ''
            })).toThrowError('Currency code must have length between 1 and 5');
        });

        it('rejects code greater than 5 characters in length', () => {
            expect(() => validateTailRecord({
                ...validTailRecord,
                code: 'AAAAAB'
            })).toThrowError('Currency code must have length between 1 and 5');
        });

        it('rejects invalid category', () => {
            expect(() => validateTailRecord({
                ...validTailRecord,
                category: 'food'
            })).toThrowError('Invalid category. Must be one of: gaming,event,education,meme,stablecoin,wrapped,platform');
        });

        it('rejects Launcher ID that is less than 64 characters in length', () => {
            expect(() => validateTailRecord({
                ...validTailRecord,
                launcherId: 'a'
            })).toThrowError('Launcher ID must be 64 characters');
        });

        it('rejects Launcher ID that is over 64 characters in length', () => {
            expect(() => validateTailRecord({
                ...validTailRecord,
                launcherId: validTailRecord.launcherId + 'a'
            })).toThrowError('Launcher ID must be 64 characters');
        });

        it('rejects Eve Coin ID that is less than 64 characters in length', () => {
            expect(() => validateTailRecord({
                ...validTailRecord,
                eveCoinId: 'a'
            })).toThrowError('Eve Coin ID must be 64 characters');
        });

        it('rejects Eve Coin ID that is over 64 characters in length', () => {
            expect(() => validateTailRecord({
                ...validTailRecord,
                eveCoinId: validTailRecord.eveCoinId + 'a'
            })).toThrowError('Eve Coin ID must be 64 characters');
        });

        it('rejects invalid Website URL', () => {
            expect(() => validateTailRecord({
                ...validTailRecord,
                website_url: 'google'
            })).toThrowError('Website URL is invalid');
        });

        it('rejects invalid Twitter URL', () => {
            expect(() => validateTailRecord({
                ...validTailRecord,
                twitter_url: 'google'
            })).toThrowError('Twitter URL is invalid');
        });

        it('rejects invalid Discord URL', () => {
            expect(() => validateTailRecord({
                ...validTailRecord,
                discord_url: 'google'
            })).toThrowError('Discord URL is invalid');
        });
    });
});