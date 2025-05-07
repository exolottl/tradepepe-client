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
  TableCaption,
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
  symbol: string;
  action: "Buy" | "Sell";
  quantity: number;
  price: number;
  total: number;
};

const formSchema = z.object({
  date: z.date(),
  symbol: z.string().min(1, "Symbol is required").max(5),
  action: z.enum(["Buy", "Sell"]),
  quantity: z.number().positive("Quantity must be positive"),
  price: z.number().positive("Price must be positive"),
});

const Journal = () => {
  // State to hold the trade entries
  const [tradeEntries, setTradeEntries] = useState<TradeEntry[]>([
    {
      id: 1,
      date: "2025-05-01",
      symbol: "AAPL",
      action: "Buy",
      quantity: 10,
      price: 150,
      total: 1500,
    },
    {
      id: 2,
      date: "2025-05-02",
      symbol: "TSLA",
      action: "Sell",
      quantity: 5,
      price: 750,
      total: 3750,
    },
    {
      id: 3,
      date: "2025-05-03",
      symbol: "GOOGL",
      action: "Buy",
      quantity: 20,
      price: 2800,
      total: 56000,
    },
  ]);

  // Filter trades into Long and Short
  const longTrades = tradeEntries.filter((trade) => trade.action === "Buy");
  const shortTrades = tradeEntries.filter((trade) => trade.action === "Sell");
  
  // Form setup with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      symbol: "",
      action: "Buy",
      quantity: 0,
      price: 0,
    },
  });

  // Handle form submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    const newTrade: TradeEntry = {
      id: Date.now(),
      date: format(values.date, "yyyy-MM-dd"),
      symbol: values.symbol.toUpperCase(),
      action: values.action,
      quantity: values.quantity,
      price: values.price,
      total: values.quantity * values.price,
    };
    
    setTradeEntries((prev) => [...prev, newTrade]);
    form.reset({
      date: new Date(),
      symbol: "",
      action: "Buy",
      quantity: 0,
      price: 0,
    });
  }

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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                                format(field.value, "PPP")
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

                {/* Quantity Field */}
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="10" 
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
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
                          placeholder="150.00" 
                          {...field}
                          onChange={e => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
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

      {/* Tables Container - Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Long Trades Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-green-600">Long Trades (Buy)</CardTitle>
            <CardDescription>
              Current positions you're holding
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {longTrades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>{trade.date}</TableCell>
                    <TableCell className="font-medium">{trade.symbol}</TableCell>
                    <TableCell>{trade.quantity}</TableCell>
                    <TableCell>${trade.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-semibold">${trade.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                {longTrades.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No long trades recorded</TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableCaption>
                Total: ${longTrades.reduce((sum, trade) => sum + trade.total, 0).toFixed(2)}
              </TableCaption>
            </Table>
          </CardContent>
        </Card>

        {/* Short Trades Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Short Trades (Sell)</CardTitle>
            <CardDescription>
              Positions you've sold
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shortTrades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell>{trade.date}</TableCell>
                    <TableCell className="font-medium">{trade.symbol}</TableCell>
                    <TableCell>{trade.quantity}</TableCell>
                    <TableCell>${trade.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-semibold">${trade.total.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                {shortTrades.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No short trades recorded</TableCell>
                  </TableRow>
                )}
              </TableBody>
              <TableCaption>
                Total: ${shortTrades.reduce((sum, trade) => sum + trade.total, 0).toFixed(2)}
              </TableCaption>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Journal
