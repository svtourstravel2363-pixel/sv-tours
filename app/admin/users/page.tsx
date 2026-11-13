import { createClient } from "@/utils/supabase/server";

export default async function AdminUsers() {
  const supabase = await createClient();
  const { data: users } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
  return (
    <div>
      <h1 className="mb-6 text-2xl font-extrabold">Customers</h1>
      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500"><tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Phone</th><th className="p-3">Role</th><th className="p-3">Joined</th></tr></thead>
          <tbody>{users?.map((u) => <tr key={u.id} className="border-t border-slate-100"><td className="p-3 font-medium">{u.full_name}</td><td className="p-3">{u.email}</td><td className="p-3">{u.phone}</td><td className="p-3 capitalize">{u.role}</td><td className="p-3">{new Date(u.created_at).toLocaleDateString("en-IN")}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
