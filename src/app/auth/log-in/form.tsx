import { logIn } from "../../../../actions/log-in"


export const LogInForm = () => {
    return (
        <form action={logIn} className="bg-pink-400 flex flex-col m-20 p-8 border-4 w-[50%]">
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />

        <button type="submit">Log in</button>
    </form>
    )
}