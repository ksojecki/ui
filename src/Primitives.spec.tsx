import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { Button } from './actions/Button';
import { Disclosure } from './layout/Disclosure';
import { Divider } from './layout/Divider';
import { FileInput } from './forms/FileInput';
import { Radio, RadioGroup } from './forms/Radio';
import { Range } from './forms/Range';
import { SegmentedControl } from './forms/SegmentedControl';
import { Skeleton } from './feedback/Skeleton';
import { Spinner } from './feedback/Spinner';
import { Metric, MetricGroup } from './data/Metric';
import { Toast, ToastRegion } from './feedback/Toast';
import { Tooltip } from './feedback/Tooltip';

describe('Metric', () => {
  it('renders the value with the tone class and the optional parts', () => {
    const { container } = render(
      <MetricGroup vertical className="w-full">
        <Metric description="Monthly" figure="icon" label="Balance" tone="error" value="-12" />
      </MetricGroup>,
    );

    expect(container.firstElementChild?.classList.contains('stats-vertical')).toBe(true);
    expect(screen.getByText('-12').classList.contains('text-error')).toBe(true);
    expect(screen.getByText('Monthly').classList.contains('stat-desc')).toBe(true);
    expect(screen.getByText('icon').classList.contains('stat-figure')).toBe(true);
  });

  it('omits the tone class when no tone is given', () => {
    render(<Metric label="Income" value="10" />);
    expect(screen.getByText('10').className).toBe('stat-value');
  });

  it('passes container and value classes through', () => {
    const { container } = render(
      <Metric className="px-4" label="Income" value="10" valueClassName="text-xl" />,
    );

    expect(container.firstElementChild?.className).toBe('stat px-4');
    expect(screen.getByText('10').className).toBe('stat-value text-xl');
  });

  it('stacks below sm and lays out from sm up when responsive', () => {
    const { container } = render(
      <MetricGroup responsive>
        <Metric label="Income" value="10" />
      </MetricGroup>,
    );

    expect(container.firstElementChild?.className).toBe('stats stats-vertical sm:stats-horizontal');
  });
});

