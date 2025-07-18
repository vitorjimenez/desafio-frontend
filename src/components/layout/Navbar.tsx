"use client"

import type React from "react"

import { Search, Menu, User } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ThemeToggle } from "../ui/theme-toggle"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/imoveis?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <nav className="bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="bg-foreground text-background px-3 py-1 rounded text-sm font-bold">MBRAS</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link href="/imoveis" className="text-foreground hover:text-primary transition-colors">
              Imóveis
            </Link>
            <Link href="/contatos" className="text-foreground hover:text-primary transition-colors">
              Contatos
            </Link>
          </div>

          {/* Search Bar & Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Buscar imóvel..."
                className="pl-10 pr-4 py-2 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </form>
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <form onSubmit={handleSearch} className="relative mb-3">
                <Input
                  type="text"
                  placeholder="Buscar imóvel..."
                  className="pl-10 pr-4 py-2 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </form>
              <Link href="/" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">
                Início
              </Link>
              <Link
                href="/imoveis"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
              >
                Imóveis
              </Link>
              <Link
                href="/contatos"
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary"
              >
                Contatos
              </Link>
              <Link href="/login" className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
