import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Content from "../../components/Content";
import useAPI from "../../hooks/useAPI";
import advisorsAPI from "../../api/advisors";
const Page = () => {
    const { advisorId } = useParams();
    const { loading, request, error, data } = useAPI(advisorsAPI.getByEmployeeId);
    useEffect(() => {
        request(advisorId);
    }, [])
    return <Content error={error} isLoading={loading} title="Advisor Profile">
        {data && <> {JSON.stringify(data)} </>}
    </Content>


}
export default Page;