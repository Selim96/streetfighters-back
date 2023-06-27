import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
      const { email, password } = req.body;
      if (email && password) {
        console.log("body: ", req.body)
        const data = authService.login({ email });

        if (data.password === password) {
          res.data = data;
        } else {
          throw new Error("Wrong credentials")
        }
      } else {
        throw new Error("Bad request")
      }
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

export { router };
