import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import google from "/google.svg";
import PlannerRegister from "./PlannerRegister";
import { LogoHeader, TabSwitcher } from "../../components";
import PlannerVerify from "./PlannerVerify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggler } from "../../features/user/userSlice";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const initialValues = {
  name: "",
  username: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const VendorInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggle = (event) => {
    event.preventDefault();
    dispatch(toggler());
    navigate("/vendor-register");
  };

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-bold">Create Your Business Profile</h1>
      <ul className="list-disc pl-5 space-y-2">
        <li>
          Create your business listing with round-the-clock phone and email
          service.
        </li>
        <li>Create your terms for event booking and cancellations.</li>
        <li>Control your reservation schedule.</li>
      </ul>
      <button
        onClick={handleToggle}
        className="bg-primary w-full text-center button-style my-7"
      >
        Get Started
      </button>
    </div>
  );
};

const Register = () => {
  const [activeTab, setActiveTab] = useState("Planner");
  const [isVerified, setIsVerified] = useState(false);
  const dispatch = useDispatch();
  const { toggle } = useSelector((store) => store.user);

  const handleToggle = () => {
    dispatch(toggler());
  };

  const handleSubmit = (values) => {
    // Handle form submission
    console.log(values);
    setIsVerified(true);
  };

  if (isVerified) {
    return <PlannerVerify />;
  }

  return (
    <div className="md:grid md:grid-cols-5">
      <div className="align-element flex flex-col md:col-span-3 gap-8 py-10 2xl:py-[33px] md:px-48 flex-1">
        {!toggle && (
          <>
            <LogoHeader />
            <div className="flex flex-col gap-2">
              <div className="text-xl font-bold">Sign Up</div>
              <p className="text-gray-500">
                Etiam accumsan lorem leo, non aliquet ipsum mattis non.
                Suspendisse laoreet non turpis in tempus.
              </p>
            </div>

            <TabSwitcher
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabs={["Planner", "Vendor"]}
            />
          </>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="grid gap-5">
              {activeTab === "Planner" ? (
                <PlannerRegister />
              ) : (
                <VendorInfo />
              )}
            </div>
            {activeTab === "Planner" && (
              <>
                <div className="flex items-center gap-2 py-2">
                  <Field
                    type="checkbox"
                    name="terms"
                    className="checkbox checkbox-sm checkbox-primary"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-primary text-sm font-semibold"
                  >
                    I accept terms and conditions & privacy policy
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-center mt-4 py-2 font-semibold rounded-lg"
                >
                  {activeTab === "Planner" ? "Sign Up" : "Register"}
                </button>
                <div className="flex items-center my-4">
                  <hr className="flex-grow border-t border-gray-300" />
                  <span className="mx-8 font-semibold">OR</span>
                  <hr className="flex-grow border-t border-gray-300" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <img src={google} alt="google" />
                  <div>Signup with Google</div>
                </div>
              </>
            )}
          </Form>
        </Formik>
        <div className="text-right py-4">
          Registered User?{" "}
          <a href="/login" className="text-primary">
            Log In
          </a>
        </div>
      </div>
      <div className="hidden lg:bg-[url('/auth.svg')] lg:bg-no-repeat lg:bg-cover lg:block lg:col-span-2 lg:w-full lg:min-h-screen lg:h-full"></div>
    </div>
  );
};

export default Register;
