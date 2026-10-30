'use client';

import { Link } from '@/i18n/navigation';
import { ChevronDown } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';

type NavDropdownProps = {
  label: string;
  isActive: boolean;
  items: { label: string; href: string; isActive: boolean }[];
};

export function NavDropdown({ label, isActive, items }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  // Close on outside click / Escape
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const focusItem = (index: number) => {
    const links = rootRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]');
    if (!links?.length) return;
    links[(index + links.length) % links.length]?.focus();
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setIsOpen(true);
      // wait for the menu to become visible before moving focus
      requestAnimationFrame(() => focusItem(0));
    }
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent) => {
    const links = Array.from(
      rootRef.current?.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]') ?? []
    );
    const current = links.indexOf(document.activeElement as HTMLAnchorElement);

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusItem(current + 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusItem(current - 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      focusItem(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      focusItem(-1);
    }
  };

  return (
    <div
      className="nav-dropdown"
      ref={rootRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
          setIsOpen(false);
        }
      }}
    >
      <button
        aria-controls={menuId}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`nav-dropdown-trigger${isActive ? ' active' : ''}`}
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleTriggerKeyDown}
      >
        {label}
        <ChevronDown
          aria-hidden="true"
          className="nav-dropdown-chevron"
          size={15}
          strokeWidth={2.6}
        />
      </button>

      <div
        className={`nav-dropdown-menu${isOpen ? ' open' : ''}`}
        id={menuId}
        role="menu"
        onKeyDown={handleMenuKeyDown}
      >
        {items.map((item) => (
          <Link
            aria-current={item.isActive ? 'page' : undefined}
            className={item.isActive ? 'active' : undefined}
            href={item.href}
            key={item.href}
            role="menuitem"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
