import { useRouter } from "next/router";
import { useMemo } from "react";

export function Header() {
  const router = useRouter();

  console.log(router);

  const isAdmin = false;

  const headerMock = useMemo(
    () => [
      {
        title: "Meus pontos",
        path: "/app",
      },
      {
        title: "Pagamentos",
        path: "/app/payments",
      },
      {
        title: "Meus dados",
        path: "/app/data",
      },
      {
        title: "Férias",
        path: "/app/holidays",
      },
    ],
    []
  );

  return (
    <header className="w-full flex bg-black">
      <div className="w-full max-w-7xl px-4 py-6 mx-auto my-0 flex items-center justify-between">
        <a href="/">Phenix</a>
        <nav className="font-light text-stone-700">
          <ul className="flex items-center gap-8">
            {headerMock.map((item) => (
              <li
                key={item.path}
                className={`hover:text-stone-500 transition-colors ${
                  router.pathname === item.path ? "font-regular text-white" : ""
                }`}
              >
                <a href={item.path}>{item.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        {isAdmin ? (
          <button type="button">Portal do Administrador</button>
        ) : (
          <div />
        )}
      </div>
    </header>
  );
}
