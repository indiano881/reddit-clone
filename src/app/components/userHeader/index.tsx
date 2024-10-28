import Link from "next/link";
import { createClient } from "../../../../utils/supabase/server";
import LogOutButton from "../LogOutButton";

const UserHeader = async() => {
    const supabase= createClient();
    const {data:{user}} = await supabase.auth.getUser()
    return (
<div className="bg-red-700 m-20 p-20">
        {user ? <LogOutButton /> : (<Link href={"/auth/sign-up"}><button >log in</button></Link>)}
</div>
    )
}

export default UserHeader;