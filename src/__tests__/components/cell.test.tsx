import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import { Cell } from '../../components';

describe('Cell on click and render', () => {
  test('Cell snapshot', () => {
    const tree = renderer
      .create(
        <Cell />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Cell is in the document', () => {
    render(<Cell />)
    const cell = screen.getAllByTestId('cell')[0];
    expect(cell).toBeInTheDocument();
  });

  test('Cell on click has a selected class', () => {
    render(<Cell />)
    const cell = screen.getAllByTestId('cell')[0];
    expect(cell).not.toHaveClass('selected');

    fireEvent.click(cell);
    expect(cell).toHaveClass('selected');
  });
});

describe('Cell on double click', () => {
  test('Cell has a cursorText class', () => {
    render(<Cell />)
    const cell = screen.getAllByTestId('cell')[0];
    expect(cell).not.toHaveClass('cursorText');

    fireEvent.doubleClick(cell);
    expect(cell).toHaveClass('cursorText');
  });

  test('Cell has a selected class', () => {
    render(<Cell />)
    const cell = screen.getAllByTestId('cell')[0];
    expect(cell).not.toHaveClass('selected');

    fireEvent.doubleClick(cell);
    expect(cell).toHaveClass('selected');
  });
});

describe('Cell on blur', () => {
  test('Cell has a cursorCell class', () => {
    render(<Cell />)
    const cell = screen.getAllByTestId('cell')[0];
    fireEvent.blur(cell);
    expect(cell).toHaveClass('cursorCell');
  });

  test('Cell has no selected class', () => {
    render(<Cell />)
    const cell = screen.getAllByTestId('cell')[0];
    fireEvent.blur(cell);
    expect(cell).not.toHaveClass('selected');
  });
});