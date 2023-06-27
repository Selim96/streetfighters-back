import { userRepository } from "../repositories/userRepository.js";

class UserService {
  // TODO: Implement methods to work with user
  search(search) {
    const item = userRepository.getOne(search);
    if (!item) return null;
    return item;
  };

  getAllUsers() {
    const result = userRepository.getAll();
    if (!result) return null;
    return result;
  };

  addUser(data) {
    const result = userRepository.create(data);
    if (!result) return null;
    return result;
  };

  updateUser(id, dataToUpdate) {
    const result = userRepository.update(id, dataToUpdate);
    if (!result) return null;
    return result;
  };

  deleteUser(id) {
    const result = userRepository.delete(id);
    if (!result) return null;
    return result;
  };
}

const userService = new UserService();

export { userService };
