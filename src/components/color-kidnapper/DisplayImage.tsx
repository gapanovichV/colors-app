import React from "react"
import clsx from "clsx"
import Image from "next/image"
import styles from "./DisplayImage.module.scss"

interface DisplayImageProps {
  className?: string
  uploadImage: string
}
const DisplayImage = ({ uploadImage, className }: DisplayImageProps) => {
  return (
    <div className={clsx(styles.image, className)}>
      {uploadImage ? (
        <Image
          width={100}
          height={100}
          className={clsx(styles.img)}
          src={uploadImage}
          alt="you img"
        />
      ) : (
        <h2>Put image here...</h2>
      )}
    </div>
  )
}

export default DisplayImage
