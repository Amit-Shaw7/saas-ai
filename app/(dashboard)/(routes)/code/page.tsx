"use client";
import { useState } from "react";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Heading from "@/components/heading";

import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatCompletionMessageParam } from "openai/resources/chat/index";
import { Empty } from "@/components/empty";
import Loader from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/userAvatar";
import { BotAvatar } from "@/components/botAvatar";
import ReactMarkdown from "react-markdown";
import { useApp } from "@/store/AppContext";

const Codepage = () => {
    const router = useRouter();
    const {onOpen} = useApp();
    const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            const userMessage: ChatCompletionMessageParam = {
                role: "user",
                content: values.prompt
            }
            const newMessage = [...messages, userMessage];
            const response = await axios.post("/api/code", {
                messages: newMessage
            });

            setMessages((prev) => [...prev, userMessage, response.data])
            form.reset();
        } catch (error: any) {
            if (error?.response?.status === 403) {
                onOpen();
            }
        } finally {
            router.refresh();
        }
    }

    return (
        <div>
            <Heading
                title="Code Generation"
                description="Chat and generate code in your preffered language"
                icon={MessageSquare}
                bgColor="bg-green-700/10"
                iconColor="text-green-500"
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
                                    <FormItem className="col-span-12 lg:col-span-10 w-full">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Simple Button using react and tailwind css"
                                                {...field}
                                            />
                                        </FormControl>
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
                        messages.length === 0 && !isLoading && (
                            <Empty label="No conversations yet" />
                        )
                    }
                    <div className="flex flex-col-reverse gap-y-4">
                        {
                            messages.map((message, idx) => (
                                <div
                                    key={idx}
                                    className={cn("p-4 w-full flex items-start gap-x-8 rounded-lg", message.role === "user" ? "bg-white border border-black/10" : "bg-gray-500/10")}
                                >
                                    {message.role === "user" ? <UserAvatar /> : <BotAvatar />}

                                    <ReactMarkdown
                                        components={{
                                            pre: ({ node, ...props }) => (
                                                <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                                    <pre {...props} />
                                                </div>
                                            ),
                                            code: ({ node, ...props }) => (
                                                <code className="bg-black/10 rounded-lg p-1" {...props} />
                                            )
                                        }}
                                        className="text-sm overflow-hidden leading-7"
                                    >
                                        {message.content || ""}
                                    </ReactMarkdown>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Codepage;