import { cn } from "@/lib/utils";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "../../ui/resizable";
import { Chat } from "../commonView/chat";
import { useState } from "react";
import { Room } from "@/types/chatTypes";
import { Sidebar } from "./chatSidebar";

interface DesktopViewProps {
  defaultLayout: number[];
  navCollapsedSize: number;
  userInfo: User;
  roomId?: string;
}

export function DesktopView({
  defaultLayout,
  navCollapsedSize,
  userInfo,
  roomId,
}: DesktopViewProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room>();

  function handleLayout(sizes: number[]) {
    document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
  }

  function handleCollapse() {
    setIsCollapsed(true);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      true
    )}`;
  }

  function handleExpand() {
    setIsCollapsed(false);
    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
      false
    )}`;
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={handleLayout}
      className="h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={24}
        maxSize={30}
        onCollapse={handleCollapse}
        onExpand={handleExpand}
        className={cn(
          isCollapsed &&
            "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
        )}
      >
        {userInfo && (
          <Sidebar
            isCollapsed={isCollapsed}
            isMobile={false}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
            userInfo={userInfo}
            roomId={roomId}
          />
        )}
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        {selectedRoom && userInfo && (
          <Chat
            setSelectedRoom={setSelectedRoom}
            selectedRoom={selectedRoom}
            isMobile={false}
            userInfo={userInfo}
          />
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
