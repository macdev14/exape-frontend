import React from "react";
import { Stack, Link, Text } from "@chakra-ui/react";



export default function Footer() {
  return (
    <>
      <Stack isInline marginTop="1.5rem" fontWeight="500" fontSize="sm">
        
      </Stack>
      <Stack isInline marginTop="1rem" fontWeight="500" fontSize="sm">
        <Text color="secondary.link">&copy; 2024</Text>
        <Link href="#" color="secondary.link" fontWeight="bold">
          EXAPE
        </Link>
        <Text color="secondary.link">&mdash; All rights reserved</Text>
      </Stack>
    </>
  );
}
