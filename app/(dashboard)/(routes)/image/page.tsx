"use client";

import { axios } from "@/lib/axios" ; 
import * as z from "zod";
import { ImageIcon, Download } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState } from "react";
import Image from "next/image";

import { 
    Select,
    SelectTrigger,
    SelectValue,
    SelectItem,
    SelectContent
} from "@/components/ui/select"

import { 
    Form,
    FormControl,
    FormField,
    FormItem, 
} from "@/components/ui/form"
import { Heading } from "@/components/heading"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { Card, CardFooter } from "@/components/ui/card";

import {
    formSchema,
    amountOptions,
    resolutionOptions
} from "./constants";
import toast from "react-hot-toast";


const ImagePage = () => {
    const router = useRouter();
    const [images, setImages] = useState<string[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setImages([])

            const response = await axios.post("/api/image", values);

            const urls = response.data.map(( image: { url: string } ) => image.url);

            setImages(urls)
            form.reset()
        } catch (error: any) {
            toast.error("Something went wrong")
            console.log("[CONVERSATION_ERROR] ", error)
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading 
                title="Gerador de Imagem"
                description="Torne o prompt em imagem."
                Icon={ImageIcon}
                iconColor="text-pink-700"
                bgColor="bg-pink-700/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6
                            focus-withing:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField 
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            id="prompt"
                                            placeholder="Uma pintura de um cavalo nos alpes suiços"
                                            {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="amount"
                                render={({ field }) => (
                                    <FormItem className="col-span lg:col-span-6">
                                        <Select 
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            
                                            <SelectContent>
                                                {amountOptions.map((option, index) => (
                                                    <SelectItem key={index} value={option.value} >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                control={form.control}
                                name="resolution"
                                render={({ field }) => (
                                    <FormItem className="col-span lg:col-span-6">
                                        <Select 
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value}/>
                                                </SelectTrigger>
                                            </FormControl>
                                            
                                            <SelectContent>
                                                {resolutionOptions.map((option, index) => (
                                                    <SelectItem key={index} value={option.value} >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" 
                            disabled={isLoading}>
                                Gerar
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-20">
                            <Loader />
                        </div>
                    )}

                    {images.length == 0 && !isLoading &&  (
                        <Empty label="Nenhuma imagem gerada."/>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {images.map((src) => (
                            <Card key={src} className="rounded-lg overflow-hidden">
                                <div className="relative aspect-square">
                                    <Image 
                                        alt="Image"
                                        fill
                                        src={src}
                                    />
                                </div>
                                <CardFooter className="p-2">
                                    <Button 
                                        onClick={() => window.open(src, "_blank")}
                                        variant="secondary"
                                        className="w-full">
                                        <Download className="h-4 w-4 mr-2"/>
                                        Download
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImagePage