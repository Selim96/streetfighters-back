import { Router } from "express";
import { userService } from "../services/userService.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

// TODO: Implement route controllers for user
router.get('/', (req, res, next) => {
  try {
    const data = userService.getAllUsers();
      res.data = data;
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.get('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const data = userService.search({id});
      res.data = data;
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('/', createUserValid, (req, res, next) => {
  try {
    if (res.err) {
      return;
    }
    const { email, phoneNumber } = req.body;
    const existEmail = userService.search({ email });
    const existPhone = userService.search({ phoneNumber });
    if (existEmail) {
      throw new Error("Email in use")
    }
    if (existPhone) {
      throw new Error("Phone in use")
    }
    const data = userService.addUser({...req.body});
      res.data = data;
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.put('/:id', updateUserValid, (req, res, next) => {
  try {
    if (res.err) {
      return;
    }
    const { id } = req.params;

    if (req.body?.email || req.body?.phoneNumber) {
      const existEmail = userService.search({ email: req.body.email });
      if (existEmail) {
        throw new Error("Email in use")
      }
      const existPhone = userService.search({ phoneNumber: req.body.phoneNumber});
      if (existPhone) {
        throw new Error("Phone in use")
      }
    }
    
    const user = userService.search({ id });
    if (user) {
      const data = userService.updateUser(id, {...req.body});
      res.data = data;
    } else {
      throw new Error("User not found")
    }
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.delete('/:id', (req, res, next) => {
  try {
    const { id } = req.params;
    const user = userService.search({ id });
    if (user) {
      const data = userService.deleteUser(id);
      res.data = data;
    } else {
      throw new Error("User not found")
    }
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
