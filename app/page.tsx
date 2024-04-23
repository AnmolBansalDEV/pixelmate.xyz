"use client"

import { useState } from "react"

import ResizeCard from "@/components/resize-card"
import { SingleImageDropzone } from "@/components/single-image-dropzone"

export default function IndexPage() {
  const [file, setFile] = useState<File | undefined>()
  return (
    <section className="flex items-center justify-center w-full gap-8 pt-6 pb-8 md:py-10">
      <SingleImageDropzone
        width={400}
        height={300}
        value={file}
        onChange={(file) => {
          setFile(file)
        }}
      />
      {file && (
        <div className="">
          <ResizeCard />
        </div>
      )}
    </section>
  )
}
