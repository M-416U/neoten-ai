"use client";
import { useForm } from "react-hook-form";
import { CodeIcon, CopyIcon } from "@radix-ui/react-icons";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatCompletionRequestMessage } from "openai";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
import UserAvatar from "@/components/user-avatar";
import BotAvatar from "@/components/bot-avatar";
import { cn } from "@/lib/utils";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";

const CodePage = () => {
  const upgradeModal = useUpgradeModal();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const router = useRouter();
  const formSchema = z.object({
    prompt: z.string().min(1, {
      message: "Please say your question",
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
      const response = await axios.post("/api/code", {
        messages: newMessages,
      });

      setMessages((prev: any) => [...prev, userMessage, response.data]);

      form.reset();
    } catch (error: any) {
      if (error?.response?.status && error?.response?.status === 403) {
        upgradeModal.onOpen();
      }
    } finally {
      router.refresh();
    }
  };
  const onCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  return (
    <div>
      <Heading
        title="Coder"
        description="Generate code using descriptive text."
        icon={CodeIcon}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
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
                      placeholder="Simple snake game with python"
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
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 py-4 px-8">
        {isLoading && (
          <div className="flex items-center p-20 justify-center w-full">
            <Loader />
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <Empty message="Start making codes." />
        )}
        <div className="flex flex-col-reverse gap-y-4">
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
              <ReactMarkdown
                components={{
                  pre: ({ node, ...props }: any) => (
                    <div className="overflow-auto w-full my-2 p-0  rounded-lg relative sch bg-white/10">
                      <div
                        className="absolute top-4 right-4 z-40 w-8 h-8 flex items-center justify-center bg-white/50 rounded-lg hover:text-black/90 hover:bg-white/100 cursor-pointer"
                        onClick={() => {
                          onCopy(node?.children[0].children[0].value);
                          console.log(
                            "node:",
                            node?.children[0].properties.className[0].split(
                              "language-"
                            )[1]
                          );
                        }}
                      >
                        <CopyIcon />
                      </div>
                      <Highlighter
                        value={node?.children[0].children[0].value || ""}
                        language={
                          node?.children[0].properties.className[0]?.split(
                            "language-"
                          )[1] || "python"
                        }
                      />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code
                      className="bg-black text-white rounded-lg p-1"
                      {...props}
                    />
                  ),
                }}
                className="text-sm overflow-hidden leading-7"
              >
                {message.content || ""}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CodePage;

const Highlighter = ({
  value,
  language,
}: {
  value: string;
  language: string;
}) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={anOldHope}
      showLineNumbers={true}
      customStyle={{
        backgroundColor: "rgba(17, 24, 39 , 0.9);",
        scrollbarWidth: "thin",
        scrollbarColor: "gray lightgray",
        msScrollbarTrackColor: "transparent",
      }}
    >
      {value}
    </SyntaxHighlighter>
  );
};
