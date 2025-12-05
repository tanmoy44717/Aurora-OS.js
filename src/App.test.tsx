import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Aurora OS Integration', () => {
    it('boots and renders the Desktop environment', () => {
        render(<App />);

        // Verify that the desktop icons are loaded
        // "Documents" is one of the default icons in App.tsx
        const documentsIcon = screen.getByText('Documents');
        expect(documentsIcon).toBeInTheDocument();
    });
});
