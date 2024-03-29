import { useState } from 'react';
import FormInput from '../form-input/form-input.component';
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { ButtonsContainer, SignInContainer, SignInTitle } from './sign-in-form.styles';



const defaultFormValues = {
    email: '',
    password: '',
};


const SignInForm = () => {
    const [formValues, setFormValues] = useState(defaultFormValues);
    const {  email, password } = formValues;
    

    
    const resetForm = () => {
        setFormValues(defaultFormValues);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);

            resetForm();
        } catch (error) {
           switch (error.code) {
                case "auth/user-not-found":
                    console.log("User not found");
                    break;
                case "auth/wrong-password":
                    console.log("Wrong password");
                    break;
                default:
                    console.log("Error signing in", error.code);
                    break;
                    
        } 
    };
};

    const signInWithGoogle = async () => {
        try {
        await signInWithGooglePopup();
    }   catch (error) {
        console.log("Error signing in with Google", error);
    }
};


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <SignInContainer>
            <SignInTitle>Already have an account?</SignInTitle>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
               
                <FormInput type="email" label="email" name="email" onChange={handleChange} value={email} required/>
                <FormInput type="password" label="Password" name="password" onChange={handleChange} value={password} required/>
               
                <ButtonsContainer>
                    <Button  type="submit">Sign In</Button>
                    <Button  buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} type="button">Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
};

export default SignInForm;