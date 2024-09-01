import {
  AutoModel,
  AutoProcessor,
  PreTrainedModel,
  Processor,
  RawImage,
  env,
} from "@xenova/transformers"

// Specify a custom location for models (defaults to '/models/').
env.localModelPath = "/models/RMBG-1.4"

// Proxy the WASM backend to prevent the UI from freezing
env.backends.onnx.wasm.proxy = true

let model: PreTrainedModel
// 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
let processor: Processor

// Predict foreground of the given image
async function predict(inputImage: Blob) {
  // Read image
  const image = await RawImage.fromBlob(inputImage)
  // Preprocess image
  const { pixel_values } = await processor(image)

  // Predict alpha matte
  const { output } = await model({ input: pixel_values })

  // Resize mask back to original size
  const mask = await RawImage.fromTensor(output[0].mul(255).to("uint8")).resize(
    image.width,
    image.height
  )
  return mask
}

(async () => {
  model = await AutoModel.from_pretrained("", {
    // Do not require config.json to be present in the repository
    config: { model_type: "custom" },
    local_files_only: true,
  })
  processor = await AutoProcessor.from_pretrained("", {
    // Do not require config.json to be present in the repository
    config: {
      do_normalize: true,
      do_pad: false,
      do_rescale: true,
      do_resize: true,
      image_mean: [0.5, 0.5, 0.5],
      feature_extractor_type: "ImageFeatureExtractor",
      image_std: [1, 1, 1],
      resample: 2,
      rescale_factor: 0.00392156862745098,
      size: { width: 1024, height: 1024 },
    },
    local_files_only: true,
  })
})()

// Listen for messages from the main thread
self.onmessage = async (event: MessageEvent) => {
  // Actually perform the segmentation
  let output = await predict(event.data.inputImage)

  // Send the output back to the main thread
  self.postMessage({
    status: "complete",
    output: output,
  })
}
