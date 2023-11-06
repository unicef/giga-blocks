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
import { useContributionGetById } from "@hooks/contribute/useContribute";

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

export default function ContributeDetail({ id }: Props) {
  const [profile, setProfile] = useState({
    fullname: "",
    schoolName: "",
    createdAt: "",
    status: "",
    contributed_data: "",
    coverage: "",
    mintedStatus:""
  });

  const { data, isSuccess, isError } = useContributionGetById(id);


  const {mutate, isError:isMintError,data:mintData, isSuccess :isMintSuccess, error:mintError} = useMintSchools();

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
      const keyValue = Object.entries(data?.contributed_data);
      const jsonString = JSON.parse(keyValue.map(pair => pair[1]).join(''));
      setProfile({
        fullname: data?.contributedUser?.name,
        schoolName: data?.school.name,
        createdAt: new Date(data?.createdAt).toLocaleDateString(),
        status: data?.status,
        contributed_data: jsonString,
        coverage: data?.coverage_availability,
        mintedStatus: data?.minted
        ,
      });
    }
  }, [isSuccess, isError, data]);

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

  // const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setProfile((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UpdateUserSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const signTransaction = async () =>{
    const signer = (web3.provider as unknown as JsonRpcProvider).getSigner() as unknown as Signer;
    const signature = await mintSignature(signer, '1');
    return signature;
  }

  const mintSchool = async () => {
    const signature = await signTransaction();
    if(!signature) return Error("Signature is null");
    mutate({data:nftData, signatureWithData:signature})
  }

  return (
    <>
      <Grid item xs={8}>
        <Container>
          <CustomBreadcrumbs heading="Contribution Detail" />
          <FormProvider methods={methods}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Box rowGap={3} columnGap={2} display="grid">
                    <ProfileTextField
                      name="name"
                      value={profile?.fullname || ""}
                      label="Contributed by"
                    />

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
                        label="Status"
                      />
                      
                      <span>Contributed Data</span>
                      <ProfileTextField
                        name="coverage"
                        value={Object.values(profile?.contributed_data)[0] || ""}
                        label={Object.keys(profile?.contributed_data)[0] || ""}
                      />
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
      {/* <Grid item xs={4}>
        <Container>
          <Box justifyContent={"center"}>
            <Stack alignItems="center" sx={{ mt: 1 }}>
              {profile.mintedStatus === "NOTMINTED" && 
              <Button variant="contained" color={"info"} style={{ width: "300px", background: '#474747' }} onClick={mintSchool}>
                Mint
              </Button>}
            </Stack>
            <Stack sx={{ mt: 8 }}>
            <Box display="flex" justifyContent="center">
              <Identicon string={profile?.fullname} size={200} />
            </Box>
            </Stack>
          </Box>
        </Container>
      </Grid> */}
    </>
  );
}
