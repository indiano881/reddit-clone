import { createClient } from "../../../../utils/supabase/server";

const UserHeader = async() => {
    const supabase= createClient();
    const {data:{user}} = await supabase.auth.getUser()
    return (
<div className="bg-red-700 m-20 p-20">
        {user ? (<button>log out</button>) : (<button>log in</button>)}
</div>
    )
}

export default UserHeader;