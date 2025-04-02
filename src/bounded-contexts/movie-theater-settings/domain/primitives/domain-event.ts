export abstract class DomainEvent {
    readonly name: string
    readonly ocurredOn: Date

    constructor(name: string) {
        this.name = name
        this.ocurredOn = new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000,
        )
    }
}
