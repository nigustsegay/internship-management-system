import React, { useEffect } from "react";
import {
  Card,
  StyledBody,
  StyledAction,
  StyledThumbnail,
} from 'baseui/card';
import { Avatar } from "baseui/avatar";
import { ListItem, ListItemLabel } from 'baseui/list';
import { Button } from 'baseui/button';
import { useParams } from "react-router-dom";
import Content from "../../components/Content";
import useAPI from "../../hooks/useAPI";
import advisorsAPI from "../../api/advisors";
import { useStyletron } from 'baseui';
const Page = () => {
  const { advisorId } = useParams();
  const [css] = useStyletron();
  const { loading, request, error, data } = useAPI(advisorsAPI.getByEmployeeId);
  useEffect(() => {
    request(advisorId);
  }, [])
  return <Content error={error} isLoading={loading} title="Advisor Profile">
    {data && <>

      <Card
        title={data.user.fullname}
      >
        <Avatar
          name={data.user.fullname}
          size="scale1600"
          src={data.user.profilePicture}
        />


        <StyledBody>
          <ListItem>
            <ListItemLabel description="Full name">{data.user.fullname}</ListItemLabel>
          </ListItem>
          <ListItem>
            <ListItemLabel description="Email">{data.user.email}</ListItemLabel>
          </ListItem>
          <ListItem>
            <ListItemLabel description="Employee ID"> {data.employeeId}</ListItemLabel>
          </ListItem>
          <ListItem>
            <ListItemLabel description="department"> {data.department}</ListItemLabel>
          </ListItem>
        </StyledBody>
        <StyledAction>

        </StyledAction>
      </Card>

    </>
    }
  </Content>



}
export default Page;