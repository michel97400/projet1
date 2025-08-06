import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../page/loginPage'; // adapte selon ton arborescence

describe('🧪 Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Se connecter/i })).toBeInTheDocument();
  });

  test('shows validation errors on empty submit', async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: /Se connecter/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email invalide/i)).toBeInTheDocument();
      expect(screen.getByText(/Mot de passe/i)).toBeInTheDocument();
    });
  });

  test('accepts valid input and submits', async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Se connecter/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Email invalide/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Mot de passe/i)).not.toBeInTheDocument();
    });
  });

  test('blocks script injection in inputs (basic XSS test)', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Mot de passe/i);

    fireEvent.change(emailInput, {
      target: { value: "<script>alert('xss')</script>" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole('button', { name: /Se connecter/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email invalide/i)).toBeInTheDocument();
    });
  });
});
