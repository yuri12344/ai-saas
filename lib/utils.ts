import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`
}

import {
  MessageSquare,
  Music,
  ImageIcon,
  VideoIcon,
  Code
} from "lucide-react";

export const tools = [
  {
    label: "Conversa",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
  },
  {
    label: "Gerador de Música",
    icon: Music,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
  },
  {
    label: "Gerador de Imagem",
    icon: ImageIcon,
    color: "text-ping-700",
    bgColor: "bg-ping-700/10",
    href: "/image",
  },
  {
    label: "Gerador de Código",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
    href: "/code",
  }
]