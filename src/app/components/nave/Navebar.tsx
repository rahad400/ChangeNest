import Image from "next/image";
import Link from "next/link";
import changelogo from '@/app/assets/changelogo.webp'

const NaveLink = [
  { label: "Home", href: "/", active: true },
  { label: "Upcoming Event", href: "/", active: false },
  { label: "About Us", href: "/", active: false },
  { label: "Contact", href: "/", active: false },
];

const Navebar = () => {
  return (
    <div>
        <div>
            <div>
                <Image src={changelogo} alt="Change Nest" />
            </div>
        </div>
      <nav>
        {NaveLink.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            aria-current={link.active ? "page" : undefined}
          >{link.label}</Link>
        ))}
      </nav>
    </div>
  );
};

export default Navebar;
