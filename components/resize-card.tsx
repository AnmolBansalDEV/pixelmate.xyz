import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Slider } from "./ui/slider"

export default function ResizeCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Resize Image</CardTitle>
        <CardDescription>
          Adjust the width and height of the image
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-3">
        <div className="grid w-full gap-6">
          <div className="grid gap-2">
            <Label htmlFor="width">Width</Label>
            <div className="flex items-center gap-2">
              <Slider defaultValue={[400]} id="width" max={800} step={10} />
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
              <Slider defaultValue={[300]} id="height" max={600} step={10} />
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
      </CardContent>
    </Card>
  )
}
