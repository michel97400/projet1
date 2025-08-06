import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../page/loginPage'; // adapte selon ton arborescence



describe('🧪 Login Component', () => {
  test('renders login form', () => {
    render(<Login />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument;
    expect(screen.getByLabelText('Mot de passe')).toBeInTheDocument;
    expect(screen.getByRole('button', { name: 'Se connecter' })).toBeInTheDocument;
  });

  test('shows validation errors on empty submit', async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }));

    screen.debug(); // affiche le DOM actuel dans la console

    await waitFor(() => {
      expect(screen.getByText('Email invalide, Veuillez réessayer !')).toBeInTheDocument;
      expect(screen.getByText('Mot de passe')).toBeInTheDocument;
    });
  });

  test('accepts valid input and submits', async () => {
    render(<Login />);

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Mot de passe'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }));

    await waitFor(() => {
      expect(screen.queryByText('Email invalide, Veuillez réessayer !')).not.toBeInTheDocument;
      expect(screen.queryByText('Mot de passe')).not.toBeInTheDocument;
    });
  });

  test('blocks script injection in inputs (basic XSS test)', async () => {
    render(<Login />);
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Mot de passe');

    fireEvent.change(emailInput, {
      target: { value: "<script>alert('xss')</script>" },
    });

    fireEvent.change(passwordInput, {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Se connecter' }));

    screen.debug(); // affiche le DOM actuel dans la console

    await waitFor(() => {
      expect(screen.getByText('Tentative d’injection détectée')).toBeInTheDocument;
    });
  });
});
