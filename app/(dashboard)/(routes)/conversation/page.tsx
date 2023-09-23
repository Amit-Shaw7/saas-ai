"use client";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@/components/heading";

import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Conversation = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
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
                    Messages Content
                </div>
            </div>
        </div>
    )
}

export default Conversation;