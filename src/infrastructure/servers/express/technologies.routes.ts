import { Router } from 'express'
import { PrismaTechnologiesRepository } from '../../databases/prisma/prisma-technologies-repository'
import {
    CreateTechnologyController,
    CreateTechnologyControllerInput,
} from '../../../interface-adapters/controllers/create-technology-controller'
import {
    normalizeExpressRequest,
    ExpressResponseAdapter,
} from './express-adapters'

export const technologiesRouter = Router()

technologiesRouter.post('/', async (req, res) => {
    const technologiesRepository = new PrismaTechnologiesRepository()

    const createTechnologyController = new CreateTechnologyController(
        technologiesRepository,
    )

    const normalizedRequest =
        normalizeExpressRequest<CreateTechnologyControllerInput>(req)
    const expressResponseAdapter = new ExpressResponseAdapter(res)

    await createTechnologyController.handle(
        normalizedRequest,
        expressResponseAdapter,
    )
})
