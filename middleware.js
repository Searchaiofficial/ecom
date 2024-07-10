import { NextResponse } from "next/server";

export function middleware(request) {
  // const url = new URL(request.url);
  // const token = url.searchParams.get("token");
  // if (token) {
  //   return NextResponse.next();
  // } else {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
}

export const config = {
  matcher: "/profile",
};
