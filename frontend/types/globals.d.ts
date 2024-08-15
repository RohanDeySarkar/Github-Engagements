import { User } from "./types";

// clerk sessionClaims update types
declare global {
    interface CustomJwtSessionClaims extends User {}
}