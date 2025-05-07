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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { format } from "date-fns";

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

  // New blank trade entry for direct input
  const [newTrade, setNewTrade] = useState<Partial<TradeEntry>>({
    date: format(new Date(), "dd/MM/yy"),
    time: format(new Date(), "hh:mma"),
    symbol: "",
    qty: 0,
    action: "Buy",
    setup: "",
    review: "",
    price: 0,
    result: "",
    resultValue: 0,
  });

  // Handle change in new trade entry fields
  const handleNewTradeChange = (field: keyof TradeEntry, value: any) => {
    setNewTrade(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Add new trade to the list
  const addNewTrade = () => {
    if (!newTrade.symbol || !newTrade.qty || !newTrade.price) {
      return; // Don't add incomplete trades
    }

    const tradeToAdd: TradeEntry = {
      id: Date.now(),
      date: newTrade.date || format(new Date(), "dd/MM/yy"),
      time: newTrade.time || format(new Date(), "hh:mma"),
      symbol: newTrade.symbol || "",
      qty: newTrade.qty || 0,
      action: newTrade.action || "Buy",
      setup: newTrade.setup || "N/A",
      review: newTrade.review || "N/A",
      price: newTrade.price || 0,
      result: newTrade.resultValue ? `${newTrade.resultValue < 0 ? "-" : ""}$ ${Math.abs(newTrade.resultValue).toLocaleString()}` : "",
      resultValue: newTrade.resultValue || 0,
    };
    
    setTradeEntries(prev => [...prev, tradeToAdd]);
    
    // Reset the new trade entry
    setNewTrade({
      date: format(new Date(), "dd/MM/yy"),
      time: format(new Date(), "hh:mma"),
      symbol: "",
      qty: 0,
      action: "Buy",
      setup: "",
      review: "",
      price: 0,
      result: "",
      resultValue: 0,
    });
  };

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
              {/* Row for adding new trade */}
              <TableRow className="border-t-2 border-b-2 border-dashed border-primary/20">
                <TableCell className={newTrade.action === "Buy" ? "" : "bg-gray-100"}>
                  {newTrade.action === "Buy" && (
                    <Input 
                      value={newTrade.date || ""} 
                      onChange={(e) => handleNewTradeChange("date", e.target.value)} 
                      className="h-8" 
                      placeholder="DD/MM/YY"
                    />
                  )}
                </TableCell>
                <TableCell className={newTrade.action === "Buy" ? "" : "bg-gray-100"}>
                  {newTrade.action === "Buy" && (
                    <Input 
                      value={newTrade.time || ""} 
                      onChange={(e) => handleNewTradeChange("time", e.target.value)} 
                      className="h-8" 
                      placeholder="HH:MMA"
                    />
                  )}
                </TableCell>
                <TableCell className={newTrade.action === "Buy" ? "" : "bg-gray-100"}>
                  {newTrade.action === "Buy" && (
                    <Input 
                      type="number" 
                      value={newTrade.qty || ""} 
                      onChange={(e) => handleNewTradeChange("qty", Number(e.target.value))} 
                      className="h-8" 
                      placeholder="100"
                    />
                  )}
                </TableCell>
                <TableCell className={newTrade.action === "Buy" ? "" : "bg-gray-100"}>
                  {newTrade.action === "Buy" && (
                    <Input 
                      value={newTrade.symbol || ""} 
                      onChange={(e) => handleNewTradeChange("symbol", e.target.value.toUpperCase())} 
                      className="h-8" 
                      placeholder="AAPL"
                    />
                  )}
                </TableCell>
                <TableCell className={newTrade.action === "Buy" ? "" : "bg-gray-100"}>
                  {newTrade.action === "Buy" && (
                    <Select 
                      value={newTrade.setup || ""} 
                      onValueChange={(value) => handleNewTradeChange("setup", value)}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Setup" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breakout">Breakout</SelectItem>
                        <SelectItem value="Reversal">Reversal</SelectItem>
                        <SelectItem value="Vwap">Vwap</SelectItem>
                        <SelectItem value="N/A">N/A</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </TableCell>
                <TableCell className={newTrade.action === "Buy" ? "" : "bg-gray-100"}>
                  {newTrade.action === "Buy" && (
                    <Select 
                      value={newTrade.review || ""} 
                      onValueChange={(value) => handleNewTradeChange("review", value)}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Review" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Good Entry">Good Entry</SelectItem>
                        <SelectItem value="Early Entry">Early Entry</SelectItem>
                        <SelectItem value="SL Hit">SL Hit</SelectItem>
                        <SelectItem value="N/A">N/A</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </TableCell>
                <TableCell>
                  <Input 
                    type="number" 
                    value={newTrade.price || ""} 
                    onChange={(e) => handleNewTradeChange("price", Number(e.target.value))} 
                    className="h-8" 
                    placeholder="0.00"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Input 
                      type="number" 
                      value={newTrade.resultValue || ""} 
                      onChange={(e) => handleNewTradeChange("resultValue", Number(e.target.value))} 
                      className="h-8" 
                      placeholder="0.00"
                    />
                    <Select 
                      value={newTrade.action || "Buy"} 
                      onValueChange={(value: "Buy" | "Sell") => handleNewTradeChange("action", value)}
                    >
                      <SelectTrigger className="h-8 w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Buy">Buy</SelectItem>
                        <SelectItem value="Sell">Sell</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={addNewTrade} size="sm" className="h-8">Add</Button>
                  </div>
                </TableCell>
                <TableCell>
                  <Input 
                    type="number" 
                    value={newTrade.price || ""} 
                    onChange={(e) => handleNewTradeChange("price", Number(e.target.value))} 
                    className="h-8" 
                    placeholder="0.00"
                    disabled={newTrade.action !== "Sell"}
                  />
                </TableCell>
                <TableCell className={newTrade.action === "Sell" ? "" : "bg-gray-100"}>
                  {newTrade.action === "Sell" && (
                    <Select 
                      value={newTrade.review || ""} 
                      onValueChange={(value) => handleNewTradeChange("review", value)}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Review" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Good Entry">Good Entry</SelectItem>
                        <SelectItem value="Early Entry">Early Entry</SelectItem>
                        <SelectItem value="SL Hit">SL Hit</SelectItem>
                        <SelectItem value="N/A">N/A</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </TableCell>
                <TableCell className={newTrade.action === "Sell" ? "" : "bg-gray-100"}>
                  {newTrade.action === "Sell" && (
                    <Select 
                      value={newTrade.setup || ""} 
                      onValueChange={(value) => handleNewTradeChange("setup", value)}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue placeholder="Setup" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Breakout">Breakout</SelectItem>
                        <SelectItem value="Reversal">Reversal</SelectItem>
                        <SelectItem value="Vwap">Vwap</SelectItem>
                        <SelectItem value="N/A">N/A</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </TableCell>
                <TableCell className={newTrade.action === "Sell" ? "" : "bg-gray-100"}>
                  {newTrade.action === "Sell" && (
                    <Input 
                      value={newTrade.symbol || ""} 
                      onChange={(e) => handleNewTradeChange("symbol", e.target.value.toUpperCase())} 
                      className="h-8" 
                      placeholder="AAPL"
                    />
                  )}
                </TableCell>
                <TableCell className={newTrade.action === "Sell" ? "" : "bg-gray-100"}>
                  {newTrade.action === "Sell" && (
                    <Input 
                      type="number" 
                      value={newTrade.qty || ""} 
                      onChange={(e) => handleNewTradeChange("qty", Number(e.target.value))} 
                      className="h-8" 
                      placeholder="100"
                    />
                  )}
                </TableCell>
                <TableCell className={newTrade.action === "Sell" ? "" : "bg-gray-100"}>
                  {newTrade.action === "Sell" && (
                    <Input 
                      value={newTrade.time || ""} 
                      onChange={(e) => handleNewTradeChange("time", e.target.value)} 
                      className="h-8" 
                      placeholder="HH:MMA"
                    />
                  )}
                </TableCell>
                <TableCell className={newTrade.action === "Sell" ? "" : "bg-gray-100"}>
                  {newTrade.action === "Sell" && (
                    <Input 
                      value={newTrade.date || ""} 
                      onChange={(e) => handleNewTradeChange("date", e.target.value)} 
                      className="h-8" 
                      placeholder="DD/MM/YY"
                    />
                  )}
                </TableCell>
              </TableRow>

              {/* Display existing trades */}
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
