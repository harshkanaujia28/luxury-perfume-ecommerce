import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function OrderCardSkeleton() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-2xl font-bold">
          <Skeleton className="h-8 w-48" />
        </CardTitle>
        <Skeleton className="h-6 w-24 rounded-full" />
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <div className="grid gap-1">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-48" />
          </div>
        </div>
        <div>
          <Skeleton className="h-6 w-32 mb-2" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
