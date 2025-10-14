
'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Exam = 'GATE' | 'SSC' | 'JEE' | 'NEET';
const GATE_BRANCHES = ['CE', 'CHE', 'CSE', 'EE', 'ECE', 'ME'];

export default function SettingsPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [exam, setExam] = useState<Exam>('GATE');
  const [branch, setBranch] = useState('');
  const [institution, setInstitution] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch('/api/profile');
      const data = await res.json();
      setProfile(data);
      setFullName(data.full_name);
      setExam(data.exam);
      setBranch(data.branch);
      setInstitution(data.institution);
    }

    fetchProfile();
  }, []);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ full_name: fullName, exam, branch, institution }),
      });

      if (!res.ok) {
        throw new Error('Failed to update profile');
      }

      alert('Profile updated successfully!');
    } catch (error: any) {
      console.error('[v0] settings error:', error?.message || error);
      alert(error?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const isGate = exam === 'GATE';

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      {profile ? (
        <form onSubmit={onSave} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={profile.email} disabled />
          </div>

          <div className="grid gap-2">
            <Label>Exam</Label>
            <Select value={exam} onValueChange={(v: Exam) => setExam(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Select Exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GATE">GATE</SelectItem>
                <SelectItem value="SSC">SSC</SelectItem>
                <SelectItem value="JEE">JEE</SelectItem>
                <SelectItem value="NEET">NEET</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isGate && (
            <div className="grid gap-2">
              <Label>Branch (GATE)</Label>
              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  {GATE_BRANCHES.map((b) => (
                    <SelectItem key={b} value={b}>
                      {b}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="institution">School / College / University</Label>
            <Input id="institution" value={institution} onChange={(e) => setInstitution(e.target.value)} required />
          </div>

          <Button type="submit" disabled={loading} className="w-full md:w-auto">
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
