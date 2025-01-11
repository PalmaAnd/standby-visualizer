import { Info } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

interface InfoTooltipProps {
    content: string
}

export function InfoTooltip({ content }: InfoTooltipProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Info className="h-4 w-4 inline-block ml-1 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

