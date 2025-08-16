import { Router } from 'express';

const userRelationsRouter = Router();

// /users/:id/bookings
userRelationsRouter.get('/:id/bookings', (req, res) => res.json([]));

export default userRelationsRouter;
