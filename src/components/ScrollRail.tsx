import { useEffect, useRef, useState } from 'react'
import { ArrowDown01Icon } from '@hugeicons/core-free-icons'
import { Icon } from './Icon'
import s from './ScrollRail.module.css'

/**
 * Fixed vertical section indicator on the right edge — a small-caps label,
 * a connecting line and a down arrow, the label swapping to whichever
 * section is currently in view. Desktop-only decorative wayfinding, hidden
 * on phone/tablet where there's no room for it.
 */
export function ScrollRail({ sections }: { sections: { id: string; label: string }[] }) {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = sections.map((sec) => document.getElementById(sec.id)).filter((el): el is HTMLElement => !!el)
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length) {
          const id = visible[0].target.id
          const i = sections.findIndex((sec) => sec.id === id)
          if (i >= 0) setActive(i)
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  return (
    <div className={s.rail} ref={ref} aria-hidden>
      <span className={s.label}>{sections[active]?.label}</span>
      <span className={s.line} />
      <span className={s.arrow}>
        <Icon icon={ArrowDown01Icon} size={16} />
      </span>
    </div>
  )
}
