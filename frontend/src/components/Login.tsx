import { Button, Snackbar, Stack, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import Carlist from "./Carlist";

type User = {
  username: string;
  password: string;
};

export default function Login() {
  const [user, setUser] = useState<User>({ username: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [open, setOpen] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  function handleLogin() {
    axios
      .post(import.meta.env.VITE_API_URL + "/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const token = response.headers["authorization"];
        if (token) {
          sessionStorage.setItem("jwt", token);
          setIsAuthenticated(true);
        }
      })
      .catch(() => setOpen(true));
  }

  function handleLogout() {
    setIsAuthenticated(false);
    sessionStorage.removeItem("jwt");
  }

  if (isAuthenticated) {
    return <Carlist logout={handleLogout} />;
  }

  return (
    <Stack spacing={2} alignItems="center" mt={2}>
      <TextField name="username" label="Username" onChange={handleChange} />
      <TextField
        type="password"
        name="password"
        label="Password"
        onChange={handleChange}
      />
      <Button variant="outlined" color="primary" onClick={handleLogin}>
        Login
      </Button>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="Login failed: Check your username and password"
      />
    </Stack>
  );
}
