import { Modal, TextInput, Form, Button } from "@carbon/react";
import { useLogin } from "../../hooks/useSignUp";
import { useForm, Controller } from "react-hook-form";
import { saveAccessToken, saveCurrentUser } from '../../utils/sessionManager';
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../auth/useAuthContext";
import { useState } from "react";

const CarbonModal = ({open, onClose, email}) => {

  const { handleSubmit, control } = useForm();
  const [error, setError] = useState()
  const{initialize} = useAuthContext()
  const login = useLogin();
  const {push} = useRouter()

    const onAdd = async (data) => {
        const payload = {
            email,
            otp: data.name
        }
        login.mutateAsync(payload)
        .then((res) => {
          saveCurrentUser(res.data)
          saveAccessToken(res.data.access_token)
          initialize()
          push('/contributeSchool');
        })
        .catch((err) => {
          console.log(err)
          setError("OTP verification unsuccessful, please try again")
        })
      }

    return ( 
    <Modal 
    open = {open} 
    onSecondarySubmit={onClose}
    modalHeading={!error ?  `Please check your email` : error}
    onRequestClose={onClose}
    modalLabel={`OTP sent to ${email}`}
    secondaryButtonText="Cancel"
    primaryButtonText="Submit"
    onRequestSubmit = {handleSubmit(onAdd)}
    >
      <p style={{
      marginBottom: '1rem'
    }}>
        <Form>
        <Controller
        name="name"
        control={control}
        rules={{ required: "Email is required" }}
        render={({ field }) => (
            <TextInput
            {...field}
            id="name"
            // style={{height: "48px" }}
            labelText="Enter OTP here"
            placeholder=""
            onChange={(e) => {
                field.onChange(e);
            }}
            />
        )}
        />
        </Form>
      </p>
    </Modal>
     );
}
 
export default CarbonModal;