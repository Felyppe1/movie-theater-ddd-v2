import { Router } from 'express'
import { PrismaTechnologiesRepository } from '../../databases/prisma/prisma-technologies-repository'
import { CreateTechnologyController } from '../../../interface-adapters/controllers/create-technology-controller'

export const technologiesRouter = Router()

technologiesRouter.post('/', async (req, res) => {
    const technologiesRepository = new PrismaTechnologiesRepository()

    const createTechnologyController = new CreateTechnologyController(
        technologiesRepository,
    )

    const response = await createTechnologyController.handle({
        body: req.body,
    })

    res.status(response.status).json(response.body)
})
