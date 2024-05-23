import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group"
import { CropIcon, ScalingIcon, SparklesIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Separator } from "./ui/separator"
import { Slider } from "./ui/slider"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip"

type props = {
  value: string | undefined,
  onValueChange: (value: string) => void
}

export default function MenuOptions({ value, onValueChange }: props) {
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={onValueChange}
      className="flex items-center gap-2 p-1 bg-background border-[0.5px] rounded-md border-slate-700 w-fit"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Popover>
              <PopoverTrigger>
                <ToggleGroupItem
                  value="resize"
                  className="data-[state=on]:bg-accent p-1 rounded-lg hover:bg-accent"
                  aria-label="Toggle resize"
                >
                  <ScalingIcon className="size-5" />
                </ToggleGroupItem>
              </PopoverTrigger>
              <PopoverContent>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Resize Image</h4>
                    <p className="text-sm text-muted-foreground">
                      Adjust the width and height of the image
                    </p>
                  </div>
                  <div className="grid w-full gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="width">Width</Label>
                      <div className="flex items-center gap-2">
                        <Slider
                          defaultValue={[400]}
                          id="width"
                          max={800}
                          step={10}
                        />
                        <Input
                          className="w-20"
                          defaultValue={400}
                          id="width-input"
                          max={800}
                          min={0}
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="height">Height</Label>
                      <div className="flex items-center gap-2">
                        <Slider
                          defaultValue={[300]}
                          id="height"
                          max={600}
                          step={10}
                        />
                        <Input
                          className="w-20"
                          defaultValue={300}
                          id="height-input"
                          max={600}
                          min={0}
                          type="number"
                        />
                      </div>
                    </div>
                  </div>
                  <Button>Apply</Button>
                </div>
              </PopoverContent>
            </Popover>
          </TooltipTrigger>
          <TooltipContent>
            <p>resize</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Separator orientation="vertical" className="h-6 bg-foreground" />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <ToggleGroupItem
              value="crop"
              aria-label="Toggle crop"
              className="data-[state=on]:bg-accent p-1 rounded-lg hover:bg-accent"
            >
              <CropIcon className="size-5" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>
            <p>crop</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Separator orientation="vertical" className="h-6 bg-foreground" />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <ToggleGroupItem
              value="bg-remove"
              aria-label="Toggle bg-remove"
              className="data-[state=on]:bg-accent p-1 rounded-lg hover:bg-accent"
            >
              <SparklesIcon className="size-5" />
            </ToggleGroupItem>
          </TooltipTrigger>
          <TooltipContent>
            <p>remove background</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ToggleGroup>
  )
}
