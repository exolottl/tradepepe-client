import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

type OrderType = {
  id: number;
  date: string;
  time: string;
  symbol: string;
  qty: number;
  action: "Buy" | "Sell";
  setup: string;
  review: string;
  price: number;
  note: string;
};

type TradeType = {
  id: number;
  symbol: string;
  direction: "Long" | "Short";
  buyOrders: OrderType[];
  sellOrders: OrderType[];
  netResult: number;
  date: string;
};

const Index = () => {
  const [trades, setTrades] = useState<TradeType[]>([
    {
      id: Date.now(),
      symbol: "BTC/USDT",
      direction: "Long",
      buyOrders: [
        {
          id: 1,
          date: "2025-05-10",
          time: "14:30",
          symbol: "BTC/USDT",
          qty: 1,
          action: "Buy",
          setup: "Breakout",
          review: "Good entry on volume spike",
          price: 60000,
          note: "Entered on 1H breakout",
        },
      ],
      sellOrders: [
        {
          id: 2,
          date: "2025-05-10",
          time: "15:00",
          symbol: "BTC/USDT",
          qty: 1,
          action: "Sell",
          setup: "TP level",
          review: "Closed near resistance",
          price: 61000,
          note: "TP hit, good R:R",
        },
      ],
      netResult: 1000,
      date: "2025-05-10",
    },
  ]);

  const [buyOrders, setBuyOrders] = useState<OrderType[]>([]);
  const [sellOrders, setSellOrders] = useState<OrderType[]>([]);
  const [symbol, setSymbol] = useState("");
  const [direction, setDirection] = useState<"Long" | "Short">("Long");

  const handleAddBuyOrder = () => {
    setBuyOrders((prev) => [
      ...prev,
      {
        id: Date.now(),
        date: "2025-05-10",
        time: "14:30",
        symbol,
        qty: 1,
        action: "Buy",
        setup: "Breakout",
        review: "Strong breakout candle",
        price: 60000,
        note: "Good volume",
      },
    ]);
  };

  const handleAddSellOrder = () => {
    setSellOrders((prev) => [
      ...prev,
      {
        id: Date.now(),
        date: "2025-05-10",
        time: "15:00",
        symbol,
        qty: 1,
        action: "Sell",
        setup: "TP zone",
        review: "Exhaustion near resistance",
        price: 61000,
        note: "Closed for profit",
      },
    ]);
  };

  const handleAddTrade = () => {
    const netResult =
      sellOrders.reduce((acc, o) => acc + o.price * o.qty, 0) -
      buyOrders.reduce((acc, o) => acc + o.price * o.qty, 0);

    const newTrade: TradeType = {
      id: Date.now(),
      symbol,
      direction,
      buyOrders,
      sellOrders,
      netResult,
      date: new Date().toISOString().slice(0, 10),
    };

    setTrades((prev) => [newTrade, ...prev]);
    setBuyOrders([]);
    setSellOrders([]);
    setSymbol("");
  };


  return (
    <div className="p-8 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Start journaling your trades</h2>
        <Button onClick={handleAddTrade} className="flex items-center gap-2">
          <PlusIcon size={16} /> Add Trade
        </Button>
      </div>

      {trades.length === 0 ? (
        <p className="text-gray-500">No trades added yet.</p>
      ) : (
        <div className="space-y-4">
          {trades.map((trade) => (
            <Card key={trade.id} className="border p-4 rounded-lg shadow-sm">
              <CardHeader className="text-lg font-medium">
                {trade.symbol} — {trade.direction}
              </CardHeader>
              <CardContent className="grid grid-cols-3 items-center">
                <div className="mt-2">
                  <p className="font-semibold">Buy Orders:</p>
                  <ul className="list-disc ml-5 text-sm">
                    {trade.buyOrders.map((order) => (
                      <li key={order.id}>
                        {order.time} — {order.qty} @ ${order.price} (
                        {order.setup})
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="text-sm text-gray-600">Date: {trade.date}</p>
                  <p className="text-sm text-gray-600">
                    Net Result: ${trade.netResult}
                  </p>
                </div>

                <div className="flex flex-col justify-center">
                  <p className="font-semibold">Sell Orders:</p>
                  <ul className="list-disc ml-5 text-sm">
                    {trade.sellOrders.map((order) => (
                      <li key={order.id}>
                        {order.time} — {order.qty} @ ${order.price} (
                        {order.setup})
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
