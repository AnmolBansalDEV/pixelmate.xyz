"use client"

import "react-image-crop/dist/ReactCrop.css"
import { useState } from "react"
import Image from "next/image"
import ReactCrop, { type Crop } from "react-image-crop"

import MenuOptions from "@/components/menu-options"
import ResizeCard from "@/components/resize-card"
import { SingleImageDropzone } from "@/components/single-image-dropzone"

export default function IndexPage() {
  const [file, setFile] = useState<File>()
  const [crop, setCrop] = useState<Crop>()
  const [menuItem, setMenuItem] = useState<string>()
  function onMenuItemSelect(value: string) {
    setMenuItem(value)
    switch (value) {
      case "resize":
        break
      case "crop":
        setCrop({
          unit: "%",
          x: 25,
          y: 25,
          width: 50,
          height: 50,
        })
        break
      default:
        break
    }
  }
  return (
    <section className="flex items-center justify-center gap-8 px-8 pt-6 pb-8 size-full md:py-10">
      {!file ? (
        <SingleImageDropzone
          width={400}
          height={300}
          value={file}
          onChange={(file) => {
            setFile(file)
          }}
        />
      ) : (
        <div className="flex flex-col gap-8">
          <MenuOptions value={menuItem} onValueChange={onMenuItemSelect} />
          <div className="relative min-w-0 min-h-0 p-0 border-0 rounded-md shadow-md">
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              keepSelection
            >
              <Image
                className="object-contain rounded-md size-full"
                src={URL.createObjectURL(file)}
                width={200}
                height={600}
                alt={file?.name ?? ""}
              />
            </ReactCrop>
          </div>
          {/* <ResizeCard /> */}
        </div>
      )}
    </section>
  )
}
