import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const links = [
  ['Зоны', '#zones'],
  ['Клуб', '#club'],
  ['Контакты', '#booking']
];

function Logo() {
  return (
    <a className="site-logo" href="#top" aria-label="META4PRO — наверх">
      META<span>4</span>PRO
    </a>
  );
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = event => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className={`site-header ${open ? 'menu-open' : ''}`}>
      <Logo />

      <nav className="desktop-nav" aria-label="Главная навигация">
        {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
      </nav>

      <a className="header-book" href="#booking">Бронь</a>

      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(value => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <nav id="mobile-menu" className="mobile-menu" aria-label="Мобильная навигация" hidden={!open}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={close}>{label}</a>
        ))}
        <a className="mobile-menu-book" href="#booking" onClick={close}>Забронировать</a>
      </nav>
    </header>
  );
}
