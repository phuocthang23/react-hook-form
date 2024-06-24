import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";

let renderCount = 0;
const FormComponent = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    channel: "",
  });

  renderCount++;
  const { register, control, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const onSubmit = (data: any) => {
    console.log("daaa", data);
  };
  // đây là các value có trong register
  // const { name, ref, onChange, onBlur } = register("username");
  return (
    <div>
      <h1>YouTube Form {renderCount / 2}</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="username">Username</label>
          {/* <input type="text" id="username" name="username" /> */}
          <input
            type="text"
            id="username"
            {...register("username", {
              required: {
                value: true,
                message: "userName is required",
              },
            })}
          />
          <p className="error">{errors.username?.message as string}</p>
        </div>

        <div className="form-control ">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: {
                value: true,
                message: "Please enter your email address",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: " invalid email format",
              },
            })}
          />
          <p className="error">{errors.email?.message as string}</p>
        </div>

        <div>
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: {
                value: true,
                message: "invalid channel name",
              },
            })}
          />
          <p className="error">{errors.channel?.message as string}</p>
        </div>

        <div>
          <button>Submit</button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default FormComponent;
