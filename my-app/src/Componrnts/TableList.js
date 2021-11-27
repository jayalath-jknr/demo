// import React, { Component } from "react";
// import React from "react";
import axios from 'axios';
import { useState, useEffect, useMemo, useRef } from 'react';
import * as React from 'react';

import MaterialTable from 'material-table-formik';
import MaterialIcons, { TextFields } from '@material-ui/icons';
import { forwardRef } from 'react';
import { makeStyles } from '@material-ui/styles';
// import useStyles from "./welcomeStyles/styles";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { alpha, Collapse, Input, Paper, TextField } from '@material-ui/core';
import { AddAlert } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { Warning } from '@material-ui/lab';
import { Success } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import { Restore, Save, SaveTwoTone } from '@material-ui/icons';
import { FormGroup } from '@material-ui/core';
import { FormatAlignCenter } from '@material-ui/icons';
import { MTableAction } from 'material-table';
import * as yup from 'yup';
import { blue } from '@material-ui/core/colors';
// import { useAuthContext } from '@asgardeo/auth-react';
// import { Field } from 'formik';


// import { array } from "yup/lib/locale";

const styles =  makeStyles((theme) => ({
  container: {
    width: '100%'
  },
  paper: {
    padding: '2%',
    margin: '2%'
  },
  panel: {
    display: 'flex',
    paddingTop: '1%'
  },
  normalCol: {
    width: '15%',
    paddingRight: '0',
    paddingLeft: '0',
    borderBottom: '1px solid rgba(0,0,0,0.65)',
    fontSize: '0.8rem'
  },
  amountText: {
    marginBottom: '1%'
  },
  amountVal: {
    marginLeft: '2%'
  },
  dataTable: {
    marginTop: '2%',
    marginBottom: '3%'
  },
  loader: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center'
  },
  loaderText: {
    marginTop: '3%'
  },
  infoPanel: {
    textAlign: 'center',
    marginTop: '3%'
  },
  infoText: {
    fontSize: '1.2rem',
    fontWeight: '500'
  },
  tabList: {
    paddingBottom: '1.1%',
    borderBottom: '3px solid #392f54',
    listStyle: 'none',
    paddingLeft: '0'
  },
  tab: {
    '&:hover': {
      backgroundColor: '#4e4272',
      borderRadius: '0',
      cursor: 'pointer'
    },
    display: 'inline',
    color: '#e7e6ef',
    width: '3%',
    backgroundColor: '#100140',
    border: 'none',
    borderRadius: '0',
    padding: '1% 2.5%',
    fontWeight: '500'
  },
  notFirstTab: {
    '&:hover': {
      backgroundColor: '#4e4272',
      borderRadius: '0',
      cursor: 'pointer'
    },
    display: 'inline',
    color: '#e7e6ef',
    width: '3%',
    backgroundColor: '#100140',
    border: 'none',
    borderRadius: '0',
    padding: '1% 2.5%',
    fontWeight: '500',
    borderLeft: 'none'
  },
  selected: {
    backgroundColor: '#4e4272',
    border: '3px solid #392f54',
    borderRadius: '0'
  },
  tableFlow: {
    width: '100%',
    overflowX: 'auto'
  }
}));

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};
const columns = [
  // {field: "updated_date", title : "UPDATED DATE", type: Date, emptyValue:()=><em>null</em>, searchable: true,},
  // {
  //   field: 'actions',
  //   title: 'Actions',
  //   // renderCell: RowMenuCell,
  //   sortable: false,
  //   width: 100,
  //   headerAlign: 'center',
  //   filterable: false,
  //   align: 'center',
  //   disableColumnMenu: true,
  //   disableReorder: true,
  // },
];

const INITIAL_FORM_STATE = {
  internal_id: '',
  gl_code: '',
  gl_account_name: '',
  department: [],
  status: '',
  comment: '',
  added_by: '',
  updated_by: ''
};

const FORM_VALIDATION = yup.object().shape({
  student_id: yup.number('Please Enter a valid number').required('Requird'),
  student_name: yup.string('Please Enter a valid name').required('Requird'),
  subject_code: yup.string('Please Enter a valid code').required('Requird'),
  department: yup.string('Please Enter a valid Department').required('Requird'),
  status: yup.string('Please Enter a valid status').required('Requird'),
  comment: yup.string('Please Enter a valid comment'),
  added_by: yup
    .string('Please Enter a valid word')
    .email('Invalid Email.')
    .required('Requird'),
  updated_by: yup.string('Please Enter a valid word').email('Invalid Email .')
});

