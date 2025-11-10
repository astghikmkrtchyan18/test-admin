import { Header, Sidebar} from "@/widgets";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <div
      className="min-h-screen w-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 
                 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 
                 transition-all duration-500"
    >
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          < Header  />
          <main className="flex-1 overflow-y-auto bg-transparent">
            <div className="p-6 space-y-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
