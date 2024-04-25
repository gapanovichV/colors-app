"use client"

import React, { useState } from "react"
import clsx from "clsx"
import ColorThief from "colorthief"
import DisplayImage from "@/components/DisplayImage"
import ListItem from "@/components/ListItem"
import Link from "next/link"
import { CiSaveUp2 } from "react-icons/ci"
import styles from "./Kidnapper.module.scss"

const Home = () => {
  const [uploadImage, setUploadImage] = useState<string>("")
  const [colorsPalette, setColorsPalette] = useState<number[][]>([])

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]

    if (file) {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const img = new Image()

        img.onload = () => {
          const colorThief = new ColorThief()
          const colorPalette = colorThief.getPalette(img, 6)
          setColorsPalette(colorPalette)
          setUploadImage(img.src)
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <header className={clsx(styles.header)}>
        <Link href="/">
          <h1>Color Kidnapper</h1>
        </Link>
        <div className={clsx(styles.input)}>
          <label htmlFor="file">
            <CiSaveUp2 size="1.25rem" /> Upload Image
          </label>
          <input
            id="file"
            type="file"
            accept={"image/*"}
            hidden
            onChange={(e) => handleUploadImage(e)}
          />
        </div>
      </header>

      <main className={clsx(styles.main)}>
        <div className={clsx(styles.content)}>
          <DisplayImage uploadImage={uploadImage} />
          <ListItem colorsPalette={colorsPalette} />
        </div>
      </main>
    </>
  )
}
export default Home
