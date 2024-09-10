import mount from "koa-mount";
import serve from "koa-static";
import koaRouter from "@koa/router";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default function (server) {
  const router = new koaRouter({ prefix: "/admin" });
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  router.get("/(.*)", async (ctx, next) => {
    var html = fs.readFileSync(__dirname + "/dist/index.html");
    ctx.type = "html";
    ctx.body = html;
  });

  server.use(mount("/admin", serve(__dirname + "/dist")));
  server.use(router.routes()).use(router.allowedMethods());
}
