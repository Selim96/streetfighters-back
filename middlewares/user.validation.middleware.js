import { USER } from "../models/user.js";

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for USER entity during creation
  try {
    const modelKeys = Object.keys(USER);
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
    if (dataKeys.length !== 5) {
      throw new Error("Extra field")
    }
    if (data["email"].indexOf("gmail") === -1) {
      throw new Error("Must be gmail")
    }
    if (data["phoneNumber"].toString().indexOf("+380") === -1) {
      throw new Error("Must be +380xxxxxxx")
    }
    if (typeof data["password"] !== "string" || data["password"].length < 3) {
      throw new Error("Password must contain at least 3 characters")
    }

  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
  
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  try {
    const modelKeys = Object.keys(USER);
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

    if (dataKeys.length < 1) {
      throw new Error("Fill the fields")
    }

    if (!flag) {
      throw new Error("Invalid field")
    }
    if (data["email"] && data["email"].indexOf("gmail") === -1) {
      throw new Error("Must be gmail")
    }
    if (data["phoneNumber"] && data["phoneNumber"].toString().indexOf("+380") === -1) {
      throw new Error("Must be +380xxxxxxx")
    }
    if (data["password"] && (typeof data["password"] !== "string" || data["password"].length < 3)) {
      throw new Error("Password must contain at least 3 characters")
    }

  } catch (error) {
    res.err = error;
  } finally {
    next();
  }
};

export { createUserValid, updateUserValid };
