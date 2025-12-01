import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LazyImage from '../ui/LazyImage';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null
});
window.IntersectionObserver = mockIntersectionObserver;

describe('LazyImage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    render(<LazyImage src="/test-image.jpg" alt="Test image" />);
    
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders image when priority is true', () => {
    render(<LazyImage src="/test-image.jpg" alt="Test image" priority />);
    
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/test-image.jpg');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Test image');
  });

  it('handles local images correctly', () => {
    render(<LazyImage src="/local-image.jpg" alt="Local image" priority />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/local-image.jpg');
  });

  it('handles Pexels images with optimization', () => {
    const pexelsUrl = 'https://images.pexels.com/photos/123/test.jpeg';
    render(<LazyImage src={pexelsUrl} alt="Pexels image" priority />);
    
    const img = screen.getByRole('img');
    expect(img.getAttribute('src')).toContain('pexels.com');
    expect(img.getAttribute('src')).toContain('auto=compress');
  });

  it('shows error state when image fails to load', async () => {
    render(<LazyImage src="/non-existent.jpg" alt="Non-existent image" priority />);
    
    const img = screen.getByRole('img');
    
    // Simulate image load error
    img.dispatchEvent(new Event('error'));
    
    await waitFor(() => {
      expect(screen.getByText(/image failed to load/i)).toBeInTheDocument();
    });
  });

  it('shows loaded state when image loads successfully', async () => {
    render(<LazyImage src="/test-image.jpg" alt="Test image" priority />);
    
    const img = screen.getByRole('img');
    
    // Simulate successful image load
    img.dispatchEvent(new Event('load'));
    
    await waitFor(() => {
      expect(img).toHaveClass('opacity-100');
    });
  });

  it('applies custom className', () => {
    render(<LazyImage src="/test.jpg" alt="Test" className="custom-class" priority />);
    
    const container = screen.getByRole('img').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('sets width and height attributes', () => {
    render(<LazyImage src="/test.jpg" alt="Test" width={400} height={300} priority />);
    
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('width', '400');
    expect(img).toHaveAttribute('height', '300');
  });
});