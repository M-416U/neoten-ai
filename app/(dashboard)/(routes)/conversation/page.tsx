"use client";
import { useForm } from "react-hook-form";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
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
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";

const ConversationPage = () => {
  const upgradeModal = useUpgradeModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const router = useRouter();
  const formSchema = z.object({
    prompt: z.string().min(1, {
      message: "Please say what you want",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });
  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];
      const response = await axios.post("/api/conversation", {
        messages: newMessages,
      });

      setMessages((prev: any) => [...prev, userMessage, response.data]);

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
        title="Conversation"
        description="Our most advanced conversation model."
        icon={ChatBubbleIcon}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl>
                    <Input
                      className="border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="How to calculate radius of a circle?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full col-span-12 lg:col-span-2"
              disabled={isLoading}
            >
              answer
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4 px-8">
        {isLoading && (
          <div className="flex items-center justify-center w-full">
            <Loader />
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <Empty message="No conversation started." />
        )}
        <div className="flex flex-col gap-y-4">
          {messages.map((message) => (
            <div
              key={message.content}
              className={cn(
                "p-8 rounded-lg flex items-start gap-x-8",
                message.role === "user"
                  ? "bg-white border border-black/10 flex-row-reverse"
                  : "bg-muted"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
