import {
  ClerkLoading,
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Spinner,
} from "@nextui-org/react";
import { AppLogo } from "@ui/icons/AppLogo";

import { AppIcon } from "@/ui/icons/AppIcon";

export default function Header() {
  return (
    <Navbar isBordered isBlurred>
      <NavbarBrand>
        <a className="flex flex-row items-center justify-center gap-1" href="/">
          <AppIcon />
          <AppLogo />
        </a>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link
            className="transition-all duration-300 hover:text-primary-400 hover:scale-110"
            size="lg"
            color="primary"
            href="#"
          >
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="transition-all duration3200 hover:text-primary-400 hover:scale-110"
            color="primary"
            size="lg"
            href="#"
          >
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="transition-all duration3200 hover:text-primary-400 hover:scale-110"
            color="primary"
            size="lg"
            href="#"
          >
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <ClerkLoading>
            <Spinner size="lg" color="primary" />
          </ClerkLoading>
          <SignedOut>
            <SignInButton>
              <Button variant="shadow" color="primary">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
        </NavbarItem>
        <NavbarItem>
          <SignedIn>
            <SignOutButton>
              {/* <Button as={Link} color="secondary" href="#" variant="flat">
                Sign Out
              </Button> */}
              <OrganizationSwitcher />
            </SignOutButton>
          </SignedIn>
        </NavbarItem>
        <NavbarItem>
          <SignedIn>
            <SignOutButton>
              {/* <Button as={Link} color="secondary" href="#" variant="flat">
                Sign Out
              </Button> */}
              <UserButton />
            </SignOutButton>
          </SignedIn>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
