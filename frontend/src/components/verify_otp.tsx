import React from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
    email: string
    otp: number
}

export default function VerifyOtp() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        let email:string = data.email;
        let otp:number = data.otp;
        console.log("Email: ", email);
        console.log("OTP: ", otp);
        console.log("BaseURL: ", import.meta.env.VITE_BACKEND_URL);
        let response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/verify_otp`, {
            method: "POST",
            headers: { 
                "Accept": "application/json",
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                email: email,
                otp: otp
            })
        }).then((response) => response.json());
        if(response) {
            alert("OTP verified successfully, Kindly login to your account.");
            
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
                <div className="heading">VERIFY OTP</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="e-mail">E-Mail</label>
                        <input type="email" id="e-mail" placeholder="Enter you mail" {...register("email")} />
                    </div>
                    <div>
                        <label htmlFor="otp">OTP</label>
                        <input type="number" id="otp" placeholder="Enter OTP" {...register("otp")} />
                    </div>
                    <button type="submit">
                        Submit
                    </button>
                </form>
                <p>
                    Don't have an account ? <Link to="/signup"> Sign Up </Link>
                </p>
            </div>
        </div>
    );
};