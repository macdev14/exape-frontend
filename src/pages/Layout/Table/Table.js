import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Checkbox,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  Table,
  Thead,
  Tbody,
  Select,
  Tr,
  Th,
  Td,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  HStack,

} from "@chakra-ui/react";

import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import "./Table.scss";
import { useApi } from "../../../hooks/useApi";
import ErrorAlert from "../Alert/ErrorAlert";
import SuccessAlert from "../Alert/SuccessAlert";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../common/context/authContext";


export default function CustomTable({
  headers = [],
  selected = [],
  selectable = false,
  bg = "secondary.card",
  color = "gray.800",
  source = "quotes"
}) {
  const [items, setItems ] = useState([]);
  // let itemsIds = items.map((item) => item.id);
  let [localSelected, setLocalSelected] = useState(selected);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const {del, get, post, put } = useApi();

  const navigate = useNavigate();

  const [editId, setEditId] = useState(0);

  const [companyOptions, setCompanyOptions] = useState([]);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const [message, setMessage] = useState('')

  const [field_one, setField_one] = useState('');
  const [field_two, setField_two] = useState('');
  const [field_three, setField_three] = useState('');
  const [field_four, setField_four] = useState('');
  const [field_five, setField_five] = useState('');
  const [field_six, setField_six] = useState('');
  const { user, getUser } = useAuth()

  const showAlerts = (success=false, msg=undefined)=>{
    msg && setMessage(msg)
    success ? setShowSuccess(true) : setShowError(true); 
  }
  const loadItems = async () => {
    switch (source) {
      case 'quotes':
        let usr = await getUser();
        if(usr && usr.id){
        get('cotacao/'+usr.id+'/')
        .then((res) => setItems(res) ).catch(()=>navigate('/login'))
        }

        // get('company/')
        // .then((res) => setCompanyOptions(res)).catch(()=>navigate('/login'))
        break;
      case 'company':
        get('company/')
        .then((res) => setItems(res)).catch(()=>navigate('/login'))
        break;
      default: setEditId(0)
     
    }
  }

     
  const loadFieldValues = async (editId) => {
    switch (source) {
      case 'quotes':
        get(`cotacao/?qt_id=${editId}`)
          .then(({id, item_name, item_description, item_value, installments}) => { setField_one(item_name); setField_two(item_description); setField_three(installments); setField_four(item_value); setEditId(id); })
          .catch(()=>navigate('/login'))
          break;
      case 'company':
        get(`company/${editId}/`)
          .then(({id, name, cnpj}) => { setField_one(name); setField_two(cnpj); setEditId(id); }).catch(()=>navigate('/login'));
        break;
      default: setEditId(0)
      
    }
  }

  useEffect(() => {
  
    if (editId > 0) {
      loadFieldValues(editId)
    }
  }, [editId])

  useEffect(() => {
   loadItems();

  }, [])

  const setCheckedItem = (item, isChecked) => {
    isChecked
      ? setLocalSelected([...localSelected, item])
      : setLocalSelected(localSelected.filter((i) => i !== item));
  };

  const cleanFieldsAndOpenModal = ()=>{
   
    setShowSuccess(false); 
    setShowError(false); 
    setMessage(''); 
    setEditId(0); 
    setField_one(''); 
    setField_two('');
    setField_three('');
    setField_four('');
    setField_five(''); 
    onOpen();
  }

  const processItem = async (id) => {
        if (id && id > 0) {
          await post(`cotacao/processamento/`, {cotacao : id})
            .then((res) => {alert('Processamento efetuado: Parcelas de R$'+res.result); setEditId(0); loadItems(); }).catch(({response})=>{
            
              showAlerts(false, Object.values(response) + '');
            })
          }
  }

  const saveOrUpdate = async () => {
        if (
        field_one==='' ||
        field_two==='' ||
        field_three ==='' ||
        field_four=== ''
        ){
          showAlerts(false,'Dados incorretos.');
          return
        }

        let usr = await getUser();
        post(`cotacao/` , {user:usr.id, item_name: field_one, item_description: field_two, installments:field_three, item_value:field_four  })
           
            .then((res) => { setEditId(0); onClose(); loadItems();showAlerts(); })
            .catch((response)=>{
              console.log(response.response.data);
              showAlerts(false, Object.values(response.response.data) + '');
            })
          ;
          

  }
  return (
    <>  
    <Stack>
    { showSuccess &&
  
    <Alert status='success'>
        <AlertIcon />
        <AlertTitle>Ação Realizada com sucesso</AlertTitle>
        { message && <AlertDescription>{message}</AlertDescription> } 
      </Alert>
    } 
  
    </Stack>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editId > 0 ? 'Edit' : 'Adicionar'} Cotação</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack>

            { showError &&
      <Alert status='error'>
        <AlertIcon />
        <AlertTitle>Um Erro ocorreu</AlertTitle>
        { message && <AlertDescription>{message}</AlertDescription> } 
      </Alert>
}
            </Stack>
            <FormControl isRequired>
              <FormLabel>Nome</FormLabel>
              <Input ref={initialRef} required placeholder={"Nome"} onChange={(e) => setField_one(e.target.value)} value={field_one} />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Descrição</FormLabel>
              <Input onChange={(e) => setField_two(e.target.value)} placeholder={ 'Descrição'} value={field_two} />
            </FormControl>
            
            <> 
            <FormControl isRequired mt={4}>
            <FormLabel>Parcelas</FormLabel>
            <NumberInput value={field_three} onChange={setField_three} defaultValue={1} min={0} max={180}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
          </FormControl>
        
          <FormControl isRequired mt={4}>
          <FormLabel>Valor Total</FormLabel>
          <Input type="decimal" onChange={(e)=> setField_four(e.target.value)} placeholder={'Valor Total'} value={field_four} />
        </FormControl>
      
       

      


      </>

        
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={saveOrUpdate}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        className="custom-table-container"
        width="100%"
        bg={bg}
        color={color}
        rounded="lg"
        p={5}
      >
        <Stack direction="row" alignItems="top" marginBottom="1.5rem">
          <Button onClick={() => { cleanFieldsAndOpenModal() }}>Adicionar Cotação</Button>
        </Stack>
        <Table>
          <Thead>
            <Tr>
              {headers.map((head, i) => (
                <Th key={i} data-column={head && head.id}>
                  {head.title}
                </Th>
              ))}
              <Th data-column="item-actions"></Th>
            </Tr>
          </Thead>
          <Tbody>
            {items && items.map((item, i) => (
              <Tr key={i}>
                {selectable ? (
                  <Td data-column="global-selector">
                    <Checkbox
                      defaultIsChecked={selected.includes(item && item.id)}
                      isChecked={localSelected.includes(item && item.id)}
                      onChange={(e) => setCheckedItem(item && item.id, e.target.checked)}
                    />
                  </Td>
                ) : (
                  ""
                )}
                {Object.keys(item).map((column, c) => (
                  <Td key={c} data-column={headers[c]}>
                    { headers[c] && item[headers[c].id]}
                  </Td>
                ))}
                <Td data-column="item-actions">
                
                    <HStack>
                 
                         <Button
                         color="Blue"
                        onClick={(e) => 
                      {
                        e.preventDefault();
                       
                        processItem(item && item.id);
                      }
                      }>Processar</Button>
                 
                 </HStack>
                   
                    
                
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
}
