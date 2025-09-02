import { User } from "../models/User";


export class UserRepository {
  createUser(data: Partial<User>) {
    return User.create(data);
  }
  getAllUsers() {
    return User.findAll();
  }
  getUserById(id: number) {
    return User.findByPk(id);
  }
}
