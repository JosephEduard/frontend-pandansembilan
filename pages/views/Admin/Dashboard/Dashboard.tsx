import { Card, CardBody, CardFooter } from "@heroui/react";
import Link from "next/link";
import {
  MdWork,
  MdNewspaper,
  MdDesignServices,
  MdWorkspacePremium,
} from "react-icons/md";

type DashboardItem = {
  title: string;
  href: string;
  imgSrc: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const items: DashboardItem[] = [
  {
    title: "Projects",
    href: "/admin/project",
    imgSrc: "/images/admin-dashboard/projects.png",
    Icon: MdWork,
  },
  {
    title: "Services",
    href: "/admin/service",
    imgSrc: "/images/admin-dashboard/services.png",
    Icon: MdDesignServices,
  },
  {
    title: "Certifications",
    href: "/admin/certification",
    imgSrc: "/images/admin-dashboard/certification.png",
    Icon: MdWorkspacePremium,
  },
  {
    title: "News",
    href: "/admin/news",
    imgSrc: "/images/admin-dashboard/news.png",
    Icon: MdNewspaper,
  },
];

const Dashboard = () => {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="text-foreground/80 mb-6 text-base font-medium sm:text-lg">
        Atur semua data perusahaan anda di sini.
      </h1>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {items.map(({ href, Icon, imgSrc, title }) => (
          <Card
            as={Link}
            className="bg-primary group relative overflow-hidden transition-shadow hover:shadow-lg"
            classNames={{ body: "p-0" }}
            href={href}
            isPressable
            key={title}
            radius="lg"
            shadow="md"
          >
            <CardBody className="bg-primary relative h-28 overflow-hidden rounded-b-[32px] sm:h-36 lg:h-40">
              <div
                aria-label={`${title} thumbnail`}
                className="absolute inset-0 bg-cover bg-center"
                role="img"
                style={{ backgroundImage: `url(${imgSrc})` }}
              />
            </CardBody>
            <CardFooter className="bg-primary text-primary-foreground flex items-center gap-3 rounded-none px-6 py-4">
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm font-semibold sm:text-base">
                {title}
              </span>
            </CardFooter>

            {/* Hover darken overlay across entire card */}
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/15" />
          </Card>
        ))}
      </section>
    </main>
  );
};

export default Dashboard;
