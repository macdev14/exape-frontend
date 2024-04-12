import React, { useContext, useState } from "react";
import {
  Box,
  Text,
  Stack,
  InputGroup,
  Input,
  InputLeftElement,
  Icon,
  FormLabel,
  Checkbox,
  Link,
  Button,
  Divider,
  FormControl,
  Heading,
} from "@chakra-ui/react";

import { FaRegEnvelope, FaLock } from "react-icons/fa";

import { PageContainer, Footer } from "../Layout";
import { useNavigate } from "react-router-dom";
import { ILogin } from "../../../../types";
import { useAuth } from "../../../common/context/authContext";



export default function Login() {
  const { SignIn } = useAuth();
  const navigate  = useNavigate();
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const handleFormSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
      event.preventDefault(); 
      const data: ILogin = {
        username: email,
        password: password  
      }
      SignIn(data).then(()=>navigate('/dashboard')); 
     
  
  };


  return (
    <PageContainer>
      <Box
        width={{ base: "90%", md: "400px" }}
        bg="secondary.card"
        rounded="lg"
        p={5}
      >
        <Heading marginBottom="1.5rem">Entrar</Heading>
        <form onSubmit={handleFormSubmit}>
          <Stack spacing={4} marginBottom="1rem">
            <FormControl>
              <FormLabel htmlFor="email">Usuário</FormLabel>
              <InputGroup>
                <InputLeftElement
                  children={
                    <Icon as={FaRegEnvelope} color="secondary.inputHelper" />
                  }
                />
                <Input
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                  focusBorderColor="main.500"
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Insira seu Usuário"
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <Stack justifyContent="space-between" isInline>
                <FormLabel htmlFor="password">Senha</FormLabel>
               
              </Stack>
              <InputGroup>
                <InputLeftElement
                  children={<Icon as={FaLock} color="secondary.inputHelper" />}
                />
                <Input
                  focusBorderColor="main.500"
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Insira sua senha"
                  onChange={(e)=>setPassword(e.target.value)}
                  value={password}
                />
              </InputGroup>
            </FormControl>
          </Stack>
          <Stack justifyContent="space-between" isInline marginBottom="1rem">
            <Stack isInline>
             
            </Stack>
          </Stack>
          <Stack marginBottom="1rem">
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Please wait.."
            
            >
            Entrar
            </Button>
          </Stack>
        </form>
        <Divider marginBottom="1rem" />
        <Stack>
         
        </Stack>
      </Box>
      <Footer />
    </PageContainer>
  );
}


