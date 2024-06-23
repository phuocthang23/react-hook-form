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
  const { register, control, handleSubmit } = useForm();
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
              required: " userName is required",
            })}
          />
        </div>

        <div>
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" {...register("email")} />
        </div>

        <div>
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register("channel")} />
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
