import { supabase } from "@/lib/supabaseClient";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <p>Email: {user.email}</p>
      <form action="/logout" method="post">
        <button type="submit">Logout</button>
      </form>
    </div>
  );
}
