import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CollapsiblePanel } from './index';
import { ChevronDown } from 'lucide-react';

describe('CollapsiblePanel', () => {
  const panelTitle = 'Test Panel';
  const panelContent = 'This is panel content';

  test('renders with default closed state', () => {
    render(
      <CollapsiblePanel title={panelTitle}>{panelContent}</CollapsiblePanel>,
    );

    expect(screen.getByRole('button', { name: panelTitle })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.queryByText(panelContent)).not.toBeInTheDocument();
  });

  test('renders with default open state', () => {
    render(
      <CollapsiblePanel title={panelTitle} defaultOpen>
        {panelContent}
      </CollapsiblePanel>,
    );

    expect(screen.getByRole('button', { name: panelTitle })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.getByText(panelContent)).toBeVisible();
  });

  test('toggles open/closed on button click', async () => {
    render(
      <CollapsiblePanel title={panelTitle}>{panelContent}</CollapsiblePanel>,
    );

    const button = screen.getByRole('button', { name: panelTitle });

    // Initially closed
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByText(panelContent)).not.toBeInTheDocument();

    // Open on click
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByText(panelContent)).toBeVisible();
    });

    // Close on click again
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(screen.queryByText(panelContent)).not.toBeInTheDocument();
    });
  });

  test('renders optional icon if provided', () => {
    render(
      <CollapsiblePanel
        title={panelTitle}
        icon={<ChevronDown data-testid="icon" />}
      >
        {panelContent}
      </CollapsiblePanel>,
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  test('aria-controls and id match for accessibility', () => {
    render(
      <CollapsiblePanel title={panelTitle}>{panelContent}</CollapsiblePanel>,
    );

    const button = screen.getByRole('button', { name: panelTitle });
    const panelId = button.getAttribute('aria-controls');
    expect(panelId).toBe(`panel-${panelTitle}`);

    const content = screen.queryByText(panelContent);
    if (content) {
      expect(content.parentElement).toHaveAttribute('id', panelId);
    }
  });
});
