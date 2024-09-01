"use client"

import "react-image-crop/dist/ReactCrop.css"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import ReactCrop, { type Crop } from "react-image-crop"
import MenuOptions from "@/components/menu-options"
import { SingleImageDropzone } from "@/components/single-image-dropzone"

export default function IndexPage() {
  const [file, setFile] = useState<File>()
  const [crop, setCrop] = useState<Crop>()
  const [menuItem, setMenuItem] = useState<string>()
  const [modelReady, setModelReady] = useState<Boolean | null>(null)
  const worker = useRef<Worker | null>(null)
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
      case "bg-remove":
        console.log('executed')
        if (!file) {
          return
        }
        removeBackground(file)
        break
      default:
        break
    }
  }

  // We use the `useEffect` hook to set up the worker as soon as the `App` component is mounted.
  useEffect(() => {
    if (!worker.current) {
      // Create the worker if it does not yet exist.
      worker.current = new Worker(
        new URL("@/workers/removeBackground.ts", import.meta.url),
        {
          type: "module",
        }
      )
    }
    console.log(worker.current)

    // Create a callback function for messages from the worker thread.
    const onMessageReceived = (e: MessageEvent) => {
      switch (e.data.status) {
        case "initiate":
          console.log('started ')
          setModelReady(false)
          break
        case "ready":
          console.log('ready')
          setModelReady(true)
          break
        case "complete":
          console.log(e)
          break
      }
    }
    worker.current.addEventListener("message", onMessageReceived)

    return () =>
      worker.current?.removeEventListener("message", onMessageReceived)
  })

  const removeBackground = (inputImage: File) => {
    if (worker.current) {
      worker.current.postMessage({ inputImage })
    }
  }

  return (
    <section className="flex items-center justify-center gap-8 px-8 pt-6 pb-8 size-full md:py-10">
      {!file ? (
        <>
        <SingleImageDropzone
          width={400}
          height={300}
          value={file}
          onChange={(file) => {
            setFile(file)
          }}
        />
       <textarea />
       </>
      ) : (
        <div className="flex flex-col gap-8">
          <MenuOptions value={menuItem} onValueChange={onMenuItemSelect} />
          <div className="relative min-w-0 min-h-0 p-0 border-0 rounded-md shadow-md">
            {/* <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              keepSelection
            > */}
            <Image
              className="object-contain rounded-md size-auto"
              src={URL.createObjectURL(file)}
              width={200}
              height={600}
              alt={file?.name ?? ""}
            />
            {/* </ReactCrop> */}
          </div>
        </div>
      )}
    </section>
  )
}
