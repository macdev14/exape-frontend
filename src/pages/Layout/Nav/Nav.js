import React from "react";
import {
  Flex,
  Container,
  Image,
  Stack,
  Link,
  Text,
  Icon,
  Button,
  Menu,
  MenuItem,
  MenuDivider,
  MenuGroup,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";

import { FaCog, FaUserShield, FaUserAlt } from "react-icons/fa";


import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../common/context/authContext";

export default function Nav() {
  const { user, Logout } = useAuth()
  const navigate = useNavigate()
  return (
    <Flex
      position={{ md: "fixed" }}
      bg="#ffffff"
      minH="4rem"
      w="100%"
      marginTop={{ md: "-4rem" }}
      zIndex="99"
    >
      <Container maxW="container.lg" paddingTop="5px">
        <Stack
          direction={["column", "row"]}
          alignItems={["flex-end", "center"]}
        >
          { user &&(
            user.is_superuser ?
            <FaUserShield size={40}/>
            :

          <FaUserAlt size={40}/>

  )
          }
          <Text  marginLeft={50} fontSize="xl" fontWeight="500" color="black">
          Olá, {user && user.username}
          </Text>
          <Stack direction={["column", "row"]} style={{ marginLeft: "5rem" }}>
          
      
          
           
          </Stack>
          <Stack direction={["column", "row"]} style={{ marginLeft: "auto" }}>         
          <Menu>
              <MenuButton
                onClick={()=>{Logout(); navigate('/login')}}
                as={Button}
                colorScheme="navItem"
                variant="ghost"
                color="red"
               
              >
                Sair
              </MenuButton>
              
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </Flex>
  );
}
