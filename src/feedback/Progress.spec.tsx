import { render, screen } from '@testing-library/react';
import { Progress } from './Progress';

describe('Progress', () => {
  it('renders a progressbar with the accessible name and value', () => {
    render(<Progress label="Upload" max={200} value={50} />);

    const meter = screen.getByRole('progressbar', { name: 'Upload' }) as HTMLProgressElement;
    expect(meter.value).toBe(50);
    expect(meter.max).toBe(200);
    expect(meter.classList.contains('progress')).toBe(true);
    expect(meter.classList.contains('progress-neutral')).toBe(true);
  });

  it('clamps the value into [0, max] with the default max of 100', () => {
    const { unmount } = render(<Progress label="Low" value={-5} />);
    expect((screen.getByRole('progressbar') as HTMLProgressElement).value).toBe(0);
    unmount();

    render(<Progress label="High" value={150} />);
    const meter = screen.getByRole('progressbar') as HTMLProgressElement;
    expect(meter.value).toBe(100);
    expect(meter.max).toBe(100);
  });

  it('applies the purpose class and passes className through', () => {
    render(<Progress className="w-40" label="Quota" purpose="warning" value={80} />);

    const meter = screen.getByRole('progressbar', { name: 'Quota' });
    expect(meter.classList.contains('progress-warning')).toBe(true);
    expect(meter.classList.contains('progress-neutral')).toBe(false);
    expect(meter.classList.contains('w-40')).toBe(true);
  });

  it('renders no tick wrapper when marker is absent', () => {
    const { container } = render(<Progress label="Plain" value={40} />);

    expect(container.firstElementChild?.tagName).toBe('PROGRESS');
    expect(container.querySelector('[aria-hidden="true"]')).toBeNull();
  });

  it('renders an aria-hidden tick at the marker percentage', () => {
    const { container } = render(<Progress label="Access" marker={25} max={200} value={50} />);

    const meter = screen.getByRole('progressbar', { name: 'Access' }) as HTMLProgressElement;
    expect(meter.value).toBe(50);
    const tick = container.querySelector('[aria-hidden="true"]') as HTMLElement;
    expect(tick).not.toBeNull();
    expect(tick.style.left).toBe('12.5%');
    expect(meter.parentElement).toBe(tick.parentElement);
  });

  it('clamps the marker into [0, max]', () => {
    const { container, unmount } = render(<Progress label="Low" marker={-10} value={5} />);
    expect((container.querySelector('[aria-hidden="true"]') as HTMLElement).style.left).toBe('0%');
    unmount();

    const { container: high } = render(<Progress label="High" marker={300} max={200} value={5} />);
    expect((high.querySelector('[aria-hidden="true"]') as HTMLElement).style.left).toBe('100%');
  });
});
