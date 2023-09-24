"use client";
import axios from "axios";
import { Download, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Heading from "@/components/heading";

import { amountOptions, formSchema, resolutions } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/userAvatar";
import { BotAvatar } from "@/components/botAvatar";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { Card, CardFooter } from "@/components/ui/card";

const Imagepage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
            amount: "1",
            resolution: "512x512"
        }
    });

    const isLoading = form.formState.isSubmitting;

    const [images, setImages] = useState([]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            setImages([]);
            const response = await axios.post("/api/image", values);
            const urls = response.data.map((image: { url: string }) => image.url);
            setImages(urls);
            form.reset();
        } catch (error) {
            console.log(error);
            // Todo - Open Upgrade modal
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Image Generation"
                description="Write your prompt and make it an image."
                icon={ImageIcon}
                bgColor="bg-pink-700/10"
                iconColor="text-pink-500"
            />

            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-6 w-full">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="A picture of dog in kennel"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="amount"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2 w-full">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl className="p-1 ">
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent>
                                                {
                                                    amountOptions.map((amount) => (
                                                        <SelectItem
                                                            value={amount.value}
                                                            key={amount.value}
                                                        >
                                                            {amount.label}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                name="resolution"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-2 w-full">
                                        <Select
                                            disabled={isLoading}
                                            onValueChange={field.onChange}
                                            value={field.value}
                                            defaultValue={field.value}
                                        >
                                            <FormControl className="p-1 ">
                                                <SelectTrigger>
                                                    <SelectValue defaultValue={field.value} />
                                                </SelectTrigger>
                                            </FormControl>

                                            <SelectContent className="z-10">
                                                {
                                                    resolutions.map((resolution) => (
                                                        <SelectItem
                                                            value={resolution.value}
                                                            key={resolution.value}
                                                        >
                                                            {resolution.label}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />

                            <Button
                                disabled={isLoading}
                                className="col-span-12 lg:col-span-2 w-full"
                                type="submit"
                            >
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="space-y-4 mt-8">

                    {
                        isLoading && (
                            <Loader />
                        )
                    }

                    {
                        images.length === 0 && !isLoading && (
                            <Empty label="No images yet" />
                        )
                    }

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
                        {
                            images?.map((image) => (
                                <Card
                                    key={image}
                                    className="rounded-lg overflow-hidden"
                                >
                                    <div className="relative aspect-square">
                                        <Image
                                            src={image}
                                            alt="Image"
                                            fill
                                        />
                                    </div>
                                    <CardFooter className="p-2">
                                        <Button
                                            variant="secondary"
                                            className="w-full"
                                            onClick={() => window.open(image)}
                                        >
                                            <Download className="h-4 w-4 mr-2" />
                                            Downlaod
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Imagepage;