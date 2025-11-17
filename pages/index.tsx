import { button as buttonStyles } from "@heroui/theme";

import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import PageHead from "@/components/commons/PageHead";
import { Button } from "@heroui/button";
// import DefaultLayout from "@/layouts/default";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PageHead />
      <Button color="primary">Click me</Button>
    </main>
  );
}
