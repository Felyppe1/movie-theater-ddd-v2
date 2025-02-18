import { Router } from 'express'
import { PrismaTechnologiesRepository } from '../../databases/prisma/prisma-technologies-repository'
import { CreateTechnologyController } from '../../../interface-adapters/controllers/create-technology-controller'
import { ExpressResponseAdapter } from './express-response-adapter'

export const technologiesRouter = Router()

technologiesRouter.post('/', async (req, res) => {
    const technologiesRepository = new PrismaTechnologiesRepository()

    const createTechnologyController = new CreateTechnologyController(
        technologiesRepository,
    )

    const expressResponseAdapter = new ExpressResponseAdapter(res)

    await createTechnologyController.handle(
        {
            body: req.body,
        },
        expressResponseAdapter,
    )
})
