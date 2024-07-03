import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
// import { useEffect } from "react";

let renderCount = 0;
type formValues = {
  username: string;
  email: string;
  channel: string;
  social: {
    twitter: string;
    facebook: string;
  };
  phoneNumbers: string[];
  phoneN: {
    number: string;
  }[];
  age: number;
  dob: Date;
  selectOption: string;
  textBasedOnSelect: string;
};
const FormComponent = () => {
  renderCount++;

  const form = useForm<formValues>({
    defaultValues: async () => {
      return {
        username: "thang",
        email: "thang@gmail.com",
        channel: "thangtv",
        social: {
          twitter: "",
          facebook: "",
        },
        phoneNumbers: ["", ""],
        phoneN: [{ number: "" }],
        age: 0,
        dob: new Date(),
        selectOption: "",
        textBasedOnSelect: "",
      };
    },
  });

  const { register, control, handleSubmit, formState, watch, getValues } = form;

  // fieldArray
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phoneN",
  });

  // call errors
  const { errors } = formState;
  const onSubmit = (data: any) => {
    console.log("daaa", data);
  };

  // Watch the select field
  const watchedSelectOption = watch("selectOption");

  // watch callback
  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  // getValue
  const hanldeGetValue = () => {
    console.log(getValues());
  };

  return (
    <div>
      <h1>YouTube Form ({renderCount / 2})</h1>

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
              validate: {
                notAdmin: (value) => {
                  return value !== "admin@example.com" || " enter other email";
                },
                noBlackList: (value) => {
                  return (
                    !value.endsWith("baddomanin.com") || "this is bad domain"
                  );
                },
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
          <label htmlFor="twitter">twitter</label>
          <input
            type="text"
            id="twitter"
            {...register("social.twitter", {
              required: {
                value: true,
                message: "invalid twitter name",
              },
            })}
          />
          <p className="error">{errors.social?.twitter?.message as string}</p>
        </div>
        <div>
          <label htmlFor="facebook">facebook</label>
          <input
            type="text"
            id="facebook"
            {...register("social.facebook", {
              required: {
                value: true,
                message: "invalid facebook name",
              },
            })}
          />
          <p className="error">{errors.social?.facebook?.message as string}</p>
        </div>
        <div>
          <label htmlFor="primary-phone">phone1</label>
          <input
            type="text"
            id="phone1"
            {...register("phoneNumbers.0", {
              required: {
                value: true,
                message: "phone 1 not emty",
              },
            })}
          />
          <p className="error">{errors.phoneNumbers?.[0]?.message ?? ""}</p>
        </div>
        <div>
          <label htmlFor="second-phone">phone2</label>
          <input
            type="text"
            id="phone2"
            {...register("phoneNumbers.1", {
              required: {
                value: true,
                message: "phone 2 not emty",
              },
            })}
          />
          <p className="error">{errors?.phoneNumbers?.[1]?.message ?? ""}</p>
        </div>
        <div>
          <label htmlFor="username">Age</label>
          <input
            type="number"
            id="age"
            {...register("age", {
              valueAsNumber: true,
              required: {
                value: true,
                message: "age is required",
              },
            })}
          />
          <p className="error">{errors.age?.message as string}</p>
        </div>
        <div>
          <label htmlFor="username">dob</label>
          <input
            type="date"
            id="dob"
            {...register("dob", {
              required: {
                value: true,
                message: "dob is required",
              },
            })}
          />
          <p className="error">{errors.dob?.message as string}</p>
        </div>

        <div>
          <label htmlFor="">list of phone numbers </label>
          <div>
            {fields.map((field, index) => {
              return (
                <div className="form-control" key={field.id}>
                  <input
                    type="text"
                    {...register(`phoneN.${index}.number` as const)}
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      remove
                    </button>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              className="form-control"
              onClick={() => {
                append({ number: "" });
              }}
            >
              add more phone number
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="selectOption">Select an option</label>
          <div>
            <select
              style={{ width: "440px", height: "30px" }}
              {...register("selectOption")}
            >
              <option value="">Select...</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="textBasedOnSelect">Text based on select</label>
          <input
            type="text"
            {...register("textBasedOnSelect")}
            value={
              watchedSelectOption === "1"
                ? "Đã chọn 1"
                : watchedSelectOption === "2"
                ? "Đã chọn 2"
                : ""
            }
            readOnly
          />
        </div>
        <div>
          <button>Submit</button>
          <button type="button" onClick={hanldeGetValue}>
            get value
          </button>
        </div>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default FormComponent;
