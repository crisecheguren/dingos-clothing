import { useState } from 'react';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div>
            <h1>Sign Up with your email and passowrd</h1>
            <form onSubmit={() => {}}>
                <label>Display Name</label>
                <input type="text" name="displayName" onChange={handleChange} value={displayName} required/>
                <label>Email</label>
                <input type="email" name="email" onChange={handleChange} value={email}required/>
                <label>Password</label>
                <input type="password" name="password" onChange={handleChange} value={password} required/>
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword} required/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUpForm;