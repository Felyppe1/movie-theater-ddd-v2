import { PubSub } from '@google-cloud/pubsub'
import { EventBus } from '../../../application/interfaces/event-bus'

export class GCPPubSub implements EventBus {
    private pubSub: PubSub

    constructor() {
        this.pubSub = new PubSub({
            projectId: process.env.PROJECT_ID,
            keyFilename: 'sa-key.json',
        })
    }

    async publish(topic: string, message: object): Promise<void> {
        const topicRef = this.pubSub.topic(topic)
        const bufferMessage = Buffer.from(JSON.stringify(message))

        await topicRef.publishMessage({ data: bufferMessage })
        console.log(`Publishing on topic ${topic}:`, message)
    }

    async subscribe(
        subscriptionName: string,
        handler: (message: object) => void,
    ): Promise<void> {
        const subscription = this.pubSub.subscription(subscriptionName)

        subscription.on('message', message => {
            const data = JSON.parse(message.data.toString())
            handler(data)
            message.ack()
        })

        console.log(
            `Listening to messages with the subscription name ${subscriptionName}`,
        )
    }
}
