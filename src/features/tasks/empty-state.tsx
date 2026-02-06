import { Button } from "@/components/ui/button"
import { ClipboardList } from "lucide-react"

interface Props {
    title?: string
    description?: string
    actionLabel?: string
    onAction?: () => void
}

export const EmptyState = ({
    title = "No task yet",
    description = "Create your first task to get started.",
    actionLabel = "Create task",
    onAction,
}: Props) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
            <ClipboardList className="h-12 w-12 text-muted-foreground mb-4" />

            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">{description}</p>

            {onAction && (
                <Button className="mt-6" onClick={onAction}>
                    {actionLabel}
                </Button>
            )}
        </div>
    )
}