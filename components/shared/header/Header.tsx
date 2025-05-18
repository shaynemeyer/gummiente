import React from 'react';
import ThemeToggle from './ThemeToggle';
import Image from 'next/image';
import UserMenu from './UserMenu';

function Header() {
  return (
    <div className="my-2 mx-2 ">
      <div className="flex flex-row justify-between align-middle text-center">
        <div className="flex flex-row gap2 items-center justify-center gap-3">
          <Image
            src="/images/logo.png"
            width={40}
            height={40}
            alt="Gummiente Logo"
            className="w-auto h-auto"
          />
          Gummiente
        </div>

        <UserMenu />
      </div>
    </div>
  );
}

export default Header;
