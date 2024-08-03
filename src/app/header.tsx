import {
  OrganizationSwitcher,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

export default function Header() {
  return (
    <Navbar isBordered isBlurred>
      <NavbarBrand>
        <p className="font-bold text-purple-500 text-inherit">CLOUDNEXT</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        <NavbarItem>
          <Link
            className="transition-colors hover:text-purple-500"
            color="foreground"
            href="#"
          >
            Features
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="transition-colors hover:text-purple-500"
            color="foreground"
            href="#"
            aria-current="page"
          >
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="transition-colors hover:text-purple-500"
            color="foreground"
            href="#"
          >
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <SignedOut>
            <SignInButton>
              <Link color="secondary" href="#">
                Login
              </Link>
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
