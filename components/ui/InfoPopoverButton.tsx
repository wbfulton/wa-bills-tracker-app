'use client'
import { InfoIcon } from "lucide-react"
import { Button } from "./button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./card"
import { Popover, PopoverContent, PopoverTrigger } from "./Popover"
import { PopoverContentProps } from "@radix-ui/react-popover"

interface InfoPopoverButtonProps extends Pick<PopoverContentProps, 'align' | 'side'> {
    title: string,
    description: string
}

/**
 * Customer popover button
 */
export const InfoPopoverButton = ({ align, side, title, description }: InfoPopoverButtonProps) => {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" className="ml-2 h-6 w-6 p-1 hover:bg-primary/10">
                    <InfoIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent align={align} side={side}>
                <Card className="border-0 m-0 shadow-none">
                    <CardHeader className="border-0 p-2 m-0">
                        <CardTitle>{title}</CardTitle>
                    </CardHeader>
                    <CardContent className="border-0 p-2 m-0">
                        <CardDescription>
                            {description}
                        </CardDescription></CardContent>
                </Card>
            </PopoverContent>
        </Popover>

    )
}