import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import './sign-up-form.styles.scss'
import Button from '../button/button.component';

const defaultFormValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};


const SignUpForm = () => {
    const [formValues, setFormValues] = useState(defaultFormValues);
    const { displayName, email, password, confirmPassword } = formValues;

    const resetForm = () => {
        setFormValues(defaultFormValues);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        try {
            const response = await createAuthUserWithEmailAndPassword(email, password);

            await createUserDocumentFromAuth(response, { displayName });
            resetForm();
            console.log('user', response);
        } catch (error) {
            console.log('woops', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput type="text" name="displayName" label="Display Name" onChange={handleChange} value={displayName} required/>
                <FormInput type="email" label="email" name="email" onChange={handleChange} value={email}required/>
                <FormInput type="password" label="Password" name="password" onChange={handleChange} value={password} required/>
                <FormInput type="password" label="Confirm Password" name="confirmPassword" onChange={handleChange} value={confirmPassword} required/>
                <Button  onClick={handleSubmit} type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;