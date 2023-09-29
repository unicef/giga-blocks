"use client";
import {
  ClickableTile,
  Column,
  Grid,
  Button,
  Toggletip,
  Loading,
  ToggletipContent,
  ToggletipButton,
  ToggletipActions,
} from "@carbon/react";
import "./card.scss";
import { useEffect, useState } from "react";
import { useSchoolGet } from "../../hooks/useSchool";
import Link from "next/link";
import { gql, useQuery } from "urql";
import  {Queries}  from "../../libs/graph-query";

const SchoolCard = () => {

  const [result] = useQuery( {query:Queries.nftListQuery} );
  const { data:queryData, fetching, error } = result;
  const [schoolData, setSchoolData] = useState([]);
  const [pageSize, setPageSize] = useState(12);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const { data, isLoading, isFetching } = useSchoolGet(1, pageSize);

  useEffect(() => {
    // isLoading === false && setSchoolData(data?.rows);
    if(queryData)decodeSchooldata(queryData)
  }, [data,queryData]);


  const decodeSchooldata = (data) =>{    
    const encodeddata = data.tokenUris
    const decodedShooldata = []
    for(let i = 0; i < encodeddata.length; i++){
      const decodedData = atob(encodeddata[i].tokenUri.substring(29))
      decodedShooldata.push(JSON.parse(decodedData))
    }
    setSchoolData(decodedShooldata) 
  }

  const loadMore = () => {
    if (pageSize < data?.meta.total - 12) {
      setPageSize(pageSize + 12);
    } else {
      setPageSize(data.rows.length);
      setAllDataLoaded(true);
    }
  };

  return (
    <>
      {fetching === false ? (
        <Grid fullWidth style={{ margin: "30px auto" }}>
          {schoolData &&
            schoolData?.map((school) => (
              <Column sm={4}>
                <ClickableTile className="card">
                  <div className="row">
                    <div>
                    <img src={school?.image} alt ='SVG Image'/>
                      <p className="text-purple">School Name</p>
                      <Toggletip align="right">
                        <ToggletipButton label="Show information">
                          <h4 style={{ minHeight: "56px" }}>
                            {school.name.length > 40
                              ? `${school.name
                                  ?.toLowerCase()
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" ")
                                  .slice(0, 40)}...`
                              : school.name
                                  ?.toLowerCase()
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1)
                                  )
                                  .join(" ")}
                          </h4>
                        </ToggletipButton>
                        <ToggletipContent>
                          <p>
                            {school.name
                              ?.toLowerCase()
                              .split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </p>
                        </ToggletipContent>
                      </Toggletip>
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: "15px" }}>
                    <div style={{ textAlign: "right" }}>
                      <p className="text-purple">Country</p>
                      <h4 className="heading2 text-left">{school.location}</h4>
                    </div>
                    <div>
                      <p className="text-purple">Education Level</p>
                      <h4 className="heading2">{school.education_level}</h4>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p className="text-purple">Internet</p>
                      <h4 className="heading2">
                        {school.connectivity_speed_status === "No connection"
                          ? "N/A"
                          : school.connectivity_speed_status}
                      </h4>
                    </div>
                  </div>
                </ClickableTile>
              </Column>
            ))}
          <Column sm={4} md={8} lg={16}>
            <Button
              onClick={loadMore}
              kind="tertiary"
              disabled={allDataLoaded}
              style={{ float: "right" }}
            >
              {allDataLoaded === false ? "Load more" : "No more data"}
            </Button>
          </Column>
        </Grid>
      ) : (
        <div className="loader-container">
          {" "}
          <Loading withOverlay={false} />{" "}
          <span>Loading school data, please wait...</span>{" "}
        </div>
      )}
    </>
  );
};

export default SchoolCard;
