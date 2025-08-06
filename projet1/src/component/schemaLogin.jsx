import * as z from 'zod';


const LoginSchema = z.object({
    email: z.email('Email invalide, Veuillez réessayer !'),
    password: z.string().min(8, "Le mot de passe doit contenir au moin 8 caractères").max(16, "Le mot de passe est trop long")
})

export default LoginSchema;