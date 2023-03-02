import { Router } from 'express';
import userRouter from './user';


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/user', userRouter);

// Export default.
export default baseRouter;
