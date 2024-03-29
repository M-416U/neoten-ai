"use client";
import { useForm } from "react-hook-form";
import { SpeakerLoudIcon, SpeakerModerateIcon } from "@radix-ui/react-icons";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";

const ConversationPage = () => {
  const upgradeModal = useUpgradeModal();
  const [music, setMusic] = useState<string>();
  const router = useRouter();
  const formSchema = z.object({
    prompt: z.string().min(1, {
      message: "Please say what you want to hear",
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
      const response = await axios.post("/api/music", values);

      setMusic(response.data);

      form.reset();
    } catch (error: any) {
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
        title="Music Generator"
        description="Turn your text to sound you can hear."
        icon={SpeakerLoudIcon}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
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
                      placeholder="paino solo"
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
      <div className="space-y-4 mt-4 px-8">
        {isLoading && (
          <div className="flex items-center justify-center w-full">
            <Loader />
          </div>
        )}
        {!music && !isLoading && <Empty message="No Music Generated." />}
        {music && <audio src={music} controls className="w-full"></audio>}
      </div>
    </div>
  );
};

export default ConversationPage;
