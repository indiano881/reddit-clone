import { createClient } from "../../utils/supabase/client";


export default async function Home() {
  const supabase= createClient();
  const {data, error}= await supabase.from("posts").select("*")
  console.log({data, error})
  return (
    <h1 className="text-5xl">connected</h1>
  );
}
