import { useState } from "react";
import { MainLayout } from "../layouts/MainLayout/MainLayout";
import { Box } from "../shared/components/Box";
import { Button } from "../shared/components/Button";
import { Card } from "../shared/components/Card";
import { GridContainer, GridRow, GridItem } from "../shared/components/Grid";
import { TextField } from "../shared/components/TextField";
import { Heading2 } from "../shared/components/Typography";
import { useAuthState } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [_authState, dispatchAuthState] = useAuthState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleClickLogin = () => {
    dispatchAuthState({
      type: "LOG_IN",
      payload: {
        username,
      }
    })
    navigate("/");
  }

  return (
    <MainLayout>
      <GridContainer>
        <GridRow>
          <GridItem>
            <Card>
              <Heading2>Log In</Heading2>
              <Box w="100%" p={8} />
              <TextField name="username" label="Username" value={username} onChange={handleUsernameChange}/>
              <TextField name="password" label="Password" value={password} onChange={handlePasswordChange}/>
              <Button onClick={handleClickLogin}>Log In</Button>
            </Card>
          </GridItem>
        </GridRow>
      </GridContainer>
    </MainLayout>
  );
};

export default LoginPage;
