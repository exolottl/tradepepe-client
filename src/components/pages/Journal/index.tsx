import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type TradeEntry = {
  id: number;
  date: string;
  time: string;
  symbol: string;
  qty: number;
  action: "Buy" | "Sell";
  setup: string;
  review: string;
  price: number;
  result: string;
  resultValue: number;
};

const formSchema = z.object({
  date: z.date(),
  time: z.string(),
  symbol: z.string().min(1, "Symbol is required").max(5),
  qty: z.number().positive("Quantity must be positive"),
  action: z.enum(["Buy", "Sell"]),
  setup: z.string(),
  price: z.number().positive("Price must be positive"),
  review: z.string().optional(),
  result: z.string().optional(),
  resultValue: z.number().optional(),
});

const Journal = () => {
  // State to hold the trade entries
  const [tradeEntries, setTradeEntries] = useState<TradeEntry[]>([
    {
      id: 1,
      date: "23/12/24",
      time: "09:14AM",
      symbol: "AAPL",
      qty: 100,
      action: "Buy",
      setup: "Breakout",
      review: "Good Entry",
      price: 180,
      result: "$ 650",
      resultValue: 650,
    },
    {
      id: 2,
      date: "23/12/24",
      time: "09:50AM",
      symbol: "AAPL",
      qty: 75,
      action: "Sell",
      setup: "Reversal",
      review: "Early Entry",
      price: 183,
      result: "$ 510",
      resultValue: 510,
    },
    {
      id: 3,
      date: "23/12/24",
      time: "10:15AM",
      symbol: "AAPL",
      qty: 100,
      action: "Buy",
      setup: "Reversal",
      review: "Early Entry",
      price: 180,
      result: "$ 1,000",
      resultValue: 1000,
    },
    {
      id: 4,
      date: "23/12/24",
      time: "11:05AM",
      symbol: "AAPL",
      qty: 100,
      action: "Sell",
      setup: "N/A",
      review: "SL Hit",
      price: 178,
      result: "-$ 200",
      resultValue: -200,
    },
  ]);

  // Form setup with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      time: format(new Date(), "hh:mma"),
      symbol: "",
      qty: 0,
      action: "Buy",
      setup: "",
      price: 0,
      review: "",
      result: "",
      resultValue: 0,
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    const newTrade: TradeEntry = {
      id: Date.now(),
      date: format(values.date, "dd/MM/yy"),
      time: values.time,
      symbol: values.symbol.toUpperCase(),
      qty: values.qty,
      action: values.action,
      setup: values.setup,
      review: values.review || "",
      price: values.price,
      result: values.resultValue ? `${values.resultValue < 0 ? "-" : ""}$ ${Math.abs(values.resultValue).toLocaleString()}` : "",
      resultValue: values.resultValue || 0,
    };
    
    setTradeEntries((prev) => [...prev, newTrade]);
    form.reset({
      date: new Date(),
      time: format(new Date(), "hh:mma"),
      symbol: "",
      qty: 0,
      action: "Buy",
      setup: "",
      price: 0,
      review: "",
      result: "",
      resultValue: 0,
    });
  }

  // Sort trades by date and time
  const sortedTrades = [...tradeEntries].sort((a, b) => {
    const dateCompare = new Date(a.date.split('/').reverse().join('-')) - 
                        new Date(b.date.split('/').reverse().join('-'));
    if (dateCompare !== 0) return dateCompare;
    return a.time.localeCompare(b.time);
  });

  return (
    <div className="container mx-auto py-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Trade Journal</CardTitle>
          <CardDescription>
            Record and track your trading activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Date Field */}
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />

                {/* Time Field */}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input placeholder="09:30AM" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Quantity Field */}
                <FormField
                  control={form.control}
                  name="qty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Qty</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="100" 
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Symbol Field */}
                <FormField
                  control={form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Symbol</FormLabel>
                      <FormControl>
                        <Input placeholder="AAPL" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Setup Field */}
                <FormField
                  control={form.control}
                  name="setup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Setup</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select setup" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Breakout">Breakout</SelectItem>
                          <SelectItem value="Reversal">Reversal</SelectItem>
                          <SelectItem value="Vwap">Vwap</SelectItem>
                          <SelectItem value="N/A">N/A</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Review Field */}
                <FormField
                  control={form.control}
                  name="review"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select review" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Good Entry">Good Entry</SelectItem>
                          <SelectItem value="Early Entry">Early Entry</SelectItem>
                          <SelectItem value="SL Hit">SL Hit</SelectItem>
                          <SelectItem value="Profit Exit">Profit Exit</SelectItem>
                          <SelectItem value="Partial Exit">Partial Exit</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Price Field */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="180.00" 
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Result Value Field */}
                <FormField
                  control={form.control}
                  name="resultValue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Result ($)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Action Field */}
                <FormField
                  control={form.control}
                  name="action"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Action</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select action" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Buy">Buy</SelectItem>
                          <SelectItem value="Sell">Sell</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="self-end">
                  Add Trade
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Unified Trades Table */}
      <Card>
        <CardHeader>
          <CardTitle>Trade History</CardTitle>
          <CardDescription>
            Complete record of your trading activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Setup</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Setup</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTrades.map((trade) => (
                <TableRow key={trade.id} className={trade.action === "Buy" ? "bg-green-50/10" : "bg-red-50/10"}>
                  <TableCell>{trade.action === "Buy" ? trade.date : ""}</TableCell>
                  <TableCell>{trade.action === "Buy" ? trade.time : ""}</TableCell>
                  <TableCell>{trade.action === "Buy" ? trade.qty : ""}</TableCell>
                  <TableCell className={trade.action === "Buy" ? "font-medium" : ""}>{trade.action === "Buy" ? trade.symbol : ""}</TableCell>
                  <TableCell>
                    {trade.action === "Buy" && (
                      <span className={`px-2 py-1 rounded text-xs ${getSetupClass(trade.setup)}`}>
                        {trade.setup}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {trade.action === "Buy" && (
                      <span className={`px-2 py-1 rounded text-xs ${getReviewClass(trade.review)}`}>
                        {trade.review}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">${trade.price.toFixed(2)}</TableCell>
                  <TableCell className={`font-bold ${trade.resultValue < 0 ? "text-red-500" : "text-green-500"}`}>{trade.result}</TableCell>
                  <TableCell className="font-medium">${trade.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {trade.action === "Sell" && (
                      <span className={`px-2 py-1 rounded text-xs ${getReviewClass(trade.review)}`}>
                        {trade.review}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {trade.action === "Sell" && (
                      <span className={`px-2 py-1 rounded text-xs ${getSetupClass(trade.setup)}`}>
                        {trade.setup}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className={trade.action === "Sell" ? "font-medium" : ""}>{trade.action === "Sell" ? trade.symbol : ""}</TableCell>
                  <TableCell>{trade.action === "Sell" ? trade.qty : ""}</TableCell>
                  <TableCell>{trade.action === "Sell" ? trade.time : ""}</TableCell>
                  <TableCell>{trade.action === "Sell" ? trade.date : ""}</TableCell>
                </TableRow>
              ))}
              {tradeEntries.length === 0 && (
                <TableRow>
                  <TableCell colSpan={15} className="text-center">No trades recorded</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper functions for styling
function getSetupClass(setup: string) {
  switch (setup) {
    case "Breakout":
      return "bg-yellow-100 text-yellow-800";
    case "Reversal":
      return "bg-blue-100 text-blue-800";
    case "Vwap":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function getReviewClass(review: string) {
  switch (review) {
    case "Good Entry":
      return "bg-green-100 text-green-800";
    case "Early Entry":
      return "bg-blue-100 text-blue-800";
    case "SL Hit":
      return "bg-red-100 text-red-800";
    case "Profit Exit":
      return "bg-green-100 text-green-800";
    case "Partial Exit":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export default Journal;
