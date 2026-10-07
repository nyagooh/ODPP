import { ChatSidebar } from "@/components/app/ChatSidebar";
import { StatusProvider } from "@/components/app/Status";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <StatusProvider>
      <div className="app app--chat">
        <ChatSidebar />
        <div className="app-main">{children}</div>
      </div>
    </StatusProvider>
  );
}
