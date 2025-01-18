import { NextRequest } from "next/server";
import { updateSesion } from "./actions/authActions";

export async function middleware(request: NextRequest) {
    return await updateSesion(request);
}