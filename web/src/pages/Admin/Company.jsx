import React, { useEffect } from "react";
import {
  Card,
  StyledBody,
  StyledAction,
  StyledThumbnail,
} from 'baseui/card';
import { Button } from 'baseui/button';
import { Avatar } from "baseui/avatar";
import { useParams } from "react-router-dom";
import { ListItem, ListItemLabel } from 'baseui/list';
import Content from "../../components/Content";
import useAPI from "../../hooks/useAPI";
import companiesAPI from "../../api/companies";
const Page = () => {
  const { name } = useParams();
  const { loading, request, error, data } = useAPI(companiesAPI.getByName);
  useEffect(() => {
    request(name);
  }, [])
  return <Content error={error} isLoading={loading} title="Company Profile">
    {data && <>
      <Card
        title={data.name}
        headerImage={
          data.logo || "https://via.placeholder.com/250x250.png?text=No+Company+Logo+Avaliable"
        }
      >
        <Avatar
          name={data.user.fullname}
          size="scale1600"
          src={data.user.profilePicture}
        />
        <StyledBody>
          <ListItem>
            <ListItemLabel description="Company Advisor Full name">{data.user.fullname}</ListItemLabel>
          </ListItem>
          <ListItem>
            <ListItemLabel description="Company Advisor Email">{data.user.email}</ListItemLabel>
          </ListItem>
          <ListItem>
            <ListItemLabel description="Company name">{data.name}</ListItemLabel>
          </ListItem>
          <ListItem>
            <ListItemLabel description="Company description">{data.description}</ListItemLabel>
          </ListItem>
        </StyledBody>
        <StyledAction>
        </StyledAction>
      </Card>

    </>}
  </Content>


}
export default Page;