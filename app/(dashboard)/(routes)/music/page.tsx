"use client";
import axios from "axios";
import { Music } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import Heading from "@/components/heading";

import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import Loader from "@/components/loader";
import { useState } from "react";

const MusicPage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const [music, setMusic] = useState<string>();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        try {
            setMusic(undefined);
            const response = await axios.post("/api/music", values);
            setMusic(response.data);
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
                title="Music Generation"
                description="Write your prompt and make it a music."
                icon={Music}
                bgColor="bg-emerald-500/10"
                iconColor="text-emerald-500"
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
                                                placeholder="Happy birthday tune using guitar"
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
                        !music && !isLoading && (
                            <Empty label="No music yet" />
                        )
                    }

                    {music && (
                        <audio
                            controls
                            className="w-full mt-8"
                        >
                            <source src={music} />
                        </audio>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MusicPage;