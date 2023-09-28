import { useState, ChangeEvent, useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Card, Grid, Stack, MenuItem, Select, Button, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useSnackbar } from "@components/snackbar";
import FormProvider, { ProfileTextField } from "@components/hook-form";
import { AdministrationService } from "@services/administration";
import { useSchoolGetById } from "@hooks/school/useSchool";
import Image from "next/image";
import CustomBreadcrumbs from "@components/custom-breadcrumbs";
// @ts-ignore
import Identicon from "react-identicons";

interface Props {
  isEdit?: boolean;
  currentUser?: any;
  id?: string | string[] | undefined;
}

interface FormValuesProps {
  id: string;
  name: string;
  email: string;
  position: string | null;
  phone: string;
  affiliation: string | null;
  roles: string;
  is_active: boolean;
}

export default function UserNewEditForm({ id }: Props) {
  const [profile, setProfile] = useState({
    fullname: "",
    location: "",
    latitude: "",
    longitude: "",
    connectivity: "",
    coverage: "",
  });

  const { data, isSuccess, isError } = useSchoolGetById(id);

  useEffect(() => {
    isSuccess &&
      setProfile({
        fullname: data?.name,
        location: data?.location,
        latitude: data?.lat,
        longitude: data?.lon,
        connectivity: data?.connectivity_speed_status,
        coverage: data?.connectivity_speed_status,
      });
  }, [isSuccess, isError, data]);

  console.log(data);

  const UpdateUserSchema = Yup.object().shape({
    name: Yup.string()
      .required()
      .matches(/^[a-zA-Z\s]+$/, "Name must contain only alphabets and spaces"),
    email: Yup.string().email("Email must be a valid email address"),
    phone: Yup.number().typeError("Phone must be a valid number"),
    position: Yup.string(),
    affiliation: Yup.string(),
    roles: Yup.string(),
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // const onSubmit = async (data: FormValuesProps) => {
  //   const { id, name, roles } = profile;
  //   const updatedProfile = { name, roles: [roles] };

  //   try {
  //     const response = await AdministrationService.updateUser(id, updatedProfile);
  //     if (response.statusText !== 'OK')
  //       enqueueSnackbar('Error while updating user', { variant: 'error' });
  //     enqueueSnackbar('User details updated successfully');
  //     if (isEdit) push('/user/list');
  //   } catch (error) {
  //     enqueueSnackbar('Something went wrong', { variant: 'error' });
  //   }
  // };

  // useEffect(() => {
  //   if (currentUser) {
  //     currentUser.roles = currentUser?.roles?.[0];
  //     setProfile(currentUser);
  //   }
  // }, [currentUser]);

  // useEffect(() => {
  //   methods.reset(profile);
  // }, [methods, profile]);

  return (
    <>
      <Grid item xs={8}>
        <Container>
          <CustomBreadcrumbs heading="School Detail Page" />
          <FormProvider methods={methods}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box rowGap={3} columnGap={2} display="grid">
                    <ProfileTextField
                      name="name"
                      value={profile?.fullname || ""}
                      label="Full Name"
                    />

                    <ProfileTextField
                      name="location"
                      value={profile?.location || ""}
                      label="Location"
                      disabled
                    />
                    <Box
                      display="grid"
                      rowGap={3}
                      columnGap={8}
                      gridTemplateColumns={{
                        xs: "repeat(1, 1fr)",
                        sm: "repeat(2, 1fr)",
                      }}
                    >
                      <ProfileTextField
                        name="latitude"
                        value={profile?.latitude || ""}
                        label="Latitude"
                      />
                      <ProfileTextField
                        name="longitude"
                        value={profile?.longitude || ""}
                        label="Longitude"
                      />
                      <ProfileTextField
                        name="connectivity"
                        value={profile?.connectivity || ""}
                        label="Connectivity"
                      />
                      <ProfileTextField
                        name="coverage"
                        value={profile?.coverage || ""}
                        label="Coverage"
                      />
                    </Box>
                  </Box>

                  <Stack alignItems="flex-start" sx={{ mt: 3 }}>
                    <Button variant="contained" color={"secondary"} style={{ width: "300px" }}>
                      Back
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </Container>
      </Grid>
      <Grid item xs={4}>
        <Container>
          <Box justifyContent={"center"}>
            {/* <Image width={250} height={250} alt='USER' src={'/assets/Image-right.svg'}/> */}
            <Stack alignItems="flex-start" sx={{ mt: 3 }}>
              <Button variant="contained" color={"info"} style={{ width: "300px" }}>
                Mint
              </Button>
            </Stack>
            <Stack style={{ marginTop: "20px" }}>
              <Identicon string={profile?.fullname} size={200} />
            </Stack>
          </Box>
        </Container>
      </Grid>
    </>
  );
}
