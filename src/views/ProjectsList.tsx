import React, { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../client";
import { Project } from "../graphql/graphqlTypes";
import { getAllProjects } from "../services/project.service";
import { NavLink } from "react-router-dom";
import { Button, ButtonGroup } from "@material-ui/core";

function ProjectsList() {
  const initState: Project[] = [];
  const [projects, setProjects] = useState(initState);

  useEffect(() => {
    async function load() {
      const res: Project[] = await getAllProjects();
      setProjects(res);
    }
    load();
    return () => {};
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <p>Hello User!.</p>
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical primary button group"
        >
          {projects.map((p) => (
            <Button
              variant="outlined"
              color="primary"
              key={p.id}
              component={NavLink}
              to={`Project/${p.id}`}
            >
              {p.name}
            </Button>
          ))}
        </ButtonGroup>
      </div>
    </ApolloProvider>
  );
}

export default ProjectsList;
