import * as bcrypt from "bcrypt-nodejs";

export function generateHash(password) {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function compareHash(text, hash) {
  return bcrypt.compareSync(text, hash);
}