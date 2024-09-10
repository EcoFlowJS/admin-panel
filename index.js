import mount from "koa-mount";
import serve from "koa-static";
import koaRouter from "@koa/router";
import fs from "fs";

export default function (server) {
  const router = new koaRouter({ prefix: "/admin" });

  router.get("/(.*)", async (ctx, next) => {
    var html = fs.readFileSync(__dirname + "/dist/index.html");
    ctx.type = "html";
    ctx.body = html;
  });

  server.use(mount("/admin", serve(__dirname + "/dist")));
  server.use(router.routes()).use(router.allowedMethods());
}
