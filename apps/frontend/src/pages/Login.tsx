import { MainLayout } from "../layouts/MainLayout/MainLayout";
import { Box } from "../shared/components/Box";
import { Button } from "../shared/components/Button";
import { Card } from "../shared/components/Card";
import { GridContainer, GridRow, GridItem } from "../shared/components/Grid";
import { TextField } from "../shared/components/TextField";
import { Heading2 } from "../shared/components/Typography";
import { useAuthState } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginFormSchema = z.infer<typeof loginFormSchema>;

const loginFormSchema = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 characters.")
    .max(20, "Username too long, max 20 characters."),
  password: z
    .string()
    .min(5, "Password must contain at least 5 characters.")
    .max(20, "Password too long, max 20 characters."),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [_authState, dispatchAuthState] = useAuthState();
  const { register, handleSubmit, formState } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const handleSubmitForm = handleSubmit(({ username }) => {
    dispatchAuthState({
      type: "LOG_IN",
      payload: {
        username,
      },
    });
    navigate("/");
  });

  return (
    <MainLayout>
      <GridContainer>
        <GridRow>
          <GridItem>
            <Card>
              <form onSubmit={handleSubmitForm}>
                <Heading2>Log In</Heading2>
                <Box w="100%" p={8} />
                <TextField
                  type="text"
                  label="Username"
                  hintText="Enter your username"
                  required
                  error={formState.errors.username?.message}
                  {...register("username")}
                />
                <TextField
                  type="password"
                  label="Password"
                  hintText="Enter your password"
                  required
                  error={formState.errors.password?.message}
                  {...register("password")}
                />
                <Button type="submit">Log In</Button>
              </form>
            </Card>
          </GridItem>
        </GridRow>
      </GridContainer>
    </MainLayout>
  );
};

export default LoginPage;
