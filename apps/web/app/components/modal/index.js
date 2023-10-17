import { Modal, TextInput, Form, Button } from "@carbon/react";
import { useLogin } from "../../hooks/useSignUp";
import { useForm, Controller } from "react-hook-form";
import { saveAccessToken, saveCurrentUser } from '../../utils/sessionManager';
import { useRouter } from "next/navigation";

const CarbonModal = ({open, onClose, email}) => {

  const { handleSubmit, control } = useForm();
  const login = useLogin();
  const {push} = useRouter()

    const onAdd = async (data) => {
        console.log(data)
        const payload = {
            email,
            otp: data.name
        }
        login.mutateAsync(payload)
        .then((res) => {
          saveCurrentUser(res.data)
          saveAccessToken(res.data.access_token)
          push('/dashboard')
        })
        .catch((err) => {
          console.log(err)
        })
      }

    return ( 
    <Modal 
    open = {open} 
    onSecondarySubmit={onClose}
    modalHeading="Please check your email"
    onRequestClose={onClose}
    modalLabel={`OTP sent to ${email}`}
    secondaryButtonText="Cancel"
    >
      <p style={{
      marginBottom: '1rem'
    }}>
        Enter your OTP here
        <Form onSubmit={handleSubmit(onAdd)}>
        <Controller
        name="name"
        control={control}
        rules={{ required: "Email is required" }}
        render={({ field }) => (
            <TextInput
            {...field}
            id="name"
            style={{ marginBottom: "25px", height: "48px" }}
            labelText="Full Name"
            placeholder="Enter your fullname here"
            onChange={(e) => {
                field.onChange(e);
            }}
            />
        )}
        />
        <Button className="submit-btn" type="submit">
                Submit
              </Button>
        </Form>
      </p>
    </Modal>
     );
}
 
export default CarbonModal;