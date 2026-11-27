import { MenuButton, MenuItem, NavMenu, NavMenuColumn, NavMenuItem } from '@ksojecki/ui/navigation';

export default function NavMenuBasic() {
  return (
    <header className="navbar paper-navbar min-h-64 items-start gap-3 rounded-box px-4">
      <span className="py-2 font-semibold">Brand</span>
      <NavMenu label="Main menu">
        <NavMenuItem label="Library">
          <NavMenuColumn title="Browse">
            <MenuItem>
              <MenuButton>Overview</MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton>Recent</MenuButton>
            </MenuItem>
          </NavMenuColumn>
        </NavMenuItem>
        <NavMenuItem label="Reports">
          <NavMenuColumn>
            <MenuItem>
              <MenuButton>Monthly</MenuButton>
            </MenuItem>
          </NavMenuColumn>
        </NavMenuItem>
      </NavMenu>
    </header>
  );
}
