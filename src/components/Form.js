import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = (data) => {
    console.log(data);
  };

  return (
    <form className="" onSubmit={handleSubmit(submit)}>
      <Input
        label="Share Something"
        type="text"
        required={true}
        {...register("feelings", { required: true })}
      />
      <Button type="submit" className="m-4 shadow-md">
        Share
      </Button>
    </form>
  );
};

export default Form;
