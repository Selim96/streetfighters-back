import { FIGHTER } from "../models/fighter.js";

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during creation
  try {
    const modelKeys = Object.keys(FIGHTER);
    modelKeys.splice(modelKeys.indexOf("id"), 1);
    const data = req.body;
    const dataKeys = Object.keys(data);

    const flag = dataKeys.every(item => {
      if (modelKeys.includes(item)) {
        return data[item].toString().trim().length !== 0
      } else {
        return false;
      }
    });

    if (!flag) {
      throw new Error("All fields must be filled")
    }
    if (dataKeys.length > 4) {
      throw new Error("Extra field")
    }
    if (!data["name"]) {
      throw new Error("Name is required")
    }
    if (data["health"] && (data["health"] < 80 || data["health"] > 120)) {
      throw new Error("Limits from 80 to 120 for health")
    }

    if (!data["power"] || (data["power"] < 1 || data["power"] > 100)) {
      throw new Error("Power is required, Limits from 1 to 100")
    }

    if (!data["defense"] || (data["defense"] < 1 || data["defense"] > 10)) {
      throw new Error("Defense is required, Limits from 1 to 10")
    }


  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
};

const updateFighterValid = (req, res, next) => {
  // TODO: Implement validatior for FIGHTER entity during update
  try {
    const modelKeys = Object.keys(FIGHTER);
    modelKeys.splice(modelKeys.indexOf("id"), 1);
    const data = req.body;
    const dataKeys = Object.keys(data);

    const flag = dataKeys.every(item => {
      if (modelKeys.includes(item)) {
        return data[item].toString().trim().length !== 0
      } else {
        return false;
      }
    });

    if (!flag) {
      throw new Error("All fields must be filled")
    }

    if (dataKeys.length < 1) {
      throw new Error("Fill the fields")
    }

    if (dataKeys.length > 4) {
      throw new Error("Extra field")
    }
    
    if (data["health"] && (data["health"] < 80 || data["health"] > 120)) {
      throw new Error("Limits from 80 to 120 for health")
    }

    if (data["power"] && (data["power"] < 1 || data["power"] > 100)) {
      throw new Error("Power is required, Limits from 1 to 100")
    }

    if (data["defense"] && (data["defense"] < 1 || data["defense"] > 10)) {
      throw new Error("Defense is required, Limits from 1 to 10")
    }


  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
};

export { createFighterValid, updateFighterValid };
