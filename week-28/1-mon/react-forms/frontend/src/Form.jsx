import React, { useState } from 'react';

const Form = () => {

    // sign up -> username, password, handle errors
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    // write a function that changes our state based on the input's e.target.value
    const updateUserName = (e) => {
        setUserName(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }


    const submitForm = (e) => {
        e.preventDefault();

        // error handling
        const newErrors = [];
        if (!userName) {
            newErrors.push("Username can not be empty");
        }

        if(userName.length < 5){
            newErrors.push("Username must be longer than 5 chars");
        }

        if(!password){
            newErrors.push("Password field can not be empty");
        }


        if(password.length < 5){
            newErrors.push("Password must be 6 more letters")
        }


        if (newErrors.length > 0) {
            setErrors(newErrors);
        } else {


            const form = {
                username: userName,
                password
            }
            console.log("Form submitted", form);
        }
        // some sort of post to the api
    }

    return (
        <>
            <form onSubmit={(e) => submitForm(e)}>
                {errors.length ? errors.map((err, idx) => (
                    <div key={`${idx}-${err}`}>
                        <p style={{ color: 'red' }}>{err}</p>
                    </div>
                )) : null}
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input
                        id="username"
                        type="text"
                        value={userName}
                        placeholder='username'
                        onChange={(e) => updateUserName(e)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input
                        id="password"
                        type="text"
                        value={password}
                        placeholder='password'
                        onChange={(e) => updatePassword(e)}
                    />
                </div>
                <button
                    disabled={errors.length > 0 ? true: false}
                >
                    submit
                </button>
            </form>
        </>
    );
}

export default Form;
