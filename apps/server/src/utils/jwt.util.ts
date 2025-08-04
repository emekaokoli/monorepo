/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { logger } from './logger';
import {config} from '../../config/default';
const { accessTokenPrivateKey, accessTokenPublicKey } = config;

export function signJwt(object: object, options?: jwt.SignOptions | undefined) {
	try {
		return jwt.sign(object, accessTokenPrivateKey, {
			...(options && options),
			algorithm: 'RS256',
		});
	} catch (error: any) {
		logger.info(`Error signing JWT:, ${error?.message}`);
		throw error;
	}
}

export function verifyJwt(token: string) {
	try {
		const decoded = jwt.verify(token, accessTokenPublicKey);
		return {
			valid: true,
			expired: false,
			decoded,
		};
	} catch (error: unknown) {
		if (error instanceof TokenExpiredError) {
			return {
				valid: false,
				expired: true,
				decoded: null,
			};
		} else if (error instanceof JsonWebTokenError) {
			logger.info(error.message);
			return {
				valid: false,
				expired: false,
				decoded: null,
			};
		} else {
			throw error;
		}
	}
}
