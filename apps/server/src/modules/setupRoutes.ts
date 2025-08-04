import { Response, type Application } from 'express';
import { ResponseBuilder } from '../../../../packages/utils/responseBuilder';
import { router as AppRoutes } from '../routes';

export const setUpRoutes = (app: Application) => {
  app.get('/healthcheck', (_, res: Response) => {
    res.sendStatus(200);
  });

  app.use('/api/v1/', AppRoutes);

  app.use('/*splat', (_, res) => {
		ResponseBuilder.failure(res, 404, 'It seems you are lost 😉, Route does not exit');
	});
};
