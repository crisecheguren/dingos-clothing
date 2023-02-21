import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';


const defaultFormValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
};


const SignUpForm = () => {
    const [formValues, setFormValues] = useState(defaultFormValues);
    const { displayName, email, password, confirmPassword } = formValues;

    console.log(formValues)

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
        <div>
            <h1>Sign Up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                <FormInput type="text" name="displayName" label="Display Name" onChange={handleChange} value={displayName} required/>
                <FormInput type="email" label="email" name="email" onChange={handleChange} value={email}required/>
                <FormInput type="password" label="Password" name="password" onChange={handleChange} value={password} required/>
                <FormInput type="password" label="Confirm Password" name="confirmPassword" onChange={handleChange} value={confirmPassword} required/>
                <button onClick={handleSubmit} type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;