import { readFile } from "fs";
import { config } from "./config.js";
import { createTransport } from "nodemailer";
// import Employee from "./Employee.js";

const log = (msg) => console.log(msg);

// In case you want to create your DB from null, use the following commented out code
// const data = {
//   info: [],
// };

// const emp1 = new Employee("a", "b", "2000-07-07", "ab@example.com");
// const emp2 = new Employee("c", "d", "2000-01-01", "cd@example.com");
// const emp3 = new Employee("e", "f", "2000-01-01", "gf@example.com");
// const emp4 = new Employee("g", "h", "2000-01-01", "gh@example.com");
// const emp5 = new Employee("i", "j", "2000-01-01", "ij@example.com");

// data.info.push(emp1);
// data.info.push(emp2);
// data.info.push(emp3);
// data.info.push(emp4);
// data.info.push(emp5);

// const dataJson = JSON.stringify(data);

// fs.writeFile("empInfo.json", dataJson, "utf8", (err) => {
//   err ?? console.log(err);
//   return;
// });

function getCurrentDayAndMonth() {
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;

  if (day < 10) day = `0${day}`;
  if (month < 10) month = `0${month}`;

  return [month, day];
}

let employees = [];
readFile("empInfo.json", "utf8", (err, data) => {
  // Error reading the file
  if (err) {
    log(err);
    return false;
  }

  // Get today's date(the month and the day) in number
  const month = getCurrentDayAndMonth()[0];
  const day = getCurrentDayAndMonth()[1];

  const res = JSON.parse(data);
  const info = res.info;

  employees = info.filter((person) => {
    return person.dob.split("-")[1] == month && person.dob.split("-")[2] == day;
  });

  // No matched BDs ❌
  if (employees.length < 1) {
    log("No BDs :(");
    return null;
  }

  // Doch gibt es BDs ✅
  // Let's spread nice msgs 💖
  employees.forEach((person) => {
    const { email, fname } = person;

    const msg = `<h2 style='text-align: center'>&#8986; Hi ${fname} Happy BD woooow!&#128150; </h2>`;

    let mailOptions = {
      from: "someperson@gmail.com",
      to: email,
      subject: "BD msg",
      html: msg,
    };

    let transporter = createTransport({
      host: config.host,
      port: config.port,
      auth: {
        user: config.username,
        pass: config.pwd,
      },
    });

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        log(error);
      } else {
        log("Email sent: " + info.response);
      }
    });
  });
});
