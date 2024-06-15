import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import {ToastContainer, toast} from 'react-toastify';

type Inputs = {
    email: string
    password: string
};

export default function Login() {
    const { register,
        handleSubmit,
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        let email:string = data.email;
        let password:string = data.password;
        console.log("Email: ", email);
        console.log("Password: ", password);
        console.log("BaseURL: ", import.meta.env.VITE_BACKEND_URL);
        let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
            method: "POST",
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                username: email,
                password: password
            })
        }).then((response) => response.json());
        let result = response;
        console.log("Result: ", result);
        if(result.access_token) {
            // alert("User logged in successfully.");
            toast.success('User logged in successfully.');
            localStorage.setItem('token', result.access_token);
            localStorage.setItem('bearer', result.token_type);
            console.log("Token: ", result.access_token);
            // Redirect to the home page
            window.location.href = "/home";
        } else {
            // alert(result.detail?.detail);
            toast.error(result.detail?.detail);
        }

    };
	return (
		<div className="wrapper signIn">
			<div className="illustration">
				<img src="https://source.unsplash.com/random" alt="illustration" />
			</div>
			<div className="form">
				<div className="heading">LOGIN</div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label htmlFor="e-mail">E-Mail</label>
						<input type="email" id="e-mail" placeholder="Enter you mail" {...register("email")} />
					</div>
                    <div>
						<label htmlFor="password">Password</label>
						<input type="password" id="password" placeholder="Enter you password" {...register("password")} />
					</div>
					<button type="submit">
						Submit
					</button>
				</form>
				<p>
					Don't have an account ? <Link to="/signup"> Sign In </Link>
				</p>
			</div>
		</div>
	);
}
