import { Express } from "express-serve-static-core";
import authRoutes from "./auth.routes";
import contactRoutes from "./contact.routes";
import userRoutes from "./user.routes";
import publicRoutes from "./public.routes";

export default class Router {
    public static configure(app: Express): void {
        app.use("/", publicRoutes);
        app.use("/api/contacts", contactRoutes);
        app.use("/api/auth", authRoutes);
        app.use("/api/users", userRoutes);
    }
}