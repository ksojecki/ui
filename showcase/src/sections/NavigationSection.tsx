import { Button } from '@ksojecki/platform-ui/actions';
import { TbChevronDown } from '@ksojecki/platform-ui/icons';
import {
  Dropdown,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuNavLink,
  MenuTitle,
  NavMenu,
  NavMenuColumn,
  NavMenuItem,
} from '@ksojecki/platform-ui/navigation';
import { Section } from '@ksojecki/platform-ui/layout';
import { Specimen } from '../Specimen';

function NavbarStrip() {
  return (
    <Specimen title="NavMenu inside paper-navbar (check contrast per scheme)">
      <header className="navbar paper-navbar w-full gap-3 px-4">
        <span className="font-semibold">Brand</span>
        <NavMenu label="Menu">
          <NavMenuItem label="Accounts">
            <NavMenuColumn title="Banking">
              <MenuItem>
                <MenuButton>Overview</MenuButton>
              </MenuItem>
              <MenuItem>
                <MenuButton>Transfers</MenuButton>
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
        <div className="ml-auto flex gap-2">
          <Button tone="ghost">Ghost</Button>
          <Button variant="outline" tone="ghost">
            Outline
          </Button>
          <Button purpose="save">Save</Button>
        </div>
      </header>
    </Specimen>
  );
}

export function NavigationSection() {
  return (
    <Section description="@ksojecki/platform-ui/navigation" id="navigation" title="Navigation">
      <div className="flex flex-col gap-6">
        <Specimen title="Link (plain, tones, asButton)">
          <Link to="/accounts">Plain link</Link>
          <Link to="/accounts" tone="secondary">
            Secondary
          </Link>
          <Link asButton purpose="create" to="/accounts">
            As button
          </Link>
          <Link asButton size="sm" to="/accounts" tone="neutral" variant="outline">
            Outline button
          </Link>
        </Specimen>
        <Specimen title="Menu (MemoryRouter provides MenuNavLink)">
          <Menu className="w-56 rounded-box bg-base-100">
            <MenuTitle>Reports</MenuTitle>
            <MenuItem active>
              <MenuButton>Monthly</MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton>Yearly</MenuButton>
            </MenuItem>
            <MenuItem disabled>
              <MenuButton>Archived</MenuButton>
            </MenuItem>
            <MenuNavLink to="/">Router link</MenuNavLink>
          </Menu>
          <Menu className="rounded-box bg-base-100" horizontal size="sm">
            <MenuItem active>
              <MenuButton>One</MenuButton>
            </MenuItem>
            <MenuItem>
              <MenuButton>Two</MenuButton>
            </MenuItem>
          </Menu>
        </Specimen>
        <Specimen title="Dropdown">
          <Dropdown
            trigger={
              <>
                Actions <TbChevronDown aria-hidden="true" />
              </>
            }
            triggerTone="neutral"
          >
            <Menu>
              <MenuItem>
                <MenuButton>Rename</MenuButton>
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
            </Menu>
          </Dropdown>
        </Specimen>
        <NavbarStrip />
      </div>
    </Section>
  );
}
