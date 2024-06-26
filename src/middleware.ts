import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  try {
    // Nếu người dùng đăng nhập thì mã token sẽ tồn tại
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const { pathname } = request.nextUrl;
    // Nếu người dùng đã đăng nhập và cố gắng truy cập trang đăng nhập thì chuyển về trang chủ bằng cách kiểm tra:
    // (1) Người dùng đã login, token đã tồn tại
    // (2) Kiểm tra xem đường dẫn (pathname) có chứa "api/auth"
    // (3) Kiểm tra xem đường dẫn (pathname) có chứa "/_next" hay không
    if (
      token ||
      pathname.includes("/api/auth") ||
      pathname.includes("/_next")
    ) {
      if (pathname === "/login") {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    }
    //Nếu người dùng chưa đăng nhập thì đẩy người dùng tới trang đăng nhập:
    // (1) Người dùng không có token
    // (2) Người dùng không ở trang có pathName là login
    if (!token && pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
