'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useState } from 'react'

export function Topbar({ name }: { name: string }) {
  const initial = (name?.trim()?.[0] || 'U').toUpperCase()
  const [exam, setExam] = useState('GATE')
  const [branch, setBranch] = useState('CSE')

  return (
    <header className="col-start-2 row-start-1 h-16 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Select value={exam} onValueChange={setExam}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Exam" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="GATE">GATE</SelectItem>
                <SelectItem value="SSC">SSC</SelectItem>
                <SelectItem value="JEE">JEE</SelectItem>
                <SelectItem value="NEET">NEET</SelectItem>
              </SelectContent>
            </Select>
            {exam === 'GATE' && (
              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CE">CE</SelectItem>
                  <SelectItem value="CHE">CHE</SelectItem>
                  <SelectItem value="CSE">CSE</SelectItem>
                  <SelectItem value="ECE">ECE</SelectItem>
                  <SelectItem value="EE">EE</SelectItem>
                  <SelectItem value="ME">ME</SelectItem>
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/15 text-primary">{initial}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
