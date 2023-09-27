import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Percentiles } from './Percentiles';

describe('Percentiles component', () => {
  it('should render the given data', () => {
    render(
      <Table>
        <Percentiles data={[8, 2, 4]} percentiles={[50]} />
      </Table>
    );

    expect(screen.getByRole('cell')).toHaveTextContent('4');
  });

  it('should join repeated values', () => {
    render(
      <Table>
        <Percentiles data={[8]} percentiles={[0, 50, 100]} />
      </Table>
    );

    expect(screen.getByRole('cell')).toHaveProperty('colSpan', 3);
  });

  it('should require getter and children renderer if data is not number', () => {
    // @ts-expect-error This should fail because getter is required
    <Percentiles data={[{ value: 8 }]} percentiles={[50]}>
      {(x) => x.value}
    </Percentiles>;

    // @ts-expect-error This should fail because getter is required
    <Percentiles
      data={[{ value: 8 }]}
      percentiles={[50]}
      getter={(x) => x.value}
    />;

    <Percentiles
      data={[{ value: 8 }]}
      percentiles={[50]}
      getter={(x) => x.value}
    >
      {(x) => x.value}
    </Percentiles>;
  });
});

function Table({ children }: PropsWithChildren<Record<never, unknown>>) {
  return (
    <table>
      <tbody>
        <tr>{children}</tr>
      </tbody>
    </table>
  );
}
