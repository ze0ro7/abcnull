'use client'

import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function Topbar({ name }: { name: string }) {
  const initial = (name?.trim()?.[0] || 'U').toUpperCase()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [exam, setExam] = useState(searchParams.get('exam') || 'GATE')
  const [branch, setBranch] = useState(searchParams.get('branch') || 'CSE')

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams)
    params.set('exam', exam)
    if (exam === 'GATE') {
      params.set('branch', branch)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <header className="col-start-2 row-start-1 h-16 border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex flex-wrap items-center gap-2">
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
          <Button onClick={handleSearch} className="flex-shrink-0 cursor-pointer">Search</Button>
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
