export interface EventBus {
    publish(topic: string, message: object): Promise<void>
    subscribe(topic: string, handler: (message: object) => void): Promise<void>
}
