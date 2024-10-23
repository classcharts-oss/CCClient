import type { MetaFunction } from "@remix-run/node";
import { LoginSwitcher } from "~/components/OurTabs";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-2">
      <h1 className="text-4xl font-bold">Login</h1>

      <LoginSwitcher />
    </main>
  );
}
