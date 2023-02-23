import { useState, useContext } from 'react';
import FormInput from '../form-input/form-input.component';
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import './sign-in-form.styles.scss'
import Button from '../button/button.component';
import { UserContext } from '../../contexts/user.context';


const defaultFormValues = {
    email: '',
    password: '',
};


const SignInForm = () => {
    const [formValues, setFormValues] = useState(defaultFormValues);
    const {  email, password } = formValues;
    
    const { setCurrentUser } = useContext(UserContext);
    
    const resetForm = () => {
        setFormValues(defaultFormValues);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);
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
            const { user } = await signInWithGooglePopup();
            await createUserDocumentFromAuth(user);
            setCurrentUser(user);
    }   catch (error) {
        console.log("Error signing in with Google", error);
    }
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
               
                <FormInput type="email" label="email" name="email" onChange={handleChange} value={email} required/>
                <FormInput type="password" label="Password" name="password" onChange={handleChange} value={password} required/>
               
                <div className='buttons-container'>
                    <Button  type="submit">Sign In</Button>
                    <Button  buttonType='google' onClick={signInWithGoogle} type="button">Google Sign In</Button>
                </div>
            </form>
        </div>
    );
};

export default SignInForm;