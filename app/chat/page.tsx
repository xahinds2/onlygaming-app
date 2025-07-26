import { cookies } from "next/headers";
import { ChatLayout } from "@/components/chat/chatLayout";

export default function Home() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : [24, 76];

  return (
    <main className="md:h-[calc(100dvh)] flex-col items-center justify-center md:pl-16 gap-4 w-full">
      <div className="z-10 border rounded-lg w-full h-full text-sm lg:flex">
        <ChatLayout defaultLayout={defaultLayout} />
      </div>
    </main>
  );
}
