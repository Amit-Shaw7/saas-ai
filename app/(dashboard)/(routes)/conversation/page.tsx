"use client";
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
import { useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/chat/index";

const Conversation = () => {
    const router = useRouter();
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
            const response = await axios.post("/api/conversation", {
                messages: newMessage
            });

            setMessages((prev) => [...prev, userMessage, response.data])
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
                title="Conversation"
                description="Chat with our Ai to get things done easily and quickly."
                icon={MessageSquare}
                bgColor="bg-violet-500/10"
                iconColor="text-violet-500"
            />

            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="
                                rounded-lg 
                                border
                                w-full
                                p-4
                                px-3
                                md:px-6
                                focus-within:shadow-sm
                                grid
                                grid-cols-12
                                gap-2
                            "
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 ld:cols-span-10 w-full">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="
                                                    border-0 
                                                    outline-none 
                                                    focus-visible:ring-0
                                                    focus-visible:ring-transparent
                                                "
                                                disabled={isLoading}
                                                placeholder="How to make a website?"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button disabled={isLoading} className="col-span-12 lg:col-span-2 w-full" type="submit">
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>

                <div className="space-y-4 mt-4">
                    <div className="flex flex-col-reverse gap-y-4">
                        {
                            messages.map((message, idx) => (
                                <div key={idx}>
                                    {message.content}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Conversation;