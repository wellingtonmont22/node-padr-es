class User {
    name: string;
    email: string;

    constructor(name: string, email: string) {
        this.name = name;
        this.email = email;
    }

    clone(): User {
        return new User(this.name, this.email);
    }
}

const user1 = new User("John Doe", "john@example.com");
const user2 = user1.clone();

console.log(user1);
console.log(user2);