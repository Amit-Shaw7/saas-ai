import { testimonials } from "@/app/(landing)/constants";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
        <h2 className="text-center text-4xl text-white font-extrabold mb-10">
            Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {
                testimonials.map((testimonial , idx) => (
                    <Card key={idx} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">
                                        {testimonial.name}
                                    </p>
                                    <p className="text-zinc-400 text-xs">
                                        {testimonial.title}
                                    </p>
                                </div>
                            </CardTitle>

                            <CardContent className="pt-4 px-0 text-center">
                                {testimonial.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))
            }
        </div>
    </div>
  )
}

export default LandingContent