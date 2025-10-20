import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      <p>This is a server component. Your session details are fetched on the server.</p>
      <pre className="mt-4 p-4 bg-gray-100 rounded">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
