import { Section } from '@ksojecki/platform-ui/layout';
import {
  TbAlertTriangle,
  TbArrowRight,
  TbBrandGoogle,
  TbCheck,
  TbChevronDown,
  TbEye,
  TbMenu2,
  TbPencil,
  TbPlus,
  TbSearch,
  TbTrash,
  TbX,
} from '@ksojecki/platform-ui/icons';

// A sample, not the full set: the subpath exports every Tabler icon.
const SAMPLE_ICONS = {
  TbAlertTriangle,
  TbArrowRight,
  TbBrandGoogle,
  TbCheck,
  TbChevronDown,
  TbEye,
  TbMenu2,
  TbPencil,
  TbPlus,
  TbSearch,
  TbTrash,
  TbX,
};

export function IconsSection() {
  return (
    <Section
      description="@ksojecki/platform-ui/icons exports every Tabler icon. A sample:"
      id="icons"
      title="Icons"
    >
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {Object.entries(SAMPLE_ICONS).map(([name, Icon]) => (
          <li className="flex flex-col items-center gap-2 rounded-box bg-base-100 p-3" key={name}>
            <Icon aria-hidden="true" size={24} />
            <span className="text-xs">{name}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
