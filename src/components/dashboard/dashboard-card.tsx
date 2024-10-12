import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DashboardCardProps = {
  card: {
    title: string;
    amount: string;
    description: string;
    icon: React.ElementType;
  };
};

export default function DashboardCard({ card }: DashboardCardProps) {
  return (
    <Card key={card.title}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
        <card.icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{card.amount}</div>
        <p className="text-xs text-muted-foreground">{card.description}</p>
      </CardContent>
    </Card>
  );
}
