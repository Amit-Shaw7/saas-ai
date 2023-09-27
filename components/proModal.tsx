"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useApp } from "@/store/AppContext";
import { Badge } from "@/components/ui/badge";
import { tools } from "@/constants";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onOpen, onClose } = useApp();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-2 font-bold">
              Upgrade
              <Badge
                variant="premium"
                className="uppercase text-sm py-1"
              >
                pro
              </Badge>
            </div>
          </DialogTitle>

          <DialogDescription className="text-center pt-3 space-y-2  text-zinc-900 font-mediums">
            {
              tools?.map((tool) => (
                <Card
                  key={tool.label}
                  className="p-2 border-black/5 flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("h-6 , w-6", tool.color)} />
                    </div>
                    <div className="font-semibold text-sm">
                      {tool.label}
                    </div>
                  </div>
                  <Check className="text-primary w-4 h-4" />
                </Card>
              ))
            }
          </DialogDescription>

          <DialogFooter>
            <Button
              size="lg"
              variant="premium"
              className="w-full mt-6"
            >
              Upgrade
              <Zap className="w-4 h-4 ml-2 fill-white" />
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ProModal;