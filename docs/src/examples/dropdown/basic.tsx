import { Dropdown, Menu, MenuButton, MenuItem } from '@ksojecki/ui/navigation';

export default function DropdownBasic() {
  return (
    <div className="flex min-h-48 flex-wrap items-start gap-3">
      <Dropdown trigger="Actions">
        <Menu>
          <MenuItem>
            <MenuButton>Duplicate</MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton>Archive</MenuButton>
          </MenuItem>
        </Menu>
      </Dropdown>
      <Dropdown align="end" trigger="Save as" triggerPurpose="save">
        <Menu>
          <MenuItem>
            <MenuButton>CSV</MenuButton>
          </MenuItem>
          <MenuItem>
            <MenuButton>PDF</MenuButton>
          </MenuItem>
        </Menu>
      </Dropdown>
    </div>
  );
}
