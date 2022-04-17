import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
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
        {data && <> {JSON.stringify(data)} </>}
    </Content>


}
export default Page;