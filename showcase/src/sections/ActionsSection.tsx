import {
  Button,
  ButtonGroup,
  DeleteButton,
  EditButton,
  IconButton,
  NewButton,
  type ActionPurpose,
  type ButtonSize,
  type ButtonTone,
  type ButtonVariant,
} from '@ksojecki/ui/actions';
import { Card, Section } from '@ksojecki/ui/layout';
import { TbPlus, TbSearch } from '@ksojecki/ui/icons';
import { Specimen } from '../Specimen';

const TONES: ButtonTone[] = [
  'default',
  'primary',
  'secondary',
  'ghost',
  'neutral',
  'info',
  'success',
  'warning',
  'error',
];
const VARIANTS: ButtonVariant[] = ['solid', 'soft', 'outline'];
const SIZES: ButtonSize[] = ['xs', 'sm', 'md', 'lg'];
const PURPOSES: ActionPurpose[] = [
  'save',
  'cancel',
  'delete',
  'create',
  'edit',
  'confirm',
  'neutral',
];

function ToneMatrix() {
  return (
    <div className="flex flex-col gap-4">
      {VARIANTS.map((variant) => (
        <div className="flex flex-col gap-2" key={variant}>
          {SIZES.map((size) => (
            <div className="flex flex-wrap items-center gap-2" key={size}>
              <span className="w-24 text-xs opacity-70">
                {variant} {size}
              </span>
              {TONES.map((tone) => (
                <Button key={tone} size={size} tone={tone} variant={variant}>
                  <TbPlus aria-hidden="true" />
                  {tone}
                </Button>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function ActionsSection() {
  return (
    <Section appearance="plain" description="@ksojecki/ui/actions" id="actions" title="Actions">
      <div className="flex flex-col gap-6">
        <Specimen title="Tone x variant x size on the page canvas (base-200)">
          <ToneMatrix />
        </Specimen>
        <Card title="Tone x variant x size inside a Card (base-100)">
          <ToneMatrix />
        </Card>
        <Specimen title="Purposes">
          {PURPOSES.map((purpose) => (
            <Button key={purpose} purpose={purpose}>
              <TbSearch aria-hidden="true" />
              {purpose}
            </Button>
          ))}
        </Specimen>
        <Specimen title="Disabled and loading">
          {VARIANTS.map((variant) => (
            <Button disabled key={`d-${variant}`} variant={variant}>
              Disabled {variant}
            </Button>
          ))}
          {VARIANTS.map((variant) => (
            <Button isLoading key={`l-${variant}`} variant={variant}>
              Saving {variant}
            </Button>
          ))}
        </Specimen>
        <Specimen title="IconButton sizes (default, per purpose)">
          {(['xs', 'sm', 'md'] as const).map((size) => (
            <IconButton icon={<TbSearch />} key={size} label={`Search ${size}`} size={size} />
          ))}
          {PURPOSES.map((purpose) => (
            <IconButton icon={<TbPlus />} key={purpose} label={purpose} purpose={purpose} />
          ))}
        </Specimen>
        <Specimen title="EditButton / DeleteButton / NewButton">
          <EditButton label="Edit" />
          <DeleteButton label="Delete" />
          <NewButton label="New" />
          <EditButton label="Edit ghost" tone="ghost" />
        </Specimen>
        <Specimen title="ButtonGroup">
          <ButtonGroup label="Range">
            <Button tone="neutral">Day</Button>
            <Button tone="neutral">Week</Button>
            <Button tone="neutral">Month</Button>
          </ButtonGroup>
        </Specimen>
      </div>
    </Section>
  );
}
