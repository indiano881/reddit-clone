import { signUp } from "../../../../actions/sign-up"

export const SignUpForm = () => {
    return (
        <form action={signUp} className="bg-orange-700 flex flex-col m-20 p-8 border-4 border-black items-center">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required className="rounded-xl border-2 border-black mb-4 w-[98%] sm:w-[75%]  md:w-[50%]" />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required className="rounded-xl border-2 border-black mb-4 w-[98%] sm:w-[75%]  md:w-[50%]" />

        <button type="submit" className="border-2 border-black rounded-xl bg-green-500 hover:bg-green-200 w-[98%] sm:w-[75%] md:w-[20%]">Sign Up</button>
    </form>
    )
}