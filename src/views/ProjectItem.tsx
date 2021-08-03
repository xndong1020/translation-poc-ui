import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Project } from "../graphql/graphqlTypes";
import { findProjectById } from "../services/project.service";

interface ParamTypes {
  id: string;
}

const ProjectItem = () => {
  const initState: Project = {
    id: 0,
    name: "",
    createdAt: "",
    updatedAt: "",
  };
  const history = useHistory();
  const [project, setProject] = useState(initState);
  const { id } = useParams<ParamTypes>();

  useEffect(() => {
    async function findById(projectId: string) {
      const res: Project = await findProjectById(+projectId);
      setProject(res);
    }
    findById(id);
    return () => {};
  }, [id]);

  return (
    <div>
      <h1>{project.name}</h1>
      <h2>{project.createdAt}</h2>
      <h2>{project.updatedAt}</h2>
      <Button
        onClick={() => {
          history.push("/admin/Projects");
        }}
      >
        Back
      </Button>
    </div>
  );
};

export default ProjectItem;
