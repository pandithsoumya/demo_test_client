import React, {useEffect} from "react";
import {Button, FormControl, Grid, TextField} from '@mui/material'
import {Typography} from '@mui/material'
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client'
import { useState, createContext } from "react";
import { Container } from "@mui/system";
import AddPage from "./AddPage";



const GET_ALL_VM = gql`
    query getAllVMs{
        getAllVMs {
            vm_id
            vm_name
            location
            status
        }
    }
`
const DELETE_VM = gql`
    mutation DELETE_VM($vm_id:Int) {
        DELTE_VM(input:{vm_id:$vm_id}){
            Boolean
        }
    }
`

export default function HomeComponent () {

    const {loading,data,error, refetch} = useQuery(GET_ALL_VM)
    const [delete_vm, {loading: deleteLoading,data : deletedata,error : deleteerror}] = useMutation(DELETE_VM)

    if(loading) {
        return <div>Data is not ready</div>
    }
    if(error) {
        return <div>Error occured</div>
    }

    const editVM = () => {

    }
   
    const deleteVM = (id) => {
        deleteVM({
            variables : 
            {
                vm_id : id
            }
        })
    }
 
    
   
    return(
        <React.Fragment>
           <Container maxWidth='xl'>
            <Grid item xs={12}>
                {data && data.map(row => (
                    <ul>
                         <li>VM ID : {row.vm_id}</li>
                         <li>VM Name : {row.vm_name}</li>
                         <li>Location : {row.location}</li>
                         <li>Status : {row.status}</li>
                         <li><Button onClick={editVM}>Edit</Button>
                                <Button onClick={deleteVM(row.vm_id)}>Delete</Button>
                         </li>
                    </ul>
                       
                ))        
                
                }
            </Grid>
            <Grid>Home</Grid>
            <AddPage refetch={refetch} />
           </Container>
           
        </React.Fragment>
    )
}