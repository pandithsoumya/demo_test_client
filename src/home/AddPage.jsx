import { MenuItem, TextField, useThemeProps } from "@mui/material";
import React, { useEffect, useState } from "react";
import {useMutation } from '@apollo/client'


const initialFormState = {
    vm_id: {
        value: '',
        error: false,
        helperText: ''
    },
    vm_name: {
        value: '',
        error: false,
        helperText: ''
    },
    location: {
        value: '',
        error: false,
        helperText: ''
    },
    status: {
        value: '',
        error: false,
        helperText: ''
    }
}

const ADD_VM = gql`
    mutation ADD_VM ( $vm_id : Int, $vm_name : String, $location : String, $status : Boolean) {
        mutation ADD_VM(input:{vm_id: $vm_id, vm_name : $vm_name, location:$location,status:$status}) {
            vm_id
            vm_name
            location
            status
        }
    }
`




export default function AddPage() {

    const [form, setForm] = useState(initialFormState)

    
    const[add_data,{loading, data, error}  ] = useMutation(ADD_VM)


        const handleFormChange = field => event => {
                  
            
            if(event.target.value === '' || event.target.value.length < 1 ){
                setForm({...form,[field]:{value:event.target.value, error: true, helperText : 'required'}})
            }
            else {
                setForm({...form,[field]:{value:event.target.value, error: false, helperText : ''}})
            }
        
        }
       


    const handleAdd = () => {
        add_data({
            variables : {
                vm_id : form.vm_id.value,
                vm_name : form.vm_name.value,
                location : form.location.value,
                status : (form.status.value === 'Yes') ? true : false
            }
        }).then(data =>{
            props.refetch()
        }
            
            )
    }


    return (
        <React.Fragment>
            <h1>Add a new VM</h1>
            <Grid item xs={3}>
                <FormControl>
                    <TextField type='text' label='VM ID' name='vm_id' id='vm_id' placeholder="Enter VM ID" value={form.vm_id.value} error={form.vm_id.error} onChange={handleFormChange('vm_id')} />
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl>
                    <TextField type='text' label='VM Name' name='vm_name' id='vm_name' placeholder="Enter VM name" value={form.vm_name.value} error={form.vm_name.error} onChange={handleFormChange('vm_name')} />
                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl>
                <InputLabel>Location</InputLabel>
                    <Select value={form.location.value} error={form.location.error}>
                    <MenuItem value=''>Select Location</MenuItem>
                        <MenuItem value='Bangalore'>Bangalore</MenuItem>
                        <MenuItem value='Hyderabad'>Hyderabad</MenuItem>
                        <MenuItem value='Chennai'>Chennai</MenuItem>

                    </Select>

                </FormControl>
            </Grid>
            <Grid item xs={3}>
                <FormControl>
                <InputLabel>Status</InputLabel>
                    <Select value={form.location.value} error={form.location.error} >
                    <MenuItem value=''>Select Status</MenuItem>
                        <MenuItem value='yes'>Yes</MenuItem>
                        <MenuItem value='no'>No</MenuItem>


                    </Select>


                </FormControl>
                <Button onClick={handleAdd} > Add</Button>
            </Grid>
        </React.Fragment>
    )
}