import { GroupContainer } from "./form-input.styles";

const FormInput = ({ label, ...otherProps }) => {
    return (
        <GroupContainer>
            <input className='form-input' {...otherProps}/>
            {label && ( 
                <label 
                    className={`${ 
                        otherProps.value.length ? 'shrink' : '' 
                    } form-input-label`}>
                        {label}
                </label> 
            )}
            
        </GroupContainer>
    );
};

export default FormInput;