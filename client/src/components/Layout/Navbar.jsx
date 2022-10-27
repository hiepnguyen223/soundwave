import { Icon, VStack } from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import {VscSettings} from "react-icons/vsc"
import { BsCollectionPlayFill, BsFillPersonFill, BsMusicNote } from "react-icons/bs";

export default function Navbar(){
    return(
        <VStack position="fixed" top="56px" left={0} bottom={0} padding="60px 40px" spacing={12}>
            <Icon as={AiFillHome} fontSize={32} color="gray"/>
            <Icon as={BsMusicNote} fontSize={32} color="gray" />
            <Icon as={BsFillPersonFill} fontSize={32} color="gray"/>
            <Icon as={BsCollectionPlayFill} fontSize={32} color="gray"/>
            <Icon as={VscSettings} fontSize={32} color="gray"/>
        </VStack>
    )
}