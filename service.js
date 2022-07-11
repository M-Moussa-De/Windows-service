import { Service } from "node-windows";
let svc = new Service({
  name: "bdMsg",
  description:
    "Don't forget your beloved ones on their BDs and send a BD msg on time",
  script: "C:\\Users\\mmous\\Desktop\\node-service\\app.js",
});

svc.on("install", () => {
  svc.start();
});

svc.install();
