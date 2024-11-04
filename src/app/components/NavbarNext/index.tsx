

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { createClient } from "../../../../utils/supabase/server";
import LogOutButton from "../LogOutButton";


const NavbarNext = async() => {
    const supabase= createClient();
    const {data: {user}} = await supabase.auth.getUser();

    return (
    <Navbar>
      <NavbarBrand>
       <img src="/images/reddit_2023.svg" alt="reddit logo" width="80px" height="auto"/>

      </NavbarBrand>
      <NavbarContent className="" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem >
            {!user ?  <Link href="/auth/log-in">Login</Link>:  <LogOutButton />}
        </NavbarItem>
        <NavbarItem>
            {!user &&  <Button as={Link} color="primary" href="/auth/sign-up" variant="flat">Sign Up</Button>}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    )
}

export default NavbarNext;