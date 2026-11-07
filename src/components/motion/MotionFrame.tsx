'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import styles from './MotionFrame.module.css'

export function MotionFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div className={styles.frame} key={pathname}>
      {children}
    </div>
  )
}
