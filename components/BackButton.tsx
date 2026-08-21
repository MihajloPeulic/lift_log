import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function BackButton({href, text}: {href: string, text?: string}){
  if(!text){
    text = "Back to Profile"
  }

    return(
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-text transition cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{text}</span>
        </Link>
    )
}