export default function DataGridDemo() {
  const tableRef = useRef();
  // var classes = useStyles();

  const url = 'http://localhost:9092/masterData/allData';
  const [data, setData] = useState([]);
  const [email, setemail] = useState('test@ws02.com');
  const [departments, setDep] = useState({});
  const [AccStatus, setAccstatus] = useState({});
  const [error, setError] = useState(null);
  const [warning, setwarning] = useState(null);
  const [success, setSuccess] = useState(null);
  // const { state } = useAuthContext();

  // const [messageClass , setMessageClass] = (null)
  // const [messageRole, setMessageRole] =(null)
  const [openPopup, setOpenPopup] = useState(false);
  const [open, setOpen] = React.useState(true);
  let dep = {};
  let depUnique = [];

  useEffect(() => {
    getStudent();
    getDep();
  }, []);
  const getStudent = () => {
    // fetch (url)
    // .then(res => {
    //   res.json();
    //   console.log(res)
    //   console.log(res.body.data);
    // })
    // // .then (console.log(res))
    // .then(res => setData(res.data))

    axios
      .get('http://localhost:9092/masterData/allData')
      // fetch('http://localhost:9092/masterData/allData')

      .then((response) => {
        console.log(response.data.data);
        setemail('test@wso2.com');

        // depUnique = Array.from(new Set(dep))
        // console.log(depUnique);
        response.data.data.map(
          (row) => (departments[row.department] = row.department)
        );
        setDep(departments);

        response.data.data.map((row) => (AccStatus[row.status] = row.status));
        setAccstatus(AccStatus);

        setData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getDep = () => {
    // let dep2 = {};
    // dep.push.map(row => dep2[row.id] = row.department)
    // console.log(dep2);
  };

  // const GlSchema = Yup.object().shape({
  //   gl_code: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(50, 'Too Long!')
  //     .required('Required'),
  //   gl_account_name: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(50, 'Too Long!')
  //     .required('Required'),
  //   department: Yup.string()
  //     .required('Required'),
  //   status: Yup.string()
  //     .min(2, 'Too Short!')
  //     .max(50, 'Too Long!')
  //     .required('Required'),
  //   comment: Yup.string()
  //     .optional(),
  //   added_by: Yup.string().email()
  //     .required('Required'),
  //   updated_by: Yup.string().email()
  //     .required('Required'),
  // });
  const rows = [];
  return (
    // <div style={{ height: '100%', width: '100%' , padding: '0 8px' }}>
      <Paper  container >

      <div>
        <Collapse in={open}>
          {error && (
            <Alert
              onClose={() => {
                setOpen(false);
              }}
              severity="error"
            >
              {error}
            </Alert>
          )}
        </Collapse>
        <Collapse in={open}>
          {warning && (
            <Alert
              onClose={() => {
                setOpen(false);
              }}
              severity="warning"
            >
              {error}
            </Alert>
          )}
        </Collapse>
        <Collapse in={open}>
          {success && (
            <Alert
              onClose={() => {
                setOpen(false);
              }}
              severity="success"
            >
              Successful
            </Alert>
          )}
        </Collapse>
      
      </div>
      <MaterialTable
        validationSchema={FORM_VALIDATION}
          tableRef={tableRef}
          style={{ padding: '16 8px' }}
        title="General Ledger"
        data={data}
        icons={tableIcons}
          columns={[
            {
              field: 'id', title: 'ID', editable: true,  searchable: true, type: 'numeric', cellStyle: { width: 150, minWidth: 150 }, hidden: true,
              editComponent: (props) =>(<TextField  variant="outlined"
              type="text"
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
              error={props.error}
              helperText={props.helperText}
              placeholder={props.columnDef.title}
               
              />)},
          {field: 'student_id',title: 'STUDENT ID',type: 'numeric',searchable: true,validate: (rowData) =>  rowData.internal_id === ''    ? { isValid: false, helperText: 'Internal Id cannot be empty' }    : true,headers: ''
          
            ,editComponent: (props) =>(<TextField  variant="outlined"
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            error={props.error}
            helperText={props.helperText}
            placeholder={props.columnDef.title}
             
            />)
          },
           
          {field: 'student_name', title: 'STUDENT NAME', searchable: true,
              editComponent: (props) => (<TextField variant="outlined"
          type="text"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          error={props.error}
          helperText={props.helperText}
          placeholder={props.columnDef.title}
           
              />)
            },
            {
              field: 'Subject_code', title: ' CODE',  searchable: true, 
              editComponent: (props) =>(<TextField  variant="outlined"
              type="text"
              value={props.value}
              onChange={(e) => props.onChange(e.target.value)}
              error={props.error}
              helperText={props.helperText}
              placeholder={props.columnDef.title}
               
              />)},
          {field: 'department',title: 'DEPARTMENT',searchable: true,lookup: departments, },
          {field: 'status',title: 'STATUS',searchable: true,lookup: AccStatus},
          {field: 'comment',title: 'COMMENT',searchable: true, 
          editComponent: (props) =>(<TextField  variant="outlined"
          type="text"
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          error={props.error}
          helperText={props.helperText}
          placeholder={props.columnDef.title}
           
          />) },
          {field: 'added_by',title: 'ADDED BY',emptyValue: () => <em>null</em>,searchable: true,
            
            editComponent: (props) =>(<TextField  variant="outlined"
            type="text"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            error={props.error}
            helperText={props.helperText}
            placeholder={props.columnDef.title}
             
            />)
        
          },
          // {field: "added_date", title : "ADDED DATE",  type:Date,emptyValue:()=><em>null</em>, searchable: true,},
          {field: 'updated_by',title: 'UPDATED BY',emptyValue: () => <em>null</em>,searchable: true,editable: 'onUpdate',editComponent: (props) => (
             
              <TextField
               
              variant="outlined"
                type="text"
                value={props.value}
                onBlur={(e) => props.onChange(e.target.value)}
                error={props.error}
                helperText={props.helperText}
                placeholder={props.columnDef.title}
                {...console.log(props.newData)}
              />
            )
          }
          
        ]}
        
        options={{
          actionsColumnIndex: -1,
          headerStyle: { size: '20px' },
          // filtering: true,
          pageSizeOptions:[10,20,50,100],
          pageSize:10,
          paginationType: 'stepped',
          paginationPosition: 'bottom',
          exportButton: true,
          exportAllData: true,
          addRowPosition: 'first',
          columnsButton: true,
          rowStyle: (data, index) =>
            index % 2 === 1
              ? {
                  backgroundColor: '#EEE',
                  fontFamily: 'Roboto',
                  fontSize: 14
                }
              : { fontFamily: 'Roboto', fontSize: 14 }
        }}
        editable={{
          isDeletable: (row) => row.status === 'Active',
          onRowAddCancelled: (rowData) => console.log('Row adding cancelled'),
          onRowUpdateCancelled: (rowData) =>
            console.log('Row editing cancelled'),
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              fetch('http://localhost:9092/Data/newStudent', {
                method: 'POST',

                headers: {
                  'content-type': 'application/x-www-form-urlencoded'

                  // "content-type":"application/json",
                },
                body: JSON.stringify(newData)
              })
                .then((res) => {
                  if (!res.ok) {
                    if (res.status === 400) {
                      throw Error(
                        'Data is not updated. Fill all the required fields or there may be another record with same internal id'
                      );
                    }
                    if (res.status === 500) {
                      throw Error(
                        'Database is not updated. Kindly check all the required fields and try again'
                      );
                    }
                  }

                  console.log(res);

                  console.log(res);

                  setSuccess(true);
                  setOpen(true);
                })
                .catch((err) => {
                  //toDo: notifications

                  // setMessageClass("alert alert-primary", role="alert")
                  // console.log(JSON.stringify(newData));
                  setError(err.message);
                  setTimeout(() => {
                    setData(getStudent());
                    console.log(newData);
                    // setError(err.message)
                    // setError(null)
                    resolve();
                  }, 500);
                });
              // setData([...data,newData])

              setTimeout(() => {
                setData(getStudent());
                console.log(newData);
                // setError(err.message)
                // setError(null)
                resolve();
              }, 5000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              fetch('http://localhost:9092/Data/changedStudent' + '/' + oldData.id,
                {
                  method: 'PUT',

                  headers: {
                    // "content-type":"application/json",
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  body: JSON.stringify(newData)
                }
              )
                .then((res) => {
                  if (!res.ok) {
                    if (res.status === 400) {
                      throw Error(
                        'Data is not updated. Fill all the required fields or there may be another record with same internal id'
                      );
                    }
                    if (res.status === 500) {
                      throw Error(
                        'Database is not updated. kindly check all the required fields and try again'
                      );
                    }
                  }
                  setTimeout(() => {
                    setSuccess(true);
                    setData(getStudent());
                    console.log('NewData', newData, 'olddata', oldData);
                    resolve();
                  }, 500);
                })
                .catch((err) => {
                  console.log('new data', newData);
                  console.log('old data', oldData);
                  console.log('error', err);
                  setError(err.message);
                  setData(getStudent());
                  setTimeout(() => resolve(), 500);
                  // //toDo: notifications
                });
            }),
          onRowDelete: (selectedRow) =>
            new Promise((resolve, reject) => {
              fetch(
                'http://localhost:9092/Data/oldStudent/' + selectedRow.id,
                {
                  method: 'DELETE',

                  headers: {
                    'content-type': 'application/json'
                  }
                }
              )
                .then((res) => {
                  setTimeout(() => {
                    console.log(selectedRow);

                    setData(getStudent());
                    resolve();
                  }, 500);
                  //toDo: notifications
                })
                .catch((err) => {
                  console.log('selected row', selectedRow);
                  console.log('error', err);
                  setData(getStudent());
                  setTimeout(() => resolve(), 500);
                });
            })
        }}
        // components={{
        //   EditRow: FormikEditRow,
        //   EditField: FormikEditField
        // }}
        // initialFormData={INITIAL_FORM_STATE}
        rowsPerPageOptions={[100]}
        checkboxSelection
        disableSelectionOnClick
        />
      <div>
        {/* <Popup
          // title ='New Ledger Account'
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        >
          <AddGlForm />
        </Popup> */}
        </div>
        </Paper>

  );
}
