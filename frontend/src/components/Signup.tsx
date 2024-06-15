import React from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    name: string
    email: string
    password: string    
}

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        let name:string = data.name;
        let email:string = data.email;
        let password:string = data.password;

        let baseUrl:string = import.meta.env.VITE_BACKEND_URL;
        let response = await fetch(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        }).then((response) => response.json());
        console.log("Response: ", response);
        if(response.status_code === 201) {
            alert("User created successfully, Kindly check your mail to verify your account.");
        } else {
            alert(response.detail[0]?.msg);
        }

    }
    return (
        <div className="wrapper signUp">
            <div className="illustration">
                <img src="https://source.unsplash.com/random" alt="illustration" />
            </div>
            <div className="form">
                <div className="heading">CREATE AN ACCOUNT</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter your name" {...register("name")} />
                    </div>
                    <div>
                        <label htmlFor="name">E-Mail</label>
                        <input type="text" id="name" placeholder="Enter your mail" {...register("email")}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                        type="password"
                        id="password"
                        placeholder="Enter you password"
                        {...register("password")}
                        />
                    </div>
                    <button type="submit">Submit</button>
                    <h2 style={{ textAlign: "center" }} className="or">
                        OR
                    </h2>
                </form>
                <p>
                    Have an account ? <Link to="/"> Login </Link>
                </p>
                <p>
                    Generate OTP for your account ? <Link to="/generate_otp"> Generate OTP </Link>
                </p>
            </div>
        </div>
    );
}
