
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Badges() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Badges</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold">3</div>
                    <div className="text-sm text-muted-foreground">Most Recent Badge: 100 Days Badge 2025</div>
                </div>
                <div className="flex mt-4 space-x-2">
                    <Badge>100 Days</Badge>
                    <Badge>50 Days</Badge>
                    <Badge>5 May</Badge>
                </div>
            </CardContent>
        </Card>
    );
}
