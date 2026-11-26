import { fireEvent, render, screen } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { Field } from './Field';
import { FileInput } from './FileInput';
import { Input } from './Input';
import { Select } from './Select';
import { Textarea } from './Textarea';

describe('form controls', () => {
  it('labels a form control through its field and links the hint', () => {
    render(<Input hint="Use your full name" label="Full name" />);

    const input = screen.getByLabelText('Full name');
    expect(input.tagName.toLowerCase()).toBe('input');
    expect(input.getAttribute('aria-describedby')).toBe(screen.getByText('Use your full name').id);
    expect(screen.getByText('Full name').closest('fieldset')?.className).toContain('fieldset');
    expect(screen.getByText('Use your full name').className).not.toContain('text-error');
    expect(screen.getByText('Use your full name').className).toContain('whitespace-normal');
    expect(input.getAttribute('aria-invalid')).toBeNull();
  });

  it('marks an errored control and shows the error as an alert', () => {
    render(<Input error="Required" label="Email" />);

    const input = screen.getByLabelText('Email');
    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('Required');
    expect(alert.className).toContain('text-error');
    expect(input.getAttribute('aria-invalid')).toBe('true');
    expect(input.className).toContain('input-error');
    expect(input.getAttribute('aria-describedby')).toBe(alert.id);
  });

  it('maps control sizes to daisyUI classes and fills the width by default', () => {
    render(
      <>
        <Input aria-label="Extra small" controlSize="xs" />
        <Input aria-label="Large" controlSize="lg" fullWidth={false} />
        <Input aria-label="Medium" />
      </>,
    );

    expect(screen.getByRole('textbox', { name: 'Extra small' }).className).toBe(
      'input input-xs w-full',
    );
    expect(screen.getByRole('textbox', { name: 'Large' }).className).toBe('input input-lg');
    expect(screen.getByRole('textbox', { name: 'Medium' }).className).toBe('input w-full');
  });

  it('renders an unlabelled input as the bare control', () => {
    render(<Input aria-label="Search" />);

    expect(screen.getByRole('textbox', { name: 'Search' }).className).toBe('input w-full');
  });

  it('renders select options inside a labelled select', () => {
    render(
      <Select controlSize="sm" label="Type">
        <option value="all">All</option>
        <option value="food">Food</option>
      </Select>,
    );

    const select = screen.getByLabelText('Type') as HTMLSelectElement;
    expect(select.className).toContain('select-sm');
    expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual([
      'All',
      'Food',
    ]);
    fireEvent.change(select, { target: { value: 'food' } });
    expect(select.value).toBe('food');
  });

  it('renders a labelled textarea with an error', () => {
    render(<Textarea controlSize="lg" error="Too short" label="Notes" />);

    const textarea = screen.getByLabelText('Notes');
    expect(textarea.tagName.toLowerCase()).toBe('textarea');
    expect(textarea.className).toContain('textarea-lg');
    expect(textarea.className).toContain('textarea-error');
    expect(textarea.getAttribute('aria-invalid')).toBe('true');
    expect(screen.getByRole('alert').textContent).toBe('Too short');
  });

  it('renders a field with a legend and only the messages it is given', () => {
    const { container } = render(
      <Field controlId="plain" label="Group">
        <span>Child</span>
      </Field>,
    );

    expect(container.querySelector('fieldset.fieldset legend.fieldset-legend')?.textContent).toBe(
      'Group',
    );
    expect(screen.getByText('Child')).toBeTruthy();
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('toggles a labelled checkbox and shows its error', () => {
    const { rerender } = render(<Checkbox controlSize="xs" label="Accept terms" />);

    const checkbox = screen.getByLabelText('Accept terms') as HTMLInputElement;
    expect(checkbox.className).toBe('checkbox checkbox-xs');
    expect(checkbox.checked).toBe(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    rerender(<Checkbox error="Must accept" label="Accept terms" />);
    const errored = screen.getByLabelText('Accept terms');
    expect(errored.className).toContain('checkbox-error');
    expect(errored.getAttribute('aria-invalid')).toBe('true');
    expect(screen.getByRole('alert').textContent).toBe('Must accept');
  });
});

describe('field group', () => {
  it('labels a group of controls with a legend and links its messages from the fieldset', () => {
    const { container } = render(
      <Field error="Pick one" hint="Choose any" label="Channels">
        <input aria-label="Email" type="checkbox" />
        <input aria-label="SMS" type="checkbox" />
      </Field>,
    );

    const fieldset = container.querySelector('fieldset.fieldset');
    const legend = container.querySelector('legend.fieldset-legend');
    expect(legend?.textContent).toBe('Channels');
    expect(legend?.querySelector('label')).toBeNull();
    expect(screen.getByRole('checkbox', { name: 'Email' })).toBeTruthy();
    expect(screen.getByRole('alert').textContent).toBe('Pick one');
    expect(fieldset?.getAttribute('aria-describedby')).toBe(
      [screen.getByText('Choose any').id, screen.getByRole('alert').id].join(' '),
    );
  });
});

describe('unlabelled controls', () => {
  it('renders an error without a label and links it from the control', () => {
    render(<Input aria-label="Search" error="Too vague" />);

    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe('Too vague');
    expect(screen.getByRole('textbox', { name: 'Search' }).getAttribute('aria-describedby')).toBe(
      alert.id,
    );
    expect(screen.getByRole('textbox', { name: 'Search' }).getAttribute('aria-invalid')).toBe(
      'true',
    );
  });

  it('renders a hint without a label and links it from the control', () => {
    render(
      <Select aria-label="Type" hint="Pick one">
        <option>Food</option>
      </Select>,
    );

    expect(screen.getByRole('combobox', { name: 'Type' }).getAttribute('aria-describedby')).toBe(
      screen.getByText('Pick one').id,
    );
  });

  it('renders an error without a label for textarea and file input', () => {
    render(
      <>
        <Textarea aria-label="Notes" error="Too short" />
        <FileInput aria-label="Statement" error="Too large" />
      </>,
    );

    const alerts = screen.getAllByRole('alert').map((alert) => alert.id);
    expect(screen.getByRole('textbox', { name: 'Notes' }).getAttribute('aria-describedby')).toBe(
      alerts[0],
    );
    expect(screen.getByLabelText('Statement').getAttribute('aria-describedby')).toBe(alerts[1]);
  });

  it('adds no description when there is no hint or error', () => {
    render(<Input aria-label="Plain" />);

    expect(
      screen.getByRole('textbox', { name: 'Plain' }).getAttribute('aria-describedby'),
    ).toBeNull();
  });
});

describe('caller aria-describedby', () => {
  it('keeps a caller description when there is no hint or error', () => {
    render(
      <>
        <span id="external">Shared note</span>
        <Input aria-describedby="external" aria-label="Code" />
      </>,
    );

    expect(screen.getByRole('textbox', { name: 'Code' }).getAttribute('aria-describedby')).toBe(
      'external',
    );
  });

  it('merges the caller description with the hint and error ids', () => {
    render(
      <>
        <span id="external">Shared note</span>
        <Input
          aria-describedby="external"
          error="Required"
          hint="Use a work address"
          label="Email"
        />
      </>,
    );

    const describedBy = screen.getByLabelText('Email').getAttribute('aria-describedby');
    expect(describedBy).toBe(
      ['external', screen.getByText('Use a work address').id, screen.getByRole('alert').id].join(
        ' ',
      ),
    );
  });

  it('merges the caller description on select, textarea, file input and checkbox', () => {
    render(
      <>
        <span id="external">Shared note</span>
        <Select aria-describedby="external" error="Pick" label="Type">
          <option>Food</option>
        </Select>
        <Textarea aria-describedby="external" error="Short" label="Notes" />
        <FileInput aria-describedby="external" error="Large" label="Statement" />
        <Checkbox aria-describedby="external" error="Accept" label="Terms" />
      </>,
    );

    const alerts = screen.getAllByRole('alert').map((alert) => alert.id);
    expect(screen.getByLabelText('Type').getAttribute('aria-describedby')).toBe(
      ['external', alerts[0]].join(' '),
    );
    expect(screen.getByLabelText('Notes').getAttribute('aria-describedby')).toBe(
      ['external', alerts[1]].join(' '),
    );
    expect(screen.getByLabelText('Statement').getAttribute('aria-describedby')).toBe(
      ['external', alerts[2]].join(' '),
    );
    expect(screen.getByLabelText('Terms').getAttribute('aria-describedby')).toBe(
      ['external', alerts[3]].join(' '),
    );
  });
});
