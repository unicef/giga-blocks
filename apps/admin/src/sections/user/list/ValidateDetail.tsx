import { useState, ChangeEvent, useEffect, use } from "react";
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
import {hooks} from "@hooks/web3/metamask";
import { JsonRpcProvider, Signer } from "ethers";
import { mintSignature } from "@components/web3/utils/wallet";
import { useMintSchools } from "@hooks/school/useSchool";
import { useWeb3React } from "@web3-react/core";
import { useContributionGetById, useContributionValidate } from "@hooks/contribute/useContribute";
import { useValidDataGetById } from "@hooks/validate/useValidate";

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

export default function ValidateDetail({ id }: Props) {
  const [profile, setProfile] = useState({
    fullname: "",
    schoolName: "",
    createdAt: "",
    status: "",
    contributed_data: "",
    coverage: "",
    mintedStatus:""
  });

  const { data, isSuccess, isError, refetch } = useValidDataGetById(id);
  const { enqueueSnackbar } = useSnackbar();

  const {mutate, isSuccess:isValidationSuccess, isError:isValidationError} = useContributionValidate()

  console.log(data)
  const web3 = useWeb3React();

  const [nftData, setNftData] = useState(
    {
      id: "",
      schoolName: "",
      longitude: "",
      latitude: "",
      schoolType: "",
      country: "",
      connectivity: "",
      coverage_availabitlity: "",
      electricity_availabilty: "",
      mintedStatus: "",
    }
  )

  useEffect(() => {
    
    if(isSuccess){
      const keyValue = Object.entries(data?.data);
    //   const jsonString = keyValue.map(pair => pair[1]).join('');
      const jsonString = `${keyValue[0][0]}: ${keyValue[0][1]}`
      setProfile({
        fullname: data?.contributedUser?.name,
        schoolName: data?.school.name,
        createdAt: new Date(data?.createdAt).toLocaleDateString(),
        status: String(data?.approvedStatus),
        contributed_data: jsonString,
        coverage: data?.coverage_availability,
        mintedStatus: data?.minted
        ,
      });
    }
  }, [isSuccess, isError, data]);

  useEffect(() => {
    isValidationSuccess && enqueueSnackbar("Successfully updated contribution", { variant: 'success' }); refetch();
    isValidationError && enqueueSnackbar("Unsuccessful", { variant: 'error' })
  }, [isValidationSuccess, isValidationError])

  useEffect(() => {
    setNftData({
      id: data?.id,
      schoolName: data?.name,
      longitude: data?.longitude,
      latitude: data?.latitude,
      schoolType: data?.school_type,
      country: data?.country,
      connectivity: data?.connectivity,
      coverage_availabitlity: data?.coverage_availability,
      electricity_availabilty: data?.electricity_available,
      mintedStatus: data?.minted,
    })
  }, [data])

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

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onContribute = (validity:boolean) => {
    const payload = {contributions: [{contributionId: id, isValid: validity}]}
    mutate(payload)
  }

  return (
    <>
      <Grid item xs={8}>
        <Container>
          <CustomBreadcrumbs heading="Validation Detail" />
          <FormProvider methods={methods}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box rowGap={3} columnGap={2} display="grid">
                    {/* <ProfileTextField
                      name="name"
                      value={profile?.fullname || ""}
                      label="Contributed by"
                    /> */}

                    <ProfileTextField
                      name="location"
                      value={profile?.schoolName || ""}
                      label="School Name"
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
                        value={profile?.createdAt || ""}
                        label="Created At"
                      />
                      <ProfileTextField
                        name="longitude"
                        value={profile?.status || ""}
                        label="Approved Status"
                      />
                      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                      <span>
                      <ProfileTextField
                        name="coverage"
                        value={profile?.contributed_data || ""}
                        label={"Contributed Data"}
                      />
                      </span>
                      </div>
                    </Box>
                  </Box>

                  <Stack alignItems="flex-start" sx={{ mt: 3 }}>
                    <Button variant="contained" style={{ width: "300px", background: "#474747" }}>
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
            <Stack alignItems="center" sx={{ mt: 1 }}>
            <Button variant="contained" color={"info"} style={{ width: "300px", background: '#474747' }} onClick={() => onContribute(false)}>
                Approve
              </Button>
            </Stack>
          </Box>
        </Container>
      </Grid>
    </>
  );
}
