import { Router } from 'express';
import messagerRoutes from './messager.route';

export default (app: { use: (arg0: string, arg1: Router) => void; }) => {
  app.use('', messagerRoutes);
};
