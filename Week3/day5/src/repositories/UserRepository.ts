import { User } from "../models/User";


export class UserRepository {
  async createUser(data: Partial<User>) {
    return await User.create(data);
  }
  async getAllUsers() {
    return await User.findAll();
  }
  async getUserById(id: number) {
    return await User.findByPk(id);
  }
}
