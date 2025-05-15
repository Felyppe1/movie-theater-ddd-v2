import { Prisma, PrismaClient } from '@prisma/client'
import { AggregateRoot } from '../../../domain/primitives/aggregate-root'
import { Technology } from '../../../domain/core/technology'

export class PrismaUnitOfWork {
    private newObjects = new Set<AggregateRoot>()
    private dirtyObjects = new Set<AggregateRoot>()
    private removedObjects = new Set<AggregateRoot>()

    constructor(private prisma: PrismaClient) {}

    registerNew(entity: AggregateRoot) {
        this.newObjects.add(entity)
    }

    registerDirty(entity: AggregateRoot) {
        if (!this.newObjects.has(entity)) {
            this.dirtyObjects.add(entity)
        }
    }

    registerRemoved(entity: AggregateRoot) {
        if (this.newObjects.delete(entity)) return
        this.dirtyObjects.delete(entity)
        this.removedObjects.add(entity)
    }

    async commit() {
        await this.prisma.$transaction(async tx => {
            await this.insertNew(tx)
            await this.updateDirty(tx)
            await this.deleteRemoved(tx)
        })

        this.newObjects.clear()
        this.dirtyObjects.clear()
        this.removedObjects.clear()
    }

    private async insertNew(tx: Prisma.TransactionClient) {
        for (const obj of this.newObjects) {
            const mapper = MapperRegistry.getMapper(obj.constructor.name)
            await mapper.insert(obj, tx)
        }
    }

    private async updateDirty(tx: Prisma.TransactionClient) {
        for (const obj of this.dirtyObjects) {
            const mapper = MapperRegistry.getMapper(obj.constructor.name)
            await mapper.update(obj, tx)
        }
    }

    private async deleteRemoved(tx: Prisma.TransactionClient) {
        for (const obj of this.removedObjects) {
            const mapper = MapperRegistry.getMapper(obj.constructor.name)
            await mapper.delete(obj, tx)
        }
    }
}

export class TechnologyMapper {
    async insert(technology: Technology, tx: PrismaClient) {
        await tx.technology.create({ data: technology.export() })
    }

    async update(technology: Technology, tx: PrismaClient) {
        const { id, ...user } = technology.export()

        await tx.technology.update({
            where: { id },
            data: user,
        })
    }

    async delete(technology: Technology, tx: PrismaClient) {
        const { id } = technology.export()

        await tx.technology.delete({ where: { id } })
    }
}

const mappers: Record<string, any> = {
    Technology: new TechnologyMapper(),
}

export class MapperRegistry {
    static getMapper(className: string) {
        const mapper = mappers[className]
        if (!mapper) throw new Error(`No mapper registered for ${className}`)
        return mapper
    }
}
