"use client";
import { useForm } from "react-hook-form";
import { ImageIcon } from "@radix-ui/react-icons";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatCompletionRequestMessage } from "openai";

import { Heading } from "@/components/heading";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Empty from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { amountOptions, resolutionOptions } from "./constants";
import ImageCard from "@/components/image-card";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";

const ConversationPage = () => {
  const upgradeModal = useUpgradeModal();
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();
  const formSchema = z.object({
    prompt: z.string().min(1, {
      message: "add the text so i can turn it to something",
    }),
    amount: z
      .string()
      .min(1, { message: "Please provider amount of images you want" }),
    resolution: z
      .string()
      .min(1, { message: "Please provider resolution for images you want" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post("/api/image", values);
      const urls = response.data.map((image: { url: string }) => image.url);

      setImages(urls);

      form.reset();
    } catch (error) {
      if (error?.response?.status === 403) {
        upgradeModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title="Images Generator"
        description="Create most beutiful Images from text."
        icon={ImageIcon}
        iconColor="text-pink-700"
        bgColor="bg-pink-700/10"
      />
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
            rounded-lg
            border
            w-full
            px-3
            md:px-6
            p-4
            focus-within:shadow-sm
            grid
            grid-cols-12
            gap-2
            "
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <FormControl>
                    <Input
                      className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Imagine a serene beach with calm turquoise waters"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {amountOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="resolution"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-2">
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full col-span-12 lg:col-span-2"
              disabled={isLoading}
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4 px-8">
        {isLoading && (
          <div className="flex items-center p-20 justify-center w-full">
            <Loader />
          </div>
        )}
        {images.length === 0 && !isLoading && (
          <Empty message="No conversation started." />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {images.map((src) => (
            <ImageCard key={src} source={src} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
