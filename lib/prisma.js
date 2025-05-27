import { PrismaClient } from "./generated/prisma";

export const db= globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV!=="production"){
    globalThis.prisma=db;
}
// globalThis.prisma: it is a global variable that ensures that prisma client instance is reused across hot reloads during PHASE_DEVELOPMENT_SERVER.Without this a new instance will aloways be created whenever the page reloads