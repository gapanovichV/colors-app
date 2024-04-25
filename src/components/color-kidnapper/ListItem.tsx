import React, { useState } from "react"
import clsx from "clsx"
import { FaRegCopy } from "react-icons/fa"
import styles from "./Listitem.module.scss"

interface ListItemProps {
  className?: string
  colorsPalette: number[][]
}
interface ColorProps {
  hex: string
}

export const Color = ({ hex }: ColorProps) => {
  const [copied, setCopied] = useState<boolean>(false)

  const copyToClipboard = async (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.target as HTMLElement
    await navigator.clipboard.writeText(target.innerText)
  }
  return (
    <li style={{ background: hex }} className={clsx(styles.color)}>
      <span
        role="presentation"
        onClick={(e) => {
          copyToClipboard(e)
          setCopied(true)
          setTimeout(() => {
            setCopied(false)
          }, 1000)
        }}
      >
        {copied ? "Copied!" : hex} <FaRegCopy />
      </span>
    </li>
  )
}

const ListItem = ({ className, colorsPalette }: ListItemProps) => {

  const rgbToHex = (r: number, g: number, b: number): string =>
    `#${[r, g, b]
      .map((x: number) => {
        const hex = x.toString(16)
        return hex.length === 1 ? `0${hex}` : hex
      })
      .join("")}`

  return (
    <>
      {colorsPalette && (
        <ul className={clsx(styles.colors, className)}>
          {colorsPalette.map((color: number[], index) => {
            const hex = rgbToHex(color[0], color[1], color[2])
            return <Color hex={hex} key={index} />
          })}
        </ul>
      )}
    </>
  )
}

export default ListItem
