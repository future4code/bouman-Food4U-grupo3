export class User {
    constructor(
        private id: string,
        private name: string,
        private birthDate: Date,
        private email: string,
        private password: string
    ) { }

    public getId(): string {
        return this.id
    }

    public setId(id: string) {
        this.id = id
    }

    public getName(): string {
        return this.name
    }

    public setName(name: string) {
        this.name = name
    }

    public getBirthDate(): Date {
        return this.birthDate
    }

    public setBirthDate(birthDate: Date) {
        this.birthDate = birthDate
    }

    public getEmail(): string {
        return this.email
    }

    public setEmail(email: string) {
        this.email = email
    }

    public getPassword(): string {
        return this.password
    }

    public setPassword(password: string) {
        this.password = password
    }
}