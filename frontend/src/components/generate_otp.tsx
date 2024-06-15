import React from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string
}

export default function GenerateOtp() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        let email:string = data.email;
        console.log("Email: ", email);
        console.log("BaseURL: ", import.meta.env.VITE_BACKEND_URL);
        let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/generate_otp`, {
            method: "POST",
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                email: email
            })
        }).then((response) => response.json());
        if(response.status_code === 200) {
            alert("OTP generated successfully, Kindly verify your account.");
        }else {
            alert(response.detail[0]?.msg);
        }  
    };
    return (
        <div className="wrapper signIn">
            <div className="illustration">
                <img src="https://source.unsplash.com/random" alt="illustration" />
            </div>
            <div className="form">
                <div className="heading">GENERATE OTP</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="e-mail">E-Mail</label>
                        <input type="email" id="e-mail" placeholder="Enter you mail" {...register("email")} />
                    </div>
                    <button type="submit">
                        Submit
                    </button>
                </form>
                <p>
                    Already have an account ? <Link to="/"> Sign In </Link>
                </p>
                <p>
                    Verify OTP ? <Link to="/verify_otp"> Verify OTP </Link>
                </p>
            </div>
        </div>
    );
};