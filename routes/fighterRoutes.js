import { Router } from "express";
import { fighterService } from "../services/fighterService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";

const router = Router();

// TODO: Implement route controllers for fighter
router.get('/', (req, res, next) => {
  try {
    const data = fighterService.getAll();
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
    const data = fighterService.getOne({id});
      res.data = data;
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.post('/', createFighterValid, (req, res, next) => {
  try {
    if (res.err) {
      return;
    }
    const { name, health = 100, power, defense } = req.body;

    const existName = fighterService.getOne({ name: name.toLowerCase() });
    if (existName) {
      throw new Error("Name in use")
    }

    const newFighter = {
      name: name.toLowerCase(),
      health: Number(health),
      power: Number(power),
      defense: Number(defense)
    }

    const data = fighterService.add(newFighter);
      res.data = data;
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

router.put('/:id', updateFighterValid, (req, res, next) => {
  try {
    if (res.err) {
      return;
    }
    const { id } = req.params;
    const newFighter = {};

    const fighter = fighterService.getOne({ id });
    if (fighter) {
      if (req.body?.name) {
        const existFighter = fighterService.getOne({ name: req.body.name });
        if (existFighter) {
          throw new Error("Name in use")
        }
        newFighter.name = req.body.name.toLowerCase()
      }

      if (req.body?.health) {
        newFighter.health = Number(req.body.health)
      }
      if (req.body?.power) {
        newFighter.power = Number(req.body.power)
      }
      if (req.body?.defense) {
        newFighter.defense = Number(req.body.defense)
      }

      const data = fighterService.update(id, newFighter);
      res.data = data;
    } else {
      throw new Error("Fighter not found")
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
    const fighter = fighterService.getOne({ id });
    if (fighter) {
      const data = fighterService.delete(id);
      res.data = data;
    } else {
      throw new Error("Fighter not found")
    }
  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
}, responseMiddleware);

export { router };
