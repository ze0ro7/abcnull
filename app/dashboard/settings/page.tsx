import { redirect } from "next/navigation";
import { getSupabaseServer } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default async function SettingsPage() {
  const supabase = getSupabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("exam, branch")
    .eq("user_id", user.id)
    .maybeSingle();

  async function updateProfile(formData: FormData) {
    "use server";
    const exam = formData.get("exam") as string;
    const branch = formData.get("branch") as string;
    const supabase = getSupabaseServer();
    const { error } = await supabase
      .from("profiles")
      .upsert({ user_id: user!.id, exam, branch }, { onConflict: 'user_id' });

    if (error) {
      console.error("Error updating profile:", error);
    } else {
      redirect("/dashboard/pyqs");
    }
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold">Settings</h1>
      <p className="text-muted-foreground mt-2">Update your profile and preferences.</p>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={updateProfile}>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="exam">Exam</Label>
                <Select name="exam" defaultValue={profile?.exam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your exam" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GATE">GATE</SelectItem>
                    <SelectItem value="ESE">ESE</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="branch">Branch</Label>
                <Select name="branch" defaultValue={profile?.branch}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CHE">Chemical Engineering</SelectItem>
                    <SelectItem value="ME">Mechanical Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-6">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
