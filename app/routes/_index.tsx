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
    <main className="h-screen grid place-items-center bg-black">
      <section className="max-w-sm w-full space-y-2">
        <LoginSwitcher />
      </section>
    </main>
  );
}
