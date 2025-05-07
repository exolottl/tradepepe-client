import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const dummyTrades = [
  {
    id: 1,
    title: "BTC/USD Breakout",
    entry: 34000,
    exit: 35800,
    pnl: 1800,
    date: "2025-05-04",
    notes: "Breakout from triangle pattern on 4H chart.",
    tags: ["Breakout", "Crypto"],
  },
  {
    id: 2,
    title: "AAPL Earnings Swing",
    entry: 165,
    exit: 172,
    pnl: 700,
    date: "2025-05-01",
    notes: "Held through earnings. Risky but paid off.",
    tags: ["Swing", "Earnings", "Stocks"],
  },
  {
    id: 3,
    title: "EUR/USD Reversal",
    entry: 1.085,
    exit: 1.078,
    pnl: -700,
    date: "2025-04-28",
    notes: "Premature entry. Should’ve waited for confirmation.",
    tags: ["FX", "Reversal"],
  },
];

export default function HomePage() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyTrades.map((trade) => (
          <Card key={trade.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                {trade.title}
                <span className={`text-sm font-medium ${trade.pnl >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {trade.pnl >= 0 ? `+$${trade.pnl}` : `-$${Math.abs(trade.pnl)}`}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm text-muted-foreground">
                <p>Date: {trade.date}</p>
                <p>Entry: ${trade.entry} | Exit: ${trade.exit}</p>
              </div>
              <p className="text-sm">{trade.notes}</p>
              <div className="flex gap-2 flex-wrap">
                {trade.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <Button size="sm" variant="link" className="p-0 text-xs mt-2">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
