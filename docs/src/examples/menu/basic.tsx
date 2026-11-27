import { Menu, MenuButton, MenuItem, MenuNavLink, MenuTitle } from '@ksojecki/ui/navigation';

export default function MenuBasic() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <Menu className="w-56 rounded-box bg-base-200">
        <MenuTitle>Account</MenuTitle>
        <MenuItem active>
          <MenuButton aria-current="page">Profile</MenuButton>
        </MenuItem>
        <MenuItem>
          <MenuButton>Billing</MenuButton>
        </MenuItem>
        <MenuItem disabled>
          <MenuButton>Team</MenuButton>
        </MenuItem>
        <li>
          <MenuNavLink to="/">Home (router link)</MenuNavLink>
        </li>
      </Menu>
      <Menu horizontal size="sm">
        <MenuItem>
          <MenuButton>Day</MenuButton>
        </MenuItem>
        <MenuItem>
          <MenuButton>Week</MenuButton>
        </MenuItem>
      </Menu>
    </div>
  );
}
