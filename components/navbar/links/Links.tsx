import Link from "next/link";

const Links = () => {
  const links = [
    {
      title: "Homepage",
      path: "/",
    },
    {
      title: "Blog",
      path: "/blog",
    },
    {
      title: "About",
      path: "/about",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];
  return (
    <div>
      {links.map((link) => (
        <Link href={link.path}>{link.title}</Link>
      ))}
    </div>
  );
};

export default Links;
