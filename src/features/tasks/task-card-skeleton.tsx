import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const TaskCardSkeleton = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-8 w-8 rounded-full" />
            </CardHeader>

            <CardContent>
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-8 w-2/3 mt-2" />
            </CardContent>
        </Card>
    )
}