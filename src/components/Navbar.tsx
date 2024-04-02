import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Icons } from "@/components/Icons";
import NavItems from "@/components/NavItems";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Cart from "@/components/Cart";
import { cookies } from "next/headers";
import { getServerSideUser } from "@/lib/payload-utils";
import UserAccountNav from "./UserAccountNav";

const NavBar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>
              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign In
                    </Link>
                  )}
                  {!user && (
                    <span
                      className="h-6 w-px bg-gray-200"
                      aria-hidden="true"
                    ></span>
                  )}
                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href="sign-up"
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Create account
                    </Link>
                  )}
                  {user && (
                    <span
                      className="h-6 w-px bg-gray-200"
                      aria-hidden="true"
                    ></span>
                  )}

                  {!user && (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      ></span>
                    </div>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default NavBar;
