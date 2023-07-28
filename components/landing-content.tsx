"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const testimonais = [
    {
        name: "John Doe",
        avatar: "A",
        title: "CEO of Company A",
        description: "This is the best aplication I ever see"
    },
    {
        name: "John Doe",
        avatar: "A",
        title: "CEO of Company A",
        description: "This is the best aplication I ever see"
    },
    {
        name: "John Doe",
        avatar: "A",
        title: "CEO of Company A",
        description: "This is the best aplication I ever see"
    }
]

export const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4x1 text-white font-extrabold mb-10">
                Testimonais
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonais.map((item) => (
                    <Card key={item.description} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-zinc-400 text-sm">{item.title}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}