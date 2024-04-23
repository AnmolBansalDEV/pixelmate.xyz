"use client"

import { useState } from "react"

import { SingleImageDropzone } from "@/components/single-image-dropzone"

export default function IndexPage() {
  const [file, setFile] = useState<File | undefined>()
  return (
    <section className="flex items-center justify-center w-full pt-6 pb-8 md:py-10">
      <SingleImageDropzone
        width={400}
        height={300}
        value={file}
        onChange={(file) => {
          setFile(file)
        }}
      />
    </section>
  )
}
