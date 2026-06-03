"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"


interface SkillMarkdownProps {
  content: string
  className?: string
}

export function SkillMarkdown({ content, className }: SkillMarkdownProps) {
  return (
    <div className={cn("text-sm leading-relaxed text-foreground", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mb-3 mt-0 text-xl font-bold text-foreground">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mb-2 mt-5 text-lg font-semibold text-foreground first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-4 text-base font-semibold text-foreground">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-3 last:mb-0 text-sm text-muted-foreground leading-relaxed">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="mb-3 ml-4 list-disc space-y-1 text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-3 ml-4 list-decimal space-y-1 text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-sm leading-relaxed">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-muted-foreground">{children}</em>
          ),
          code: ({ children, className: codeClassName }) => {
            const isBlock = codeClassName?.includes("language-")
            if (isBlock) {
              return (
                <code className="block w-full rounded-md bg-secondary/60 px-3 py-2 font-mono text-xs text-foreground">
                  {children}
                </code>
              )
            }
            return (
              <code className="rounded bg-secondary/60 px-1 py-0.5 font-mono text-xs text-primary">
                {children}
              </code>
            )
          },
          pre: ({ children }) => (
            <pre className="mb-3 overflow-x-auto rounded-lg border border-border bg-secondary/40 p-3">
              {children}
            </pre>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mb-3 border-l-2 border-primary/40 pl-4 italic text-muted-foreground">
              {children}
            </blockquote>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="my-4 border-border" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
