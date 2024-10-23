import type { MetaFunction } from "@remix-run/node";
import { LoginSwitcher } from "~/components/OurTabs";
import { useStudentLogin } from "../queries/auth";

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
        <LoginSwitcher className="w-full" onStudentLogin={
          (code, dob) => {
            var res = useStudentLogin(code, dob);
            alert(res.data?.meta.session_id);
          }
        }
        
        onParentLogin={
          (email, password) => {
            alert(`Parent login: ${email}, ${password}`);
          }
        } />
      </section>
    </main>
  );
}