describe('Divider and Skeleton', () => {
  it('renders a labelled separator and a hidden skeleton block', () => {
    const { container } = render(
      <>
        <Divider vertical>OR</Divider>
        <Skeleton className="h-4 w-20" />
      </>,
    );

    const divider = screen.getByText('OR');
    expect(divider.classList.contains('divider-vertical')).toBe(true);
    expect(container.querySelector('.skeleton')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('draws a row divider for flex-row parents', () => {
    render(<Divider row>or</Divider>);

    expect(screen.getByText('or').className).toBe('divider divider-horizontal');
  });
});

describe('Spinner', () => {
  it('is a status with visually hidden text when labelled', () => {
    render(<Spinner label="Loading" size="lg" />);
    const status = screen.getByRole('status');
    expect(status.classList.contains('loading-lg')).toBe(true);
    expect(status.textContent).toBe('Loading');
  });

  it('is hidden from assistive tech when unlabelled', () => {
    const { container } = render(<Spinner />);
    expect(container.firstElementChild?.getAttribute('aria-hidden')).toBe('true');
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('is used by a loading Button', () => {
    const { container } = render(<Button isLoading>Save</Button>);
    expect(container.querySelector('.loading-spinner.loading-sm')).not.toBeNull();
  });

  it('marks a loading Button busy without announcing the spinner', () => {
    const { container } = render(<Button isLoading>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' }).getAttribute('aria-busy')).toBe('true');
    expect(container.querySelector('.loading-spinner')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('leaves a Button without aria-busy when it is not loading', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button', { name: 'Save' }).hasAttribute('aria-busy')).toBe(false);
  });
});

describe('Tooltip', () => {
  it('links the child to the tip text', () => {
    render(
      <Tooltip position="bottom" text="Delete row">
        <button type="button">Remove</button>
      </Tooltip>,
    );

    const button = screen.getByRole('button', { name: 'Remove' });
    const tipId = button.getAttribute('aria-describedby');
    expect(tipId).toBeTruthy();
    expect(document.getElementById(tipId as string)?.textContent).toBe('Delete row');
    expect(button.parentElement?.getAttribute('data-tip')).toBe('Delete row');
    expect(button.parentElement?.classList.contains('tooltip-bottom')).toBe(true);
  });

  it('keeps the description the child already has', () => {
    render(
      <Tooltip text="Delete row">
        <button aria-describedby="row-help" type="button">
          Remove
        </button>
      </Tooltip>,
    );

    const describedBy = screen
      .getByRole('button', { name: 'Remove' })
      .getAttribute('aria-describedby');
    const [helpId, tipId] = (describedBy ?? '').split(' ');
    expect(helpId).toBe('row-help');
    expect(document.getElementById(tipId)?.textContent).toBe('Delete row');
  });
});

describe('Toast', () => {
  it('renders in a polite output region and dismisses by label', () => {
    const onDismiss = vi.fn<() => void>();
    render(
      <ToastRegion position="top-end">
        <Toast dismissLabel="Close notice" onDismiss={onDismiss} purpose="success">
          Saved
        </Toast>
      </ToastRegion>,
    );

    const region = screen.getByRole('status');
    expect(region.tagName).toBe('OUTPUT');
    expect(region.classList.contains('toast-top')).toBe(true);
    expect(region.querySelector('[role]')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Close notice' }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it('keeps the assertive alert role for errors', () => {
    render(<Toast purpose="error">Failed</Toast>);
    expect(screen.getByRole('alert').textContent).toContain('Failed');
  });

  it('renders no dismiss button without onDismiss', () => {
    render(<Toast>Plain</Toast>);
    expect(screen.queryByRole('button')).toBeNull();
  });
});

describe('Range', () => {
  it('reports numeric changes and defaults to primary', () => {
    const onChange = vi.fn<(value: number) => void>();
    render(<Range label="Volume" max={10} min={0} onChange={onChange} value={3} />);

    const slider = screen.getByRole('slider', { name: 'Volume' });
    expect(slider.classList.contains('range-primary')).toBe(true);

    fireEvent.change(slider, { target: { value: '7' } });
    expect(onChange).toHaveBeenCalledWith(7);
  });

  it('passes disabled and pointer handlers to the input', () => {
    const onPointerUp = vi.fn<() => void>();
    render(
      <Range
        disabled
        label="Volume"
        max={10}
        min={0}
        onChange={() => undefined}
        onPointerUp={onPointerUp}
        value={3}
      />,
    );

    const slider = screen.getByRole<HTMLInputElement>('slider', { name: 'Volume' });
    expect(slider.disabled).toBe(true);
    fireEvent.pointerUp(slider);
    expect(onPointerUp).toHaveBeenCalledTimes(1);
  });
});

describe('Disclosure', () => {
  it('uses native details and summary toggling', () => {
    const { container } = render(
      <Disclosure bordered summary="More">
        Hidden text
      </Disclosure>,
    );

    const details = container.querySelector('details');
    expect(details?.classList.contains('collapse-arrow')).toBe(true);
    expect(details?.open).toBe(false);
    expect(screen.getByText('More').tagName).toBe('SUMMARY');

    fireEvent.click(screen.getByText('More'));
    expect(details?.open).toBe(true);
  });
});

describe('FileInput', () => {
  it('labels the file control and links its error', () => {
    render(<FileInput error="Too large" label="Statement" />);

    const input = screen.getByLabelText('Statement');
    expect(input.getAttribute('type')).toBe('file');
    expect(input.classList.contains('file-input-error')).toBe(true);
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.getAttribute('aria-describedby')).toContain('-error');
  });
});

const RADIO_OPTIONS = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta', disabled: true },
  { value: 'c', label: 'Gamma' },
];

const RadioHarness = () => {
  const [value, setValue] = useState('a');
  return (
    <RadioGroup
      legend="Pick"
      name="pick"
      onChange={setValue}
      options={RADIO_OPTIONS}
      orientation="horizontal"
      value={value}
    />
  );
};

describe('Radio and RadioGroup', () => {
  it('labels a single radio', () => {
    render(<Radio label="Yes" name="q" value="yes" />);
    expect(screen.getByLabelText('Yes').getAttribute('type')).toBe('radio');
  });

  it('groups radios under the legend and reports the chosen value', () => {
    render(<RadioHarness />);

    const group = screen.getByRole('group', { name: 'Pick' });
    expect(group.querySelector('legend')?.textContent).toBe('Pick');
    expect(screen.getByLabelText('Alpha')).toHaveProperty('checked', true);
    expect(screen.getByLabelText('Beta')).toHaveProperty('disabled', true);

    fireEvent.click(screen.getByLabelText('Gamma'));
    expect(screen.getByLabelText('Gamma')).toHaveProperty('checked', true);
    expect(screen.getByLabelText('Alpha')).toHaveProperty('checked', false);
  });
});

describe('SegmentedControl', () => {
  it('marks the selected option with aria-pressed and calls onChange', () => {
    const onChange = vi.fn<(value: string) => void>();
    const SegmentedHarness = () => {
      const [value, setValue] = useState('month');
      return (
        <SegmentedControl
          label="Period"
          onChange={(next) => {
            onChange(next);
            setValue(next);
          }}
          options={[
            { value: 'month', label: 'Month' },
            { value: 'year', label: 'Year' },
          ]}
          value={value}
        />
      );
    };
    render(<SegmentedHarness />);

    expect(screen.getByRole('group', { name: 'Period' })).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Month' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: 'Year' }).getAttribute('aria-pressed')).toBe('false');

    fireEvent.click(screen.getByRole('button', { name: 'Year' }));
    expect(onChange).toHaveBeenCalledWith('year');
    expect(screen.getByRole('button', { name: 'Year' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.getByRole('button', { name: 'Month' }).getAttribute('aria-pressed')).toBe(
      'false',
    );
  });

  it('shares the container width equally when fullWidth is set', () => {
    render(
      <SegmentedControl
        fullWidth
        label="Period"
        onChange={() => undefined}
        options={[
          { value: 'month', label: 'Month' },
          { value: 'year', label: 'Year' },
        ]}
        value="month"
      />,
    );

    expect(screen.getByRole('group', { name: 'Period' }).classList.contains('w-full')).toBe(true);
    expect(screen.getByRole('button', { name: 'Month' }).classList.contains('flex-1')).toBe(true);
  });
});
