import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heading, HeadingLevel } from 'baseui/heading';
import { Button } from "baseui/button";
import { ParagraphSmall } from 'baseui/typography';
import Content from "../../components/Content";
import useAPI from "../../hooks/useAPI";
import tasksAPI from "../../api/tasks"

const Page = () => {
    const navigate = useNavigate();
    const { taskId } = useParams();
    const { loading, request: fetch, data: task } = useAPI(tasksAPI.getById);
    const { loading: completeLoading, request: markComplete, } = useAPI(tasksAPI.complete, { successMessage: "Task marked as complete", errorMessage: "Could not complete task", onComplete: () => { navigate(-1) } });
    useEffect(() => {
        fetch(taskId);
    }, [])
    return <Content isLoading={loading} title="Task Detail">
        {task && <>  <HeadingLevel>
            <Heading styleLevel={4}>{task.name}</Heading>
            <ParagraphSmall>
                {task.description}
            </ParagraphSmall>
        </HeadingLevel>
            <Button isLoading={completeLoading} onClick={() => { markComplete({ taskId: atob(taskId) }) }}>Mark as Done</Button>
        </>}
    </Content>
}
export default Page;