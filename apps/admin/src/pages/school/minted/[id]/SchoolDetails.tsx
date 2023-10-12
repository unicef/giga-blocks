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
import { useQuery } from "urql";
import { Queries } from "src/libs/graph-query";

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

export default function SchoolDetails({ id }: Props) {
  const [profile, setProfile] = useState({
    fullname: "",
    location: "",
    latitude: "",
    longitude: "",
    connectivity: "",
    coverage: "",
    mintedStatus:"",
    tokenId:"",
  });

  const [result] = useQuery({query:Queries.nftDetailsQuery,variables:{id:id}});
  const {data, fetching,error} = result


//   const { data, isSuccess, isError } = useSchoolGetById(id);

  const decodeData = (schooldata:any)=>{
    const encodeddata = schooldata?.tokenUri;
    const decodedData = atob(encodeddata.tokenUri.substring(29));
    const schoolData = {
      tokenId: encodeddata?.id,
      ...JSON.parse(decodedData),
    };
    setProfile({
      fullname: schoolData.schoolName,
      location: schoolData.country,
      latitude: schoolData.latitude,
      longitude: schoolData.longitude,
      connectivity: schoolData.connectivity,
      coverage: schoolData.coverage_availabitlity,
      mintedStatus: schoolData.minted,
      tokenId: schoolData.tokenId
    });
  }


    useEffect(() => {
        if(data) decodeData(data);
    }, [data]);

const methods = useForm<FormValuesProps>({})

  return (
    <>
    {fetching && <p>Loading...</p>  }
      {!fetching &&
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
                      disabled
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
                        disabled
                      />
                      <ProfileTextField
                        name="longitude"
                        value={profile?.longitude || ""}
                        label="Longitude"
                        disabled
                      />
                      <ProfileTextField
                        name="connectivity"
                        value={profile?.connectivity || ""}
                        label="Connectivity"
                        disabled
                      />
                      <ProfileTextField
                        name="coverage"
                        value={profile?.coverage || ""}
                        label="Coverage"
                        disabled
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
      <Grid item xs={4}>
        <Container>
          <Box justifyContent={"center"}>
            {/* <Image width={250} height={250} alt='USER' src={'/assets/Image-right.svg'}/> */}
            <Stack sx={{ mt: 8 }}>
            <Box display="flex" justifyContent="center">
              <Identicon string={profile?.fullname} size={200} />
            </Box>
            </Stack>
          </Box>
        </Container>
      </Grid>
      </>}
    </>
  );
}
