import { fighterRepository } from "../repositories/fighterRepository.js";

class FighterService {
  // TODO: Implement methods to work with fighters
  getOne(search) {
    const item = fighterRepository.getOne(search);
    if (!item) return null;
    return item;
  };

  getAll() {
    const result = fighterRepository.getAll();
    if (!result) return null;
    return result;
  };

  add(data) {
    const result = fighterRepository.create(data);
    if (!result) return null;
    return result;
  };

  update(id, dataToUpdate) {
    const result = fighterRepository.update(id, dataToUpdate);
    if (!result) return null;
    return result;
  };

  delete(id) {
    const result = fighterRepository.delete(id);
    if (!result) return null;
    return result;
  };
}

const fighterService = new FighterService();

export { fighterService };
