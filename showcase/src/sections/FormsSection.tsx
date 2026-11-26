import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Checkbox,
  DatePicker,
  FileInput,
  Field,
  FilterBar,
  FilterRow,
  FormActions,
  FormField,
  Input,
  Radio,
  RadioGroup,
  Range,
  SegmentedControl,
  Select,
  Switch,
  Textarea,
  TimePicker,
} from '@ksojecki/platform-ui/forms';
import { Button } from '@ksojecki/platform-ui/actions';
import { Section } from '@ksojecki/platform-ui/layout';
import { Specimen } from '../Specimen';

function TextControls() {
  const { register } = useForm();

  return (
    <Specimen title="Input / Textarea / Select">
      <div className="flex w-full flex-col gap-3">
        <Input hint="Use a short, descriptive name." label="Name" placeholder="Desk lamp" />
        <Input error="Enter a valid quantity." label="Quantity" defaultValue="12,x" />
        <Input disabled label="Disabled" defaultValue="Locked" />
        <Select label="Category">
          <option>Lighting</option>
          <option>Stationery</option>
        </Select>
        <Select error="Pick a category." label="Category (error)">
          <option>Choose</option>
        </Select>
        <Textarea label="Note" placeholder="Anything to remember" />
        <Field hint="Plain Field wrapper" label="Custom field">
          <Input aria-label="Custom" placeholder="Bare input" />
        </Field>
        <FormField
          errorMessage="Password is too short."
          label="Password"
          registration={register('password')}
          type="password"
        />
      </div>
    </Specimen>
  );
}

function ChoiceControls() {
  const [radio, setRadio] = useState('weekly');
  const [range, setRange] = useState(40);
  const [segment, setSegment] = useState('month');
  const [date, setDate] = useState('2026-03-14');
  const [time, setTime] = useState('08:30');

  return (
    <Specimen title="Choices">
      <div className="flex w-full flex-col gap-3">
        <Checkbox label="Remember me" />
        <Checkbox error="You must accept." label="Accept terms" />
        <Radio label="Single radio" name="single" />
        <RadioGroup
          legend="Frequency"
          name="frequency"
          onChange={setRadio}
          options={[
            { value: 'weekly', label: 'Weekly' },
            { value: 'monthly', label: 'Monthly' },
            { value: 'never', label: 'Never', disabled: true },
          ]}
          value={radio}
        />
        <Switch hint="Sends a weekly summary." label="Email digest" />
        <Switch error="Not available." label="Beta" />
        <Range label="Progress" max={100} min={0} onChange={setRange} value={range} />
        <Range
          label="Warning range"
          min={0}
          max={100}
          onChange={setRange}
          purpose="warning"
          value={range}
        />
        <FileInput hint="PDF up to 5 MB." label="Attachment" />
        <SegmentedControl
          label="Period"
          onChange={setSegment}
          options={[
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
            { value: 'year', label: 'Year' },
          ]}
          value={segment}
        />
        <DatePicker
          id="showcase-date"
          locale="en-GB"
          nextLabel="Next month"
          onChange={setDate}
          previousLabel="Previous month"
          value={date}
        />
        <TimePicker
          changeHourLabel="Change hour"
          id="showcase-time"
          label="Time"
          onChange={setTime}
          selectHourLabel="Hour"
          selectMinuteLabel="Minute"
          value={time}
        />
      </div>
    </Specimen>
  );
}

function FilterAndActions() {
  return (
    <>
      <Specimen title="FilterBar / FilterRow">
        <FilterBar actions={<Button purpose="save">Apply</Button>} className="w-full">
          <Input aria-label="Search" placeholder="Search" fullWidth={false} />
          <Select aria-label="Category" fullWidth={false}>
            <option>All categories</option>
          </Select>
        </FilterBar>
        <FilterRow onRemove={() => undefined} removeLabel="Remove filter">
          <Select aria-label="Field" fullWidth={false}>
            <option>Quantity</option>
          </Select>
          <Input aria-label="Value" fullWidth={false} />
        </FilterRow>
      </Specimen>
      <Specimen title="FormActions">
        <FormActions
          cancelLabel="Cancel"
          error="Could not save the item."
          onCancel={() => undefined}
          saveLabel="Save"
        />
        <FormActions
          cancelLabel="Cancel"
          onCancel={() => undefined}
          saveLabel="Save"
          saving
          savingLabel="Saving..."
        />
      </Specimen>
    </>
  );
}

export function FormsSection() {
  return (
    <Section description="@ksojecki/platform-ui/forms" id="forms" title="Forms">
      <div className="grid gap-6 md:grid-cols-2">
        <TextControls />
        <ChoiceControls />
        <FilterAndActions />
      </div>
    </Section>
  );
}
