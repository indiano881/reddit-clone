import { createServerClient } from "@supabase/ssr"
import { type Database } from "./database.types"
import { cookies } from "next/headers"

export const createClient= () => {
    const cookiesStore= cookies()

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!, 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookiesStore.getAll();

                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({name,options, value})=> 
                            cookiesStore.set(name, value, options)
                        )
                    } catch  {
                        //setAll can be ignored if you have refreshing user session in middleware
                    }
                }
            }
        }
        
    )
}