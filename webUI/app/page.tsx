"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Gold price widget (chart)
const GoldPriceWidget = () => {
  return (
    <div className="bg-gray-900 p-4 rounded-xl shadow-md w-full">
      <div className="text-yellow-500 text-2xl text-center mb-4">Historic Data</div>
      <iframe
        src="https://www.ashesh.com.np/gold/chart.php?type=0&unit=tola&range=5000&range=365"
        className="w-full h-[265px] rounded-md border-none overflow-hidden"
        scrolling="no"
        title="Gold Price Nepal"
      />
    </div>
  )
}

export default function GoldPricePredictor() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)
  const [predictedPrice, setPredictedPrice] = React.useState<number | null>(null)

  const fetchData = async () => {
    if (!date) return
    try {
      const res = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
        }),
      })
      const data = await res.json()
      setPredictedPrice(data.predicted_price)
    } catch (error) {
      console.error("Prediction fetch failed:", error)
      setPredictedPrice(null)
    }
  }

  return (
    <div className="p-4 min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-yellow-400">Gold Price Predictor</h1>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-8">
        {/* Left: Calendar + Predict */}
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
          <div className="bg-gray-900 p-6 rounded-xl shadow-md flex flex-col gap-4">
            <Label htmlFor="date" className="px-1 text-gray-200">
              Select Date
            </Label>

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-full justify-between font-normal bg-gray-100 text-black border-gray-700 hover:bg-gray-200"
                >{date 
  ? date.toLocaleDateString("en-US", { 
      day: "numeric", 
      month: "short", 
      year: "numeric" 
    }) 
  : "Select date"
}

                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                {/* <Calendar
                 
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  startMonth={new Date(2025, 0)}
                  endMonth={new Date(2100, 0)}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate)
                    setOpen(false)
                  }}
                /> */}
<Calendar
  mode="single"
  selected={date}
  captionLayout="dropdown"
  startMonth={new Date(2025, 0)}
  endMonth={new Date(2100, 0)}
  // className="bg-gray-800 text-black rounded-md p-2 shadow-inner"
  // classNames="bg-gray-800 text-white"
                // buttonVariant={""}
  onSelect={(selectedDate) => {
    setDate(selectedDate)
    setOpen(false)
  }}
/>


              </PopoverContent>
            </Popover>

            <Button
              className="bg-yellow-900 rounded-2xl p-3 cursor-pointer hover:bg-yellow-800"
              onClick={fetchData}
            >
              Get Predicted Price
            </Button>
          </div>

          {predictedPrice !== null && (
            <div className="bg-gray-900 p-6 rounded-xl shadow-md text-center">
              <span className="text-gray-300">Predicted Gold Price:</span>
              <div className="text-2xl font-bold text-green-400 mt-2">
  Rs{" "}
  {predictedPrice.toLocaleString("en-IN")}
</div>

            </div>
          )}
        </div>

        {/* Right: Historic Data */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <GoldPriceWidget />
        </div>
      </div>
    </div>
  )
}
