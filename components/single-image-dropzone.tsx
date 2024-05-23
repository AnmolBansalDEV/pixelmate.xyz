"use client"

import * as React from "react"
import { UploadCloudIcon } from "lucide-react"
import { DropzoneOptions, useDropzone } from "react-dropzone"
import { twMerge } from "tailwind-merge"

import { Button } from "./ui/button"

const variants = {
  base: "relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border-4 border-dashed border-gray-300 transition-colors duration-200 ease-in-out",
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
    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
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
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className
        ).trim(),
      [
        isFocused,
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
          {/* Upload Icon */}
          <div className="flex flex-col items-center justify-center text-xl text-gray-400">
            <UploadCloudIcon className="mb-2 size-14" />
            <div className="text-gray-400">drag & drop to upload</div>
            <div className="mt-3">
              <Button disabled={disabled}>Select</Button>
            </div>
          </div>
        </div>

        {/* Error Text */}
        <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
      </div>
    )
  }
)
SingleImageDropzone.displayName = "SingleImageDropzone"

export { SingleImageDropzone }
