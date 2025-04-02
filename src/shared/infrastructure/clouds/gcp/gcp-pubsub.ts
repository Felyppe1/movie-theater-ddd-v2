import { PubSub as GCPubSub } from '@google-cloud/pubsub'
import { PubSub } from '../../../application/interfaces/pub-sub'

export class GCPPubSub implements PubSub {
    private pubSub: GCPubSub

    constructor() {
        this.pubSub = new GCPubSub({
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
