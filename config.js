import dotenv from "dotenv";
dotenv.config();

export const config = {
  host: process.env.Mailtrap_Host,
  username: process.env.Mailtrap_Username,
  pwd: process.env.Mailtrap_PWD,
  port: process.env.Mailtrap_Port,
};
