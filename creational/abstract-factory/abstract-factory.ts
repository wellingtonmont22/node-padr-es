// Interfaces da "família" de objetos
interface UserRepository {
  findUser(id: string): string;
}
interface TokenService {
  generateToken(): string;
}

// Implementação para MongoDB
class MongoUserRepository implements UserRepository {
  findUser(id: string) {
    return `Usuário Mongo: ${id}`;
  }
}
class MongoTokenService implements TokenService {
  generateToken() {
    return "token_mongo_xyz";
  }
}

// Implementação para PostgreSQL
class PostgresUserRepository implements UserRepository {
  findUser(id: string) {
    return `Usuário Postgres: ${id}`;
  }
}
class PostgresTokenService implements TokenService {
  generateToken() {
    return "token_postgres_abc";
  }
}

// Abstract Factory
interface AuthFactory {
  createUserRepository(): UserRepository;
  createTokenService(): TokenService;
}

// Fábricas concretas
class MongoAuthFactory implements AuthFactory {
  createUserRepository() {
    return new MongoUserRepository();
  }
  createTokenService() {
    return new MongoTokenService();
  }
}

class PostgresAuthFactory implements AuthFactory {
  createUserRepository() {
    return new PostgresUserRepository();
  }
  createTokenService() {
    return new PostgresTokenService();
  }
}

// Uso
function authFlow(factory: AuthFactory) {
  const userRepo = factory.createUserRepository();
  const tokenSvc = factory.createTokenService();

  console.log(userRepo.findUser("123"));
  console.log(tokenSvc.generateToken());
}

const factory = new PostgresAuthFactory();
authFlow(factory);
