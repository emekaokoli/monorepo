
import { DomainError } from '@packages/utils/error';
import { ResponseBuilder } from '@packages/utils/responseBuilder';
import { type ErrorRequestHandler, type NextFunction, type Request, type Response } from 'express';

export function errorHandler(): ErrorRequestHandler {
	return (err: Error, _req: Request, res: Response, _next: NextFunction) => {
		if (err instanceof DomainError) {
			return ResponseBuilder.failure(res, err.statusCode, err.message);
		}

		return ResponseBuilder.failure(res, 500, 'Internal server error');
	};
}
