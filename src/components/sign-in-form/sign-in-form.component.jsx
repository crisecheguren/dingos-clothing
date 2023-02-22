import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss'
import Button from '../button/button.component';

const defaultFormValues = {
    email: '',
    password: '',
};


const SignInForm = () => {
    const [formValues, setFormValues] = useState(defaultFormValues);
    const {  email, password } = formValues;

    console.log(formValues)

    const resetForm = () => {
        setFormValues(defaultFormValues);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(response);
            resetForm();
        } catch (error) {
           
        }
    };

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
               
                <FormInput type="email" label="email" name="email" onChange={handleChange} value={email}required/>
                <FormInput type="password" label="Password" name="password" onChange={handleChange} value={password} required/>
               
                <div className='buttons-container'>
                    <Button  onClick={handleSubmit} type="submit">Sign In</Button>
                    <Button  buttonType='google' onClick={signInWithGoogle} type="submit">Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;