"use client"

import * as React from "react"
import Image from "next/image"
import { UploadCloudIcon, X } from "lucide-react"
import { DropzoneOptions, useDropzone } from "react-dropzone"
import { twMerge } from "tailwind-merge"
import { Button } from "./ui/button"

const variants = {
  base: "relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border-4 border-dashed border-gray-300 transition-colors duration-200 ease-in-out",
  image:
    "border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-900 rounded-md",
  active: "border-2",
  disabled: "bg-gray-700 cursor-default pointer-events-none bg-opacity-30",
  accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
  reject: "border border-red-700 bg-red-700 bg-opacity-10",
}

type InputProps = {
  width: number
  height: number
  className?: string
  value?: File | string
  onChange?: (file?: File) => void | Promise<void>
  disabled?: boolean
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">
}

const ERROR_MESSAGES = {
  fileInvalidType() {
    return "Invalid file type."
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`
  },
  fileNotSupported() {
    return "The file is not supported."
  },
}

const SingleImageDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { dropzoneOptions, width, height, value, className, disabled, onChange },
    ref
  ) => {
    const imageUrl = React.useMemo(() => {
      if (typeof value === "string") {
        // in case a url is passed in, use it to display the image
        return value
      } else if (value) {
        // in case a file is passed in, create a base64 url to display the image
        return URL.createObjectURL(value)
      }
      return null
    }, [value])

    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      acceptedFiles,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { "image/*": [] },
      multiple: false,
      disabled,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0]
        if (file) {
          void onChange?.(file)
        }
      },
      ...dropzoneOptions,
    })

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          imageUrl && variants.image,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className
        ).trim(),
      [
        isFocused,
        imageUrl,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ]
    )

    // error validation messages
    const errorMessage = React.useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0]
        if (errors[0]?.code === "file-invalid-type") {
          return ERROR_MESSAGES.fileInvalidType()
        } else if (errors[0]?.code === "too-many-files") {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0)
        } else {
          return ERROR_MESSAGES.fileNotSupported()
        }
      }
      return undefined
    }, [fileRejections, dropzoneOptions])

    return (
      <div>
        <div
          {...getRootProps({
            className: dropZoneClassName,
            style: {
              width,
              height,
            },
          })}
        >
          {/* Main File Input */}
          <input ref={ref} {...getInputProps()} />

          {imageUrl ? (
            // Image Preview
            <Image
              className="object-cover rounded-md size-full"
              src={imageUrl}
              width={200}
              height={200}
              alt={acceptedFiles[0]?.name}
            />
          ) : (
            // Upload Icon
            <div className="flex flex-col items-center justify-center text-xl text-gray-400">
              <UploadCloudIcon className="mb-2 size-14" />
              <div className="text-gray-400">drag & drop to upload</div>
              <div className="mt-3">
                <Button disabled={disabled}>select</Button>
              </div>
            </div>
          )}

          {/* Remove Image Icon */}
          {imageUrl && !disabled && (
            <div
              className="absolute top-0 right-0 group -translate-y-1/4 translate-x-1/4"
              onClick={(e) => {
                e.stopPropagation()
                void onChange?.(undefined)
              }}
            >
              <div className="flex items-center justify-center transition-all duration-300 bg-black border border-solid rounded-md size-5 border-white/70 hover:size-6">
                <X className="text-white/70" width={16} height={16} />
              </div>
            </div>
          )}
        </div>

        {/* Error Text */}
        <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
      </div>
    )
  }
)
SingleImageDropzone.displayName = "SingleImageDropzone"

export { SingleImageDropzone }